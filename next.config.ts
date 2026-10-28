import type { NextConfig } from "next";

// Fully static export: the same `out/` bundle is served by Netlify (web)
// and packaged into the Capacitor iOS/Android apps. Anything needing a
// server lives in Supabase (auth, DB, storage, edge functions).
const nextConfig: NextConfig = {
  output: "export",
  // Emit /tests/1/index.html instead of /tests/1.html so static hosts and
  // the native WebView resolve every route as a directory.
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
