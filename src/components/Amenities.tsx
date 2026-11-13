"use client";

import { Children, cloneElement, isValidElement, useEffect, useRef, useState, type ReactElement, type ReactNode } from "react";

/*
  "Everyday Living, Elevated." from brochure page 15: the eight amenities as line icons that
  draw themselves like a pen, stroke by stroke, on a loop (CSS .icon-draw in globals.css).
  Every <path>/<circle> needs pathLength="1" for the draw effect; each gets its stroke number
  (--stroke) below so they draw in order. The loop starts when the section comes on screen.
*/
const amenities: { label: string; icon: ReactNode }[] = [
  {
    label: "Swimming Pool",
    icon: (
      <>
        <path pathLength={1} d="M16 30V11a4 4 0 0 1 8 0" />
        <path pathLength={1} d="M28 30V11a4 4 0 0 1 8 0" />
        <path pathLength={1} d="M16 17h12M16 24h12" />
        <path pathLength={1} d="M5 35c3 0 3.5 2 6.5 2s3.5-2 6.5-2 3.5 2 6.5 2 3.5-2 6.5-2 3.5 2 6.5 2 3.5-2 6.5-2" />
        <path pathLength={1} d="M5 41c3 0 3.5 2 6.5 2s3.5-2 6.5-2 3.5 2 6.5 2 3.5-2 6.5-2 3.5 2 6.5 2 3.5-2 6.5-2" />
      </>
    ),
  },
  {
    label: "Dedicated Kids’ Play Area",
    icon: (
      <>
        <path pathLength={1} d="M8 15l7-8 7 8" />
        <path pathLength={1} d="M10 42V15h10v27" />
        <path pathLength={1} d="M10 23h10M10 31h10" />
        <path pathLength={1} d="M20 21c9 0 9 19 20 19h3" />
        <path pathLength={1} d="M4 42h40" />
      </>
    ),
  },
  {
    label: "Fully Equipped Gym",
    icon: (
      <>
        <path pathLength={1} d="M13 24h22" />
        <path pathLength={1} d="M9 18h4v12H9z" />
        <path pathLength={1} d="M35 18h4v12h-4z" />
        <path pathLength={1} d="M13 14h4v20h-4zM31 14h4v20h-4z" />
        <path pathLength={1} d="M5 22v4M43 22v4" />
      </>
    ),
  },
  {
    label: "Yoga & Meditation Deck",
    icon: (
      <>
        <circle pathLength={1} cx="24" cy="10" r="4" />
        <path pathLength={1} d="M24 15v13" />
        <path pathLength={1} d="M24 19c-3 4-7 6-11 7M24 19c3 4 7 6 11 7" />
        <path pathLength={1} d="M10 37c5-1 9-5 14-9 5 4 9 8 14 9" />
        <path pathLength={1} d="M6 42h36" />
      </>
    ),
  },
  {
    label: "Landscaped Gardens",
    icon: (
      <>
        <circle pathLength={1} cx="24" cy="17" r="10" />
        <path pathLength={1} d="M24 42V20" />
        <path pathLength={1} d="M24 30l-6-5M24 25l5-4" />
        <path pathLength={1} d="M6 42c2-5 6-6 9-4M42 42c-2-5-6-6-9-4" />
        <path pathLength={1} d="M4 42h40" />
      </>
    ),
  },
  {
    label: "Multipurpose Hall",
    icon: (
      <>
        <path pathLength={1} d="M6 16L24 6l18 10H6z" />
        <path pathLength={1} d="M11 20v15M19 20v15M29 20v15M37 20v15" />
        <path pathLength={1} d="M8 36h32" />
        <path pathLength={1} d="M5 41h38" />
      </>
    ),
  },
  {
    label: "Indoor Games Lounge",
    icon: (
      <>
        <path pathLength={1} d="M15 16h18a9 9 0 0 1 8.9 7.6l1.1 7.4a5 5 0 0 1-9 3.6L31 31H17l-3 3.6a5 5 0 0 1-9-3.6l1.1-7.4A9 9 0 0 1 15 16z" />
        <path pathLength={1} d="M15 21v7M11.5 24.5h7" />
        <circle pathLength={1} cx="31" cy="22.5" r="1.6" />
        <circle pathLength={1} cx="35" cy="26.5" r="1.6" />
      </>
    ),
  },
  {
    label: "Jogging & Walking Track",
    icon: (
      <>
        <path pathLength={1} d="M15 13h18a11 11 0 0 1 0 22H15a11 11 0 0 1 0-22z" />
        <path pathLength={1} d="M16 19h16a5 5 0 0 1 0 10H16a5 5 0 0 1 0-10z" />
        <path pathLength={1} d="M24 35v6M21 41h6" />
      </>
    ),
  },
];

// Gives each stroke of an icon its order number (--stroke) so they draw one after another
function numberStrokes(icon: ReactNode) {
  const kids = isValidElement(icon) ? (icon as ReactElement<{ children: ReactNode }>).props.children : icon;
  return Children.toArray(kids).map((child, j) =>
    isValidElement(child)
      ? cloneElement(child as ReactElement<{ style?: React.CSSProperties }>, { style: { ["--stroke" as string]: j } })
      : child,
  );
}

export default function Amenities() {
  const ref = useRef<HTMLElement>(null);
  const [drawing, setDrawing] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawing(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} id="amenities" className={`${drawing ? "is-drawing " : ""}relative z-10 scroll-mt-16 bg-umber pb-[60px] pt-[60px] lg:pb-[90px] lg:pt-[90px]`}>
      <div className="wrap">
        {/* Section heading, same style as the others; honey on the brown background */}
        <h2 className="mb-[34px] text-center font-serif text-[42px] font-light italic leading-[46px] text-honey lg:mb-[60px] lg:text-[52px] lg:leading-[54px] wide:text-[73px] wide:leading-[76px]">
          <span className="block font-sans text-[18px] font-light not-italic uppercase leading-[21px] tracking-[1.5px] text-honey lg:text-[24px] lg:leading-[29px] wide:text-[34px] wide:leading-[41px] wide:tracking-[2.1px]">
            Everyday Living,{" "}
          </span>
          Elevated.
        </h2>

        <ul className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-14">
          {amenities.map((a, i) => (
            <li key={a.label} className="flex flex-col items-center text-center">
              <svg
                viewBox="0 0 48 48"
                aria-hidden
                fill="none"
                stroke="currentColor"
                strokeWidth={1.3}
                strokeLinecap="round"
                strokeLinejoin="round"
                // Each icon starts a little after the previous one
                style={{ ["--icon" as string]: i }}
                className="icon-draw size-[60px] text-honey lg:size-[76px] wide:size-[100px]"
              >
                {numberStrokes(a.icon)}
              </svg>
              <p className="mt-4 text-[14px] font-light leading-[20px] text-white/90 lg:mt-5 lg:text-[17px] lg:leading-[24px] wide:text-[23px] wide:leading-[32px]">
                {a.label}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
