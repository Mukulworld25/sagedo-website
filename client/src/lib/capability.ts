// Device & Network capability detection for high-performance LCP (<1.2s on throttled 4G)
export const canRunRich = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const m = (q: string) => window.matchMedia(q).matches;
  const n = navigator as any;

  // Must have fine pointer (desktop mouse), wide screen, no reduced-motion preference, no data-saver, and sufficient memory
  const hasFinePointer = m('(hover: hover) and (pointer: fine)');
  const isDesktopWidth = window.innerWidth >= 1024;
  const noReducedMotion = !m('(prefers-reduced-motion: reduce)');
  const noSaveData = !n.connection?.saveData;
  const sufficientHardware = (n.deviceMemory ?? 8) >= 4 && (n.hardwareConcurrency ?? 8) >= 4;

  return Boolean(hasFinePointer && isDesktopWidth && noReducedMotion && noSaveData && sufficientHardware);
};
