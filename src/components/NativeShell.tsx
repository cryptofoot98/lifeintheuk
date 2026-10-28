"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { SystemBars, SystemBarsStyle } from "@capacitor/core";
import { App } from "@capacitor/app";
import { Browser } from "@capacitor/browser";
import { SplashScreen } from "@capacitor/splash-screen";
import { isNative } from "@/lib/native";

// Native-only glue for the Capacitor iOS/Android apps. Renders nothing and
// does nothing on the web.
export function NativeShell() {
  const router = useRouter();
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();

  // One-time setup: back button, external links, splash
  useEffect(() => {
    if (!isNative()) return;
    document.documentElement.classList.add("native");

    // Android hardware back: go back in history, or leave the app at the root
    const back = App.addListener("backButton", ({ canGoBack }) => {
      if (canGoBack) window.history.back();
      else App.exitApp();
    });

    // Open off-site links in the system browser instead of inside the app
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin && /^https?:$/.test(url.protocol)) {
        e.preventDefault();
        Browser.open({ url: url.href });
      }
    };
    document.addEventListener("click", onClick);

    SplashScreen.hide().catch(() => {});

    return () => {
      back.then((h) => h.remove());
      document.removeEventListener("click", onClick);
    };
  }, []);

  // The marketing landing page isn't useful inside the app — start on the
  // dashboard, or on the route the deep-link guard in app/page.tsx bounced from
  useEffect(() => {
    if (!isNative() || pathname !== "/") return;
    const to = new URLSearchParams(window.location.search).get("to");
    router.replace(to?.startsWith("/") && !to.startsWith("//") ? to : "/tests");
  }, [pathname, router]);

  // Status bar icons follow the theme (light icons on the dark navy theme)
  useEffect(() => {
    if (!isNative()) return;
    SystemBars.setStyle({
      style: resolvedTheme === "light" ? SystemBarsStyle.Light : SystemBarsStyle.Dark,
    }).catch(() => {});
  }, [resolvedTheme]);

  return null;
}
