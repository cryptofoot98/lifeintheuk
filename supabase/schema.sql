-- Life in the UK Test App — Database Schema
-- Run this once in the Supabase SQL editor of a fresh project.
-- Matches every table/column the app reads or writes (web + mobile).

create extension if not exists "uuid-ossp";

-- ─── PROFILES ────────────────────────────────────────────────────────────────
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  display_name text,

  -- Editable profile details (profile page)
  full_name text,
  age integer check (age is null or age between 0 and 130),
  nationality text,
  mobile text,
  avatar_url text,

  -- Gamification (updated by the client after tests / reading)
  xp integer not null default 0,
  streak integer not null default 0,
  last_activity_date date,
  free_tests_used integer not null default 0,

  -- Entitlements — NOT writable by users (see column grants below)
  has_lifetime_access boolean not null default false,
  is_admin boolean not null default false,

  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using ((select auth.uid()) = id);

create policy "Users can update own profile"
  on public.profiles for update
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- RLS is row-level only: without this, a user could set their own
-- has_lifetime_access / is_admin to true. Restrict UPDATE to safe columns.
revoke update on public.profiles from anon, authenticated;
grant update (
  display_name, full_name, age, nationality, mobile, avatar_url,
  xp, streak, last_activity_date, free_tests_used, updated_at
) on public.profiles to authenticated;

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
-- test_number: 0 = quick quiz, 1–100 = practice tests, >100 = mock exams
create table if not exists public.test_attempts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  test_number integer not null,
  chapter_filter integer,               -- null = all chapters
  mode text not null check (mode in ('timed', 'untimed', 'study')),
  score integer not null default 0,
  total_questions integer not null check (total_questions > 0),
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
  using ((select auth.uid()) = user_id);

create policy "Users can insert own attempts"
  on public.test_attempts for insert
  with check ((select auth.uid()) = user_id);

create index if not exists idx_test_attempts_user_id on public.test_attempts(user_id);
create index if not exists idx_test_attempts_created_at on public.test_attempts(created_at desc);

-- ─── MATERIAL PROGRESS ───────────────────────────────────────────────────────
create table if not exists public.material_progress (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  chapter integer not null,
  section_id text not null,
  completed_at timestamptz default now() not null,
  unique (user_id, chapter, section_id)
);

alter table public.material_progress enable row level security;

create policy "Users can manage own material progress"
  on public.material_progress for all
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

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
  using ((select auth.uid()) = user_id);

create policy "Users can insert own responses"
  on public.question_responses for insert
  with check ((select auth.uid()) = user_id);

create index if not exists idx_question_responses_user_id on public.question_responses(user_id);
create index if not exists idx_question_responses_attempt_id on public.question_responses(attempt_id);
create index if not exists idx_question_responses_question_id on public.question_responses(question_id);

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
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

-- ─── ACCOUNT INVITATIONS ─────────────────────────────────────────────────────
-- One purchase, two users: a primary user can invite one person
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
  using ((select auth.uid()) = inviter_id)
  with check ((select auth.uid()) = inviter_id);

create index if not exists idx_account_invitations_inviter on public.account_invitations(inviter_id);
create index if not exists idx_account_invitations_email on public.account_invitations(lower(invited_email));

-- Enforce "one guest per purchase": at most one live invitation per inviter
create unique index if not exists uniq_account_invitations_one_live
  on public.account_invitations(inviter_id)
  where status in ('pending', 'accepted');

-- Auto-accept invitation and share lifetime access when invited user signs up.
-- Fires after on_auth_user_created (triggers run in name order), so the profile exists.
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

create or replace trigger on_invited_user_signup
  after insert on auth.users
  for each row execute procedure public.handle_invitation_on_signup();

-- Trigger-only functions: not callable via /rest/v1/rpc
revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.handle_invitation_on_signup() from public, anon, authenticated;

-- ─── HELPER VIEWS ─────────────────────────────────────────────────────────────
-- security_invoker: views run with the caller's RLS, so users only see their own rows.

create or replace view public.user_stats
with (security_invoker = true) as
select
  p.id as user_id,
  coalesce(ta.total_tests, 0) as total_tests,
  coalesce(ta.avg_score_percent, 0) as avg_score_percent,
  coalesce(ta.best_score_percent, 0) as best_score_percent,
  coalesce(qr.total_questions_answered, 0) as total_questions_answered,
  coalesce(qr.correct_answers, 0) as correct_answers
from public.profiles p
left join (
  select user_id,
         count(*) as total_tests,
         avg(score::numeric / total_questions * 100) as avg_score_percent,
         max(score::numeric / total_questions * 100) as best_score_percent
  from public.test_attempts
  where completed_at is not null
  group by user_id
) ta on ta.user_id = p.id
left join (
  select user_id,
         count(*) as total_questions_answered,
         count(*) filter (where is_correct) as correct_answers
  from public.question_responses
  group by user_id
) qr on qr.user_id = p.id;

-- Weak questions — answered at least twice with < 50% accuracy
create or replace view public.weak_question_ids
with (security_invoker = true) as
select
  user_id,
  question_id,
  count(*) as attempts,
  avg(is_correct::int) as accuracy
from public.question_responses
group by user_id, question_id
having count(*) >= 2 and avg(is_correct::int) < 0.5;

-- ─── STORAGE: AVATARS ────────────────────────────────────────────────────────
-- Public bucket; each user may only write inside their own "<user_id>/" folder.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('avatars', 'avatars', true, 5242880, array['image/jpeg', 'image/png', 'image/webp', 'image/heic'])
on conflict (id) do nothing;

-- upsert: true needs select + insert + update
create policy "Users can read own avatar objects"
  on storage.objects for select to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = (select auth.uid())::text);

create policy "Users can upload own avatar"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = (select auth.uid())::text);

create policy "Users can update own avatar"
  on storage.objects for update to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = (select auth.uid())::text);

create policy "Users can delete own avatar"
  on storage.objects for delete to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = (select auth.uid())::text);
