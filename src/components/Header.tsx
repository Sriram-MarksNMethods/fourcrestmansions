"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import GlobusLogo from "./GlobusLogo";
import { DownloadIcon } from "./Icons";
import { useRequestBrochure } from "@/lib/brochure";

const leftLinks = [
  { label: "Overview", href: "/#overview" },
  { label: "Lifestyle", href: "/#lifestyle" },
  { label: "Location", href: "/#location" },
];

const rightLinks = [
  { label: "FAQs", href: "/#faqs" },
  { label: "Contact Us", href: "/#enquire" },
];

export default function Header() {
  const [fixed, setFixed] = useState(false);
  const [open, setOpen] = useState(false);
  const requestBrochure = useRequestBrochure();

  // Sobha adds body.fixed-header once the page is scrolled 5px or more.
  useEffect(() => {
    const onScroll = () => setFixed(window.scrollY >= 5);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const link = `block px-[14px] py-2 text-[12px] font-medium uppercase leading-4 tracking-[1.6px] text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.35)] transition-colors duration-500 ${
    fixed ? "hover:text-black" : "hover:text-gold"
  }`;

  return (
    <>
      {/* Dark fade behind the transparent header (hidden once the header turns frosted) */}
      <div
        aria-hidden
        className={`pointer-events-none fixed inset-x-0 top-0 z-40 h-[140px] bg-[linear-gradient(180deg,rgba(0,0,0,0.65)_0%,rgba(0,0,0,0.45)_35%,rgba(0,0,0,0)_100%)] ${
          fixed || open ? "hidden" : ""
        }`}
      />
      <header
        className={`fixed inset-x-0 top-0 z-50 py-[18px] lg:py-3 ${
          fixed || open ? "bg-[rgba(21,21,21,0.3)] backdrop-blur-[20px] transition-[background-color] duration-200 ease-[ease]" : ""
        }`}
      >
        <div className="wrap flex h-[46px] items-center justify-between gap-6">
          <nav className="hidden flex-1 items-center lg:flex">
            {leftLinks.map((l) => (
              <a key={l.href} href={l.href} className={link}>
                {l.label}
              </a>
            ))}
          </nav>

          <Link href="/" aria-label="Globus Developers, home" className="flex text-white lg:w-[178px] lg:justify-center">
            {/* Brochure colours: white lettering, orange-red sunburst */}
            <GlobusLogo className="h-7 w-auto drop-shadow-[0_1px_6px_rgba(0,0,0,0.35)] lg:h-[34px]" markClassName="fill-globus" />
          </Link>

          <div className="hidden flex-1 items-center justify-end gap-2.5 lg:flex">
            <nav className="flex items-center">
              {rightLinks.map((l) => (
                <a key={l.href} href={l.href} className={link}>
                  {l.label}
                </a>
              ))}
            </nav>
            {/* Brochure pill in place of Sobha's language switch (same skeleton styling) */}
            <button
              type="button"
              onClick={requestBrochure}
              className="flex items-center rounded-[100px] border border-white/25 bg-white/15 px-4 py-2 text-[12px] font-medium uppercase leading-4 tracking-[1.6px] text-white backdrop-blur-[2px] transition-shadow duration-200 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.35)]"
            >
              <DownloadIcon className="size-4" />
              <span className="ml-2">Brochure</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="order-first flex size-10 flex-col items-start justify-center gap-1.5 lg:hidden"
          >
            <span className={`h-px w-6 bg-white transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`h-px w-6 bg-white transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </button>

          {/* Phones: brochure icon on the right (Sobha has wishlist/search icons here) */}
          <button type="button" onClick={requestBrochure} aria-label="Download brochure" className="flex size-10 items-center justify-end text-white lg:hidden">
            <DownloadIcon className="size-[22px]" />
          </button>
        </div>

        {open && (
          <nav className="wrap flex flex-col gap-5 pb-8 pt-6 lg:hidden">
            {[...leftLinks, ...rightLinks].map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm font-medium uppercase tracking-[1.4px] text-white">
                {l.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                requestBrochure();
              }}
              className="text-left text-sm font-medium uppercase tracking-[1.4px] text-white"
            >
              Download Brochure
            </button>
          </nav>
        )}
      </header>
    </>
  );
}
