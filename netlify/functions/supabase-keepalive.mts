// Free-plan Supabase projects pause after ~7 days without activity.
// A daily zero-cost read against a real table keeps the project awake.
// Reuses the site's existing Supabase env vars. Delete once on a paid plan.
export default async function keepAlive() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Supabase env vars missing");

  const res = await fetch(`${url}/rest/v1/profiles?select=id&limit=1`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  });
  if (!res.ok) throw new Error(`Supabase keep-alive failed: ${res.status}`);
}

export const config = {
  schedule: "@daily",
};
