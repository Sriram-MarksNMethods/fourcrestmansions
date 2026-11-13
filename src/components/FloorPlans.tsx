"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronDownIcon } from "./Icons";

/*
  Floor plans, gated: the images in public/images/floor-plans are already blurred (the blur is
  baked into the files, so the sharp plans are never sent to the browser).
  Source: "Globus Mankhal - Parcel 03 - 500 SQYDS" East / West Facing PDFs (title strip cropped off).

  East Facing / West Facing category tabs above one carousel (switching tabs starts it from the Ground Floor):
  - slides one plan left every 2 seconds and loops seamlessly (the first plans are repeated at the end,
    and the track jumps back to the start without animation once it reaches them)
  - pauses while the pointer is over it; arrows step by one and restart the timer
  - 1 plan visible on phones, 2 from tablets up
  Hovering a plan shows "Download Brochure", which scrolls to the enquiry form (#enquire).
  Phones have no hover, so the button is always shown there.
*/
const INTERVAL = 2000;

const floors = [
  { id: "ground", label: "Ground Floor" },
  { id: "first", label: "First Floor" },
  { id: "second", label: "Second Floor" },
  { id: "terrace", label: "Terrace Floor" },
];

// Real plans followed by copies of the first two (enough to fill the 2-up view at the loop point)
const track = [...floors, ...floors.slice(0, 2)];

const facings = [
  { id: "east", label: "East Facing" },
  { id: "west", label: "West Facing" },
] as const;

function PlanCarousel({ facing, label }: { facing: "east" | "west"; label: string }) {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const [tick, setTick] = useState(0); // bumps on arrow clicks so the timer restarts

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setAnimate(true);
      setIndex((i) => i + 1);
    }, INTERVAL);
    return () => window.clearInterval(id);
  }, [paused, tick]);

  // Reached the copies: snap back to the matching real slide with no animation
  const onTransitionEnd = () => {
    if (index >= floors.length) {
      setAnimate(false);
      setIndex(index - floors.length);
    }
  };

  const go = (step: number) => {
    setTick((t) => t + 1);
    if (step < 0 && index === 0) {
      // Going back from the first plan: jump to its copy at the end first, then slide back one
      setAnimate(false);
      setIndex(floors.length);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setAnimate(true);
          setIndex(floors.length - 1);
        }),
      );
      return;
    }
    setAnimate(true);
    setIndex((i) => i + step);
  };

  return (
    <div
      aria-roledescription="carousel"
      aria-label={`${label} floor plans`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative">
        <div className="overflow-hidden">
          <div
            onTransitionEnd={onTransitionEnd}
            // One slide = 100% of the row on phones, 50% from md up
            style={{ ["--i" as string]: index }}
            className={`flex -mx-3 translate-x-[calc(var(--i)*-100%)] md:translate-x-[calc(var(--i)*-50%)] ${
              animate ? "transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]" : ""
            }`}
          >
            {track.map((fl, i) => (
              <figure key={`${fl.id}-${i}`} aria-hidden={i >= floors.length} className="w-full shrink-0 px-3 md:w-1/2">
                <div className="group relative aspect-[1200/691] overflow-hidden rounded-[7px] bg-white">
                  <Image
                    src={`/images/floor-plans/${facing}-${fl.id}.jpg`}
                    alt={`${fl.label} plan, ${label.toLowerCase()} (enquire to view)`}
                    fill
                    sizes="(min-width: 768px) 45vw, 100vw"
                    className="object-cover"
                  />
                  {/* Shown on hover from tablets up, always on phones */}
                  <div className="absolute inset-0 flex items-center justify-center bg-ink/10 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100">
                    <a
                      href="#enquire"
                      tabIndex={i >= floors.length ? -1 : undefined}
                      className="rounded-[50px] bg-brand px-6 py-3 text-[13px] font-semibold uppercase tracking-[1px] text-white transition-colors hover:bg-brand-dark lg:text-[14px]"
                    >
                      Download Brochure
                    </a>
                  </div>
                </div>
                <figcaption className="mt-3 text-center text-[14px] uppercase tracking-[1px] text-white/90 lg:text-[16px] wide:text-[20px]">
                  {fl.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* Arrows: in a row below the plan on phones; on the image sides from tablets, outside it on desktop */}
        <div className="mt-5 flex justify-center gap-4 md:contents">
        <button
          type="button"
          aria-label="Previous plan"
          onClick={() => go(-1)}
          className="grid size-10 place-items-center rounded-full border border-honey text-honey transition-colors duration-300 hover:bg-honey hover:text-umber md:absolute md:top-[calc(50%-14px)] md:z-10 md:-translate-y-1/2 md:border-0 md:bg-[rgba(21,21,21,0.3)] md:text-white md:backdrop-blur-[20px] lg:size-12 lg:border lg:bg-transparent lg:text-honey lg:backdrop-blur-none md:left-2 lg:-left-16"
        >
          <ChevronDownIcon className="size-5 rotate-90" />
        </button>
        <button
          type="button"
          aria-label="Next plan"
          onClick={() => go(1)}
          className="grid size-10 place-items-center rounded-full border border-honey text-honey transition-colors duration-300 hover:bg-honey hover:text-umber md:absolute md:top-[calc(50%-14px)] md:z-10 md:-translate-y-1/2 md:border-0 md:bg-[rgba(21,21,21,0.3)] md:text-white md:backdrop-blur-[20px] lg:size-12 lg:border lg:bg-transparent lg:text-honey lg:backdrop-blur-none md:right-2 lg:-right-16"
        >
          <ChevronDownIcon className="size-5 -rotate-90" />
        </button>
        </div>
      </div>
    </div>
  );
}

export default function FloorPlans() {
  const [facing, setFacing] = useState<(typeof facings)[number]["id"]>("east");
  const current = facings.find((f) => f.id === facing)!;

  return (
    <section id="floor-plans" className="relative z-10 scroll-mt-16 bg-umber pb-[60px] pt-[60px] lg:pb-[90px] lg:pt-[90px]">
      <div className="wrap">
        <h2 className="mb-[34px] text-center font-serif text-[42px] font-light italic leading-[46px] text-honey lg:mb-[50px] lg:text-[52px] lg:leading-[54px] wide:text-[73px] wide:leading-[76px]">
          <span className="block font-sans text-[18px] font-light not-italic uppercase leading-[21px] tracking-[1.5px] text-honey lg:text-[24px] lg:leading-[29px] wide:text-[34px] wide:leading-[41px] wide:tracking-[2.1px]">
            Floor Plans.{" "}
          </span>
          Every level, considered
        </h2>

        {/* Categories */}
        <div role="tablist" aria-label="Plot facing" className="mb-[30px] flex justify-center gap-3 lg:mb-[40px]">
          {facings.map((f) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={facing === f.id}
              onClick={() => setFacing(f.id)}
              className={`rounded-[50px] border px-5 py-2 text-[13px] uppercase tracking-[1px] transition-colors duration-300 lg:px-7 lg:text-[15px] wide:text-[19px] ${
                facing === f.id ? "border-honey bg-honey text-umber" : "border-honey text-honey hover:bg-honey/10"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* key: a fresh carousel (back to Ground Floor) for each category */}
        <PlanCarousel key={facing} facing={facing} label={current.label} />
      </div>
    </section>
  );
}
