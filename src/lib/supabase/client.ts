import { createClient as createSupabaseClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | undefined;

// Single browser-side client. The session is persisted in localStorage, which
// works identically on the web and inside the Capacitor WebView (no cookies,
// no server middleware needed for the static export).
export function createClient() {
  client ??= createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storageKey: "britzen-auth",
      },
    }
  );
  return client;
}
