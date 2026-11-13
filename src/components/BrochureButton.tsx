"use client";

import type { ReactNode } from "react";
import { useRequestBrochure } from "@/lib/brochure";

// Any "Brochure" link: opens the thank-you page (which downloads it) if the form was already submitted, otherwise the form.
export default function BrochureButton({ children, className = "", label }: { children: ReactNode; className?: string; label?: string }) {
  const requestBrochure = useRequestBrochure();
  return (
    <button type="button" onClick={requestBrochure} aria-label={label} className={className}>
      {children}
    </button>
  );
}
