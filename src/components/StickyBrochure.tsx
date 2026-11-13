"use client";

import { useEffect, useState } from "react";
import { useRequestBrochure } from "@/lib/brochure";

/*
  Sticky brochure tab: a slim vertical tab on the right edge, centred on the screen (the edge tab used
  across Indian real-estate sites). Slides in once the page is scrolled half a screen; on hover it pulls
  out a few pixels and deepens. Desktop only — phones have Brochure in the bottom bar.
*/
export default function StickyBrochure() {
  const [shown, setShown] = useState(false);
  const requestBrochure = useRequestBrochure();

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.5);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={requestBrochure}
      aria-hidden={!shown}
      tabIndex={shown ? 0 : -1}
      className={`fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 rounded-l-[7px] bg-brand pb-6 pl-3.5 pr-3 pt-6 text-[12px] font-medium uppercase leading-4 tracking-[2px] text-white shadow-[-4px_6px_18px_rgba(0,0,0,0.18)] transition-all duration-500 ease-[ease] [writing-mode:vertical-rl] hover:bg-brand-dark hover:pr-4 lg:block wide:text-[17px] wide:tracking-[2.8px] ${
        shown ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-full opacity-0"
      }`}
    >
      <span className="block rotate-180">Download Brochure</span>
    </button>
  );
}
