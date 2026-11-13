"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import GlobusLogo from "./GlobusLogo";
import { ChevronDownIcon } from "./Icons";
import BrochureButton from "./BrochureButton";

// Lists from the brochure ("An Address That Connects You to More" + elevations).
const topColumns = [
  {
    title: "Connectivity",
    items: [
      "Rajiv Gandhi Int'l Airport - 10 mins (3 km)",
      "Airport View Point - 2 mins",
      "Pharma City & Aerospace SEZ - 25 mins",
      "Gachibowli IT Hub - 40 mins",
      "Hitech City - 45 mins",
    ],
  },
  {
    title: "Nearby Hospitals",
    items: [
      "Kondeti Super Speciality Hospital - 10 mins",
      "Onus Robotic Hospitals - 12 mins",
      "Sree Visistta Multi-Speciality Hospital - 12 mins",
      "Prime Care Super Speciality Hospital - 12 mins",
    ],
  },
  {
    title: "Nearby Schools",
    items: [
      "Raintree International School - 10 mins",
      "Sri Chaitanya Techno School - 10 mins",
      "Sloka International School - 12 mins",
      "JayaKiran Global School - 12 mins",
    ],
  },
  {
    title: "Upcoming",
    items: ["Airport Metro to Future City (planned)", "Bharat Future City - nearby", "Regional Ring Road (under development)"],
  },
];

const project = ["28 Triplex Mansions (G+2)", "5 BHK, approx. 6,800 sq. ft.", "500 sq. yd. Plots", "6.14 Acres, Gated Community", "Vastu Compliant Plans"];
const explore = [
  { label: "Overview", href: "#overview" },
  { label: "Lifestyle", href: "#lifestyle" },
  { label: "Location", href: "#location" },
  { label: "FAQs", href: "#faqs" },
];
const elevations = ["Crest-01 Modern Elegance", "Crest-02 Timeless Grandeur", "Crest-03 The Classic", "Crest-04 Distinctive Expression"];

// Sobha footer type: links 12/26 in 32px rows.
const item = "block px-2.5 py-[3px] text-[12px] font-light leading-[26px] text-ink/75 max-lg:px-0 wide:text-[17px] wide:leading-[36px]";

// Desktop: always-open column. Phones: Sobha's tap-to-open row (16px padding, line underneath).
function Column({ heading, children }: { heading: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-ink/40 lg:mb-[55px] lg:border-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-4 text-left text-[16px] font-normal uppercase leading-6 tracking-[1.6px] text-ink lg:pointer-events-none lg:mb-2.5 lg:px-2.5 lg:py-0 wide:text-[22px] wide:tracking-[2.2px]"
      >
        {heading}
        <ChevronDownIcon className={`size-4 transition-transform duration-300 lg:hidden ${open ? "rotate-180" : ""}`} />
      </button>
      <ul className={`${open ? "pb-4" : "hidden"} lg:block lg:pb-0`}>{children}</ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative z-10 -mb-px bg-footer pb-[50px] pt-[108px]">
      {/* Logo on a full-width hairline */}
      <div className="relative mb-[25px]">
        <div className="absolute inset-x-0 top-1/2 h-px bg-footer-line" />
        <div className="relative mx-auto flex max-w-[320px] justify-center bg-footer">
          <GlobusLogo className="h-[48px] w-auto text-ink" markClassName="fill-globus" />
        </div>
      </div>

      <div className="wrap">
        <div className="grid lg:grid-cols-4 lg:gap-x-6">
          {topColumns.map((c) => (
            <Column key={c.title} heading={c.title}>
              {c.items.map((i) => (
                <li key={i} className={item}>
                  {i}
                </li>
              ))}
            </Column>
          ))}

          <Column heading="Fourcrest Mansions">
            {project.map((p) => (
              <li key={p} className={item}>
                {p}
              </li>
            ))}
          </Column>
          <Column heading="Explore">
            {explore.map((l) => (
              <li key={l.href}>
                <a href={l.href} className={`${item} inline-block transition-colors duration-500 hover:text-brand`}>
                  {l.label}
                </a>
              </li>
            ))}
          </Column>
          <Column heading="Elevations">
            {elevations.map((e) => (
              <li key={e} className={item}>
                {e}
              </li>
            ))}
          </Column>
        </div>

        {/* Phones: the last tap-to-open row already has a line under it */}
        <div className="hidden h-px bg-footer-line lg:block" />
        <div className="grid items-center justify-items-center gap-3 py-[45px] text-center text-[12px] font-normal uppercase leading-[18px] tracking-[1.2px] text-ink lg:grid-cols-3 lg:justify-items-stretch lg:gap-x-6 lg:text-left wide:text-[17px] wide:leading-[25px] wide:tracking-[1.7px]">
          <span>© 2026. Globus Developers, all rights reserved.</span>
          <span className="normal-case tracking-normal text-ink/60 lg:text-center">All images are artistic impressions.</span>
          <span className="flex items-center justify-center lg:justify-end">
            <BrochureButton className="pr-3 uppercase tracking-[1.2px] transition-colors duration-500 hover:text-brand wide:tracking-[1.7px]">Brochure</BrochureButton>
            <span>|</span>
            <Link href="/#enquire" className="pl-3 transition-colors duration-500 hover:text-brand">
              Enquire
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
