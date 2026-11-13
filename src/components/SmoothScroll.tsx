"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useEffect } from "react";
import { setLenis } from "@/lib/scroll";

/*
  Smooth (eased) mouse-wheel scrolling for the whole site, with Lenis.
  - Phones keep their own native touch scrolling (Lenis only smooths the wheel).
  - Same-page links ("#enquire", "/#location") glide to their section instead of jumping;
    the section's scroll-margin-top (scroll-mt-*) is respected, so it lands below the header.
  - Off when "reduce motion" is on (Lenis's respectReducedMotion).
*/
export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true, lerp: 0.1 });
    setLenis(lenis);

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank") return;
      const url = new URL(a.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
      const target = document.querySelector(decodeURIComponent(url.hash));
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement);
      history.pushState(null, "", url.hash);
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  return null;
}
