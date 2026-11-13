"use client";

import FourcrestLogo from "./FourcrestLogo";

/*
  Full-screen brown panel with the gold Fourcrest wordmark, used for the submit → thank-you transition.
  - Form page: `show` slides it up from the bottom to cover the screen, then the page changes.
  - Thank-you page: it starts covering the screen (`show`) and `lifted` slides it away upwards.
*/
export default function Curtain({ show, lifted = false }: { show: boolean; lifted?: boolean }) {
  const position = lifted ? "-translate-y-full" : show ? "translate-y-0" : "translate-y-full";
  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-0 z-[70] flex items-center justify-center bg-brand transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${position}`}
    >
      <FourcrestLogo
        className={`h-auto w-[220px] text-gold transition-opacity duration-500 lg:w-[280px] ${show ? "opacity-100 delay-300" : "opacity-0"}`}
      />
    </div>
  );
}
