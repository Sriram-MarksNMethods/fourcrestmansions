"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import GlobusLogo from "./GlobusLogo";
import { jumpToTop } from "@/lib/scroll";

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

  // Sobha adds body.fixed-header once the page is scrolled 5px or more.
  useEffect(() => {
    const onScroll = () => setFixed(window.scrollY >= 5);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page behind the full-screen phone menu; Escape closes it.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const link = `block px-[14px] py-2 text-[12px] font-medium uppercase leading-4 tracking-[1.6px] text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.35)] transition-colors duration-500 wide:text-[17px] wide:leading-[22px] wide:tracking-[2.2px] ${
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

          <Link
            href="/"
            aria-label="Globus Developers, home"
            // Jump straight to the top (no smooth scroll) and drop any #section from the address
            onClick={(e) => {
              if (window.location.pathname !== "/") return;
              e.preventDefault();
              setOpen(false);
              jumpToTop();
              history.replaceState(null, "", "/");
            }}
            className="flex text-white lg:w-[178px] lg:justify-center"
          >
            {/* Brochure colours: white lettering, orange-red sunburst */}
            <GlobusLogo className="h-9 w-auto drop-shadow-[0_1px_6px_rgba(0,0,0,0.35)] lg:h-[48px]" markClassName="fill-globus" />
          </Link>

          <div className="hidden flex-1 items-center justify-end gap-2.5 lg:flex">
            <nav className="flex items-center">
              {rightLinks.map((l) => (
                <a key={l.href} href={l.href} className={link}>
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex size-10 flex-col items-end justify-center gap-1.5 lg:hidden"
          >
            <span className={`h-px w-6 bg-white transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`h-px w-6 bg-white transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </button>

          {/* Phones: empty slot on the left so the logo stays centred (menu button is on the right) */}
          <span aria-hidden className="order-first size-10 lg:hidden" />
        </div>

      </header>

      {/*
        Phones: Sobha's full-screen menu (.menu-main-wrap) — black panel that slides in from the left
        (translateX(-100%) → 0, .3s ease-in), 35/33px padding, 52px rows, close cross top right.
      */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!open}
        inert={!open}
        className={`fixed inset-0 z-[60] h-dvh overflow-auto bg-black px-[33px] pb-[25px] pt-[35px] transition-transform duration-300 ease-in max-[360px]:px-2.5 lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
          className="absolute right-4 top-[23px] flex size-9 items-center justify-center text-white"
        >
          <span className="absolute h-[1.5px] w-6 rotate-45 bg-current" />
          <span className="absolute h-[1.5px] w-6 -rotate-45 bg-current" />
        </button>

        {/* Links centred on the screen, both ways */}
        <nav className="flex min-h-full flex-col items-center justify-center px-3 text-center">
          <ul>
            {[...leftLinks, ...rightLinks].map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block pb-[17px] pt-4 text-[16px] font-medium uppercase leading-[19px] tracking-[1.1px] text-white wide:text-[22px] wide:leading-[27px] wide:tracking-[1.5px]"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
