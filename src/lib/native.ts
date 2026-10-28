import { Capacitor } from "@capacitor/core";
import { Haptics, ImpactStyle } from "@capacitor/haptics";

export const isNative = () => Capacitor.isNativePlatform();

/** Light haptic tick on native; no-op on the web. */
export function tap() {
  if (isNative()) Haptics.impact({ style: ImpactStyle.Light }).catch(() => {});
}
