"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window { __lenis?: Lenis }
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.09, autoRaf: true, anchors: { offset: -80 } });
    window.__lenis = lenis;
    return () => { lenis.destroy(); window.__lenis = undefined; };
  }, []);
  useEffect(() => { window.__lenis?.scrollTo(0, { immediate: true }); }, [path]);
  return <>{children}</>;
}

/** Pause/resume page scroll (used while a modal is open). */
export function lockScroll(on: boolean) {
  if (window.__lenis) on ? window.__lenis.stop() : window.__lenis.start();
  document.documentElement.style.overflow = on ? "hidden" : "";
}
