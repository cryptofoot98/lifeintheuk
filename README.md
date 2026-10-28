# Magpie — Life in the UK test prep

One Next.js codebase, exported as a static site and shipped three ways:
web (Netlify), iOS and Android (Capacitor). Everything server-side lives in Supabase.

## Setup

1. `npm install`
2. `cp .env.example .env.local` and fill in the anon/publishable key
3. Database: run `supabase/schema.sql` once in the Supabase SQL Editor

## Develop

- Web: `npm run dev` → http://localhost:3000
- iOS: `npm run ios` (builds, syncs, opens Xcode)
- Android: `npm run android` (builds, syncs, opens Android Studio)

After any web change, `npm run build:mobile` rebuilds `out/` and copies it into both native projects.

## Notes

- `output: "export"` — no API routes, middleware or server-only APIs. Use Supabase (RLS, edge functions) instead.
- Native-only behaviour (status bar, back button, splash, external links) is in `src/components/NativeShell.tsx`.
- Icons/splash are generated from `assets/` with `npx capacitor-assets generate`.
- Lifetime access (`profiles.has_lifetime_access`) can only be changed with the service role, never by the client.
