"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { crests } from "@/lib/crests";
import { ChevronDownIcon } from "./Icons";

/*
  The four elevations as a carousel of 4:3 photo + text slides.
  - Crossfades to the next crest every 2 seconds and loops; pauses while the pointer is over it.
  - Desktop: photo and text swap sides on alternate crests (01 photo left / text right, 02 the reverse, ...).
    Text is centred in its column on desktop. Phones: photo on top, text below.
  - Arrow buttons on the left and right; using them restarts the 2-second timer.
*/
const INTERVAL = 2000;

export default function Crests() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [tick, setTick] = useState(0); // bumps on arrow clicks so the timer restarts

  const go = (step: number) => {
    setActive((i) => (i + step + crests.length) % crests.length);
    setTick((t) => t + 1);
  };

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % crests.length), INTERVAL);
    return () => window.clearInterval(id);
  }, [paused, tick]);

  return (
    <section
      id="elevations"
      aria-roledescription="carousel"
      aria-label="The four Fourcrest elevations"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative z-10 scroll-mt-[82px] bg-blush lg:scroll-mt-[70px] pb-[60px] lg:pb-[90px]"
    >
      {/* Section heading, same style as "Four Expressions" and "Space to Breathe" */}
      <div className="wrap">
        <h2 className="mb-[34px] text-center font-serif text-[42px] font-light italic leading-[50px] text-brand lg:mb-[50px] lg:text-[52px] lg:leading-[62px]">
          <span className="block font-sans text-[18px] font-light not-italic uppercase leading-[21px] tracking-[1.5px] text-ink lg:inline lg:text-[24px] lg:leading-[29px]">
            Distinct by Design.{" "}
          </span>
          Find the Home That Speaks to You
        </h2>
      </div>
      <div className="relative">
        {/* Old slide fades out (300ms), then the new one fades in (500ms), so the swapped layouts never overlap.
            Slides stack in one grid cell, so the section is as tall as the tallest slide */}
        <div className="wrap grid lg:px-32">
          {crests.map((c, i) => {
            const on = i === active;
            const imageRight = i % 2 === 1; // 01 image left, 02 image right, ...
            return (
              <div
                key={c.no}
                aria-hidden={!on}
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${crests.length}`}
                className={`[grid-area:1/1] transition-opacity ease-[cubic-bezier(0.4,0,0.2,1)] lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-12 ${
                  on ? "z-10 opacity-100 delay-300 duration-500" : "pointer-events-none z-0 opacity-0 duration-300"
                }`}
              >
                <div className={`relative aspect-[4/3] overflow-hidden rounded-[7px] lg:col-span-7 ${imageRight ? "lg:order-2" : ""}`}>
                  <Image
                    src={`/images/crest-${c.no}.jpg`}
                    alt={`Crest-${c.no}, ${c.name} elevation, artistic impression`}
                    fill
                    sizes="(min-width: 1000px) 41vw, 100vw"
                    className="object-cover"
                  />
                </div>

                <div
                  key={on ? `on-${active}` : "off"}
                  className={`mt-6 lg:col-span-5 lg:mx-auto lg:mt-0 lg:max-w-[420px] lg:text-center ${imageRight ? "lg:order-1" : ""} ${
                    on ? "motion-safe:animate-[crest-rise_0.7s_0.3s_cubic-bezier(0.22,1,0.36,1)_both]" : ""
                  }`}
                >
                  <h3 className="font-serif text-[44px] font-light italic leading-none text-brand lg:text-[72px]">Crest-{c.no}</h3>
                  <p className="mt-3 text-[18px] leading-tight text-ink lg:mt-4 lg:text-[22px]">{c.name}</p>
                  <p className="mt-3 text-[15px] font-light leading-[24px] text-ink/80 lg:mt-5 lg:text-[17px] lg:leading-[28px]">{c.body}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Side arrows: over the photo on phones, in the page margins on desktop */}
        <button
          type="button"
          aria-label="Previous elevation"
          onClick={() => go(-1)}
          className="absolute top-[calc((100vw-40px)*0.375)] left-7 z-20 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-[rgba(21,21,21,0.3)] text-white backdrop-blur-[20px] transition-colors duration-300 hover:bg-brand lg:top-1/2 lg:left-14 lg:size-14 lg:border lg:border-brand lg:bg-transparent lg:text-brand lg:backdrop-blur-none lg:hover:text-white"
        >
          <ChevronDownIcon className="size-5 rotate-90 lg:size-6" />
        </button>
        <button
          type="button"
          aria-label="Next elevation"
          onClick={() => go(1)}
          className="absolute top-[calc((100vw-40px)*0.375)] right-7 z-20 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-[rgba(21,21,21,0.3)] text-white backdrop-blur-[20px] transition-colors duration-300 hover:bg-brand lg:top-1/2 lg:right-14 lg:size-14 lg:border lg:border-brand lg:bg-transparent lg:text-brand lg:backdrop-blur-none lg:hover:text-white"
        >
          <ChevronDownIcon className="size-5 -rotate-90 lg:size-6" />
        </button>
      </div>
    </section>
  );
}
