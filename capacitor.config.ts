import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.britzen.app",
  appName: "Britzen",
  webDir: "out",
  server: {
    androidScheme: "https",
    iosScheme: "capacitor",
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: false, // NativeShell hides it once the app has hydrated
      launchShowDuration: 3000,
      backgroundColor: "#04071F",
      showSpinner: false,
      androidScaleType: "CENTER_CROP",
      splashFullScreen: true,
      splashImmersive: true,
    },
    SystemBars: {
      insetsHandling: "native",
      initialViewportFitValueHint: "cover",
      style: "DARK",
    },
    Keyboard: {
      resize: "body",
    },
  },
  ios: {
    contentInset: "never", // the web layout handles safe areas itself
    allowsLinkPreview: false,
    backgroundColor: "#04071F",
  },
  android: {
    backgroundColor: "#04071F",
  },
};

export default config;
