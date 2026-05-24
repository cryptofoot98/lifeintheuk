-- Life in the UK Test App — Database Schema
-- Run this in the Supabase SQL editor to set up the database

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ─── PROFILES ────────────────────────────────────────────────────────────────
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  display_name text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, email, display_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─── TEST ATTEMPTS ────────────────────────────────────────────────────────────
create table if not exists public.test_attempts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  test_number integer not null,         -- 1-40 for practice tests, 0 for custom
  chapter_filter integer,               -- null = all chapters
  mode text not null check (mode in ('timed', 'untimed', 'study')),
  score integer not null default 0,
  total_questions integer not null,
  time_taken_seconds integer not null default 0,
  passed boolean generated always as (
    score::numeric / total_questions >= 0.75
  ) stored,
  completed_at timestamptz,
  created_at timestamptz default now() not null
);

alter table public.test_attempts enable row level security;

create policy "Users can view own attempts"
  on public.test_attempts for select
  using (auth.uid() = user_id);

create policy "Users can insert own attempts"
  on public.test_attempts for insert
  with check (auth.uid() = user_id);

create index idx_test_attempts_user_id on public.test_attempts(user_id);
create index idx_test_attempts_created_at on public.test_attempts(created_at desc);

-- ─── QUESTION RESPONSES ───────────────────────────────────────────────────────
create table if not exists public.question_responses (
  id uuid default uuid_generate_v4() primary key,
  attempt_id uuid references public.test_attempts(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  question_id integer not null,
  selected_answers integer[] not null default '{}',
  is_correct boolean not null default false,
  time_taken_seconds integer not null default 0,
  created_at timestamptz default now() not null
);

alter table public.question_responses enable row level security;

create policy "Users can view own responses"
  on public.question_responses for select
  using (auth.uid() = user_id);

create policy "Users can insert own responses"
  on public.question_responses for insert
  with check (auth.uid() = user_id);

create index idx_question_responses_user_id on public.question_responses(user_id);
create index idx_question_responses_question_id on public.question_responses(question_id);

-- ─── BOOKMARKED QUESTIONS ─────────────────────────────────────────────────────
create table if not exists public.bookmarked_questions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  question_id integer not null,
  created_at timestamptz default now() not null,
  unique(user_id, question_id)
);

alter table public.bookmarked_questions enable row level security;

create policy "Users can manage own bookmarks"
  on public.bookmarked_questions for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index idx_bookmarked_questions_user_id on public.bookmarked_questions(user_id);

-- ─── HELPER VIEWS ─────────────────────────────────────────────────────────────

-- Per-user stats view
create or replace view public.user_stats as
select
  p.id as user_id,
  count(distinct ta.id) as total_tests,
  coalesce(avg(ta.score::numeric / ta.total_questions * 100), 0) as avg_score_percent,
  coalesce(max(ta.score::numeric / ta.total_questions * 100), 0) as best_score_percent,
  count(qr.id) as total_questions_answered,
  count(qr.id) filter (where qr.is_correct) as correct_answers
from public.profiles p
left join public.test_attempts ta on ta.user_id = p.id and ta.completed_at is not null
left join public.question_responses qr on qr.user_id = p.id
group by p.id;

-- ─── ACCOUNT INVITATIONS ─────────────────────────────────────────────────────
-- One subscription, two users: primary user can invite one person
create table if not exists public.account_invitations (
  id uuid default uuid_generate_v4() primary key,
  inviter_id uuid references public.profiles(id) on delete cascade not null,
  invited_email text not null,
  status text not null default 'pending' check (status in ('pending', 'accepted', 'revoked')),
  created_at timestamptz default now() not null
);

alter table public.account_invitations enable row level security;

create policy "Users manage own invitations"
  on public.account_invitations for all
  using (auth.uid() = inviter_id)
  with check (auth.uid() = inviter_id);

create index idx_account_invitations_inviter on public.account_invitations(inviter_id);
create index idx_account_invitations_email on public.account_invitations(lower(invited_email));

-- Auto-accept invitation and share lifetime access when invited user signs up
create or replace function public.handle_invitation_on_signup()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
declare
  v_inviter_id uuid;
  v_inviter_has_access boolean;
begin
  select ai.inviter_id, p.has_lifetime_access
  into v_inviter_id, v_inviter_has_access
  from public.account_invitations ai
  join public.profiles p on p.id = ai.inviter_id
  where lower(ai.invited_email) = lower(new.email)
    and ai.status = 'pending'
  limit 1;

  if v_inviter_id is not null then
    update public.account_invitations
    set status = 'accepted'
    where inviter_id = v_inviter_id
      and lower(invited_email) = lower(new.email)
      and status = 'pending';

    if v_inviter_has_access then
      update public.profiles
      set has_lifetime_access = true
      where id = new.id;
    end if;
  end if;

  return new;
end;
$$;

create trigger on_invited_user_signup
  after insert on auth.users
  for each row execute procedure public.handle_invitation_on_signup();

-- ─── HELPER VIEWS ─────────────────────────────────────────────────────────────

-- Weak topics view — questions answered more than twice with < 50% accuracy
create or replace view public.weak_question_ids as
select
  user_id,
  question_id,
  count(*) as attempts,
  avg(is_correct::int) as accuracy
from public.question_responses
group by user_id, question_id
having count(*) >= 2 and avg(is_correct::int) < 0.5;
