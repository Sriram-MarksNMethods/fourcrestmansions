"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const clamp = (v: number) => Math.min(Math.max(v, 0), 1);

/*
  Sobha's "In the heart of Luxury" block (their GSAP code, translated), plus a pinned pan so the
  full-size collage can actually be seen:

  - The section pins a full-screen stage. While pinned, the collage (Sobha's original photo sizes)
    pans upwards behind the clipped centre photo: it starts with the top photos just below the
    header and ends with the bottom photos just above the bottom bar.

  Desktop (≥1000px) reveal — time-based, not scrubbed:
    when the stage pins, a 0.5s tween (GSAP default power1.out) clips the photo to
    inset(15vh 38vw 15vh 38vw round 7px), fades the title out and brings the four side photos in
    from ±150px. Scrolling back above the section reverses it.

  Mobile (<1000px) reveal — scrubbed with 1s smoothing (scrub: 1), clipping to
    inset(18vh 5vw 18vh 42vw round 7px).
*/
export default function LuxuryGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const collageRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const upRef = useRef<HTMLDivElement[]>([]); // start 150px higher
  const downRef = useRef<HTMLDivElement[]>([]); // start 150px lower
  const [active, setActive] = useState(false); // desktop reveal state

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1000px)");
    let frame = 0;
    let last = performance.now();
    let smooth = 0; // mobile scrubbed reveal progress

    const paintMobileReveal = (p: number) => {
      const main = mainRef.current;
      if (!main) return;
      main.style.clipPath = `inset(${18 * p}vh ${5 * p}vw ${18 * p}vh ${42 * p}vw round ${7 * p}px)`;
      if (titleRef.current) titleRef.current.style.opacity = String(1 - p);
      // Tailwind's translate-y classes use the CSS `translate` property, so override that (not `transform`).
      upRef.current.forEach((el) => {
        el.style.opacity = String(p);
        el.style.translate = `0 ${-150 * (1 - p)}px`;
      });
      downRef.current.forEach((el) => {
        el.style.opacity = String(p);
        el.style.translate = `0 ${150 * (1 - p)}px`;
      });
    };

    const clearInline = () => {
      [mainRef.current, titleRef.current, ...upRef.current, ...downRef.current].forEach((el) => {
        if (!el) return;
        el.style.clipPath = "";
        el.style.opacity = "";
        el.style.translate = "";
      });
    };

    const tick = (now: number) => {
      frame = 0;
      const section = sectionRef.current;
      const collage = collageRef.current;
      if (!section || !collage) return;

      // Pin length = how far the collage must travel to show every photo, plus a short hold at the end.
      const vh = window.innerHeight;
      const top = desktop.matches ? 90 : 100; // just below the header
      const bottom = 80; // just above the bottom bar
      const pan = Math.max(0, collage.offsetHeight + top + bottom - vh);
      section.style.height = `${vh + pan + vh * 0.25}px`;

      const r = section.getBoundingClientRect();
      const panProgress = pan ? clamp(-r.top / pan) : 1;
      collage.style.transform = `translateY(${top - pan * panProgress}px)`;

      if (desktop.matches) {
        setActive(r.top <= 0);
        return;
      }

      // reveal runs from "top 30%" until the stage pins, so the photos are in place before the pan starts
      const start = vh * 0.3;
      const target = clamp((start - r.top) / start);
      const dt = now - last;
      last = now;
      smooth += (target - smooth) * (1 - Math.pow(0.001, dt / 1000));
      if (Math.abs(target - smooth) < 0.001) smooth = target;
      paintMobileReveal(smooth);
      if (smooth !== target) frame = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      if (!frame) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      }
    };
    const onChange = () => {
      clearInline();
      onScroll();
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    desktop.addEventListener("change", onChange);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      desktop.removeEventListener("change", onChange);
    };
  }, []);

  // GSAP plays the 0.5s timeline forwards with power1.out; reversing it runs the same curve backwards (power1.in).
  const tween = `lg:transition-all lg:duration-500 ${active ? "lg:ease-power1-out" : "lg:ease-power1-in"}`;
  const boxIn = active ? "lg:translate-y-0 lg:opacity-100" : "";
  const addUp = (el: HTMLDivElement | null) => {
    if (el && !upRef.current.includes(el)) upRef.current.push(el);
  };
  const addDown = (el: HTMLDivElement | null) => {
    if (el && !downRef.current.includes(el)) downRef.current.push(el);
  };

  return (
    <section className="relative z-10 bg-blush pb-[50px]">
      {/* Height is set in the effect: one screen + the collage's pan distance + a short hold */}
      <div ref={sectionRef} className="relative h-[200vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Full-bleed photo that clips into the centre */}
          <div
            ref={mainRef}
            className={`absolute inset-0 z-10 ${tween} ${
              active
                ? "lg:[clip-path:inset(15vh_38vw_15vh_38vw_round_7px)]"
                : "lg:[clip-path:inset(0px_0px_0px_0px_round_0px)]"
            }`}
          >
            {/* Landscape cover on desktop, vertical version on phones */}
            <Image src="/images/garden-path-wide.jpg" alt="Woman walking a stone path through a tropical garden" fill sizes="100vw" className="hidden object-cover lg:block" />
            <Image src="/images/garden-path-tall.jpg" alt="Woman walking a stone path through a tropical garden" fill sizes="100vw" className="object-cover lg:hidden" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div ref={titleRef} className={`text-center text-white ${tween} ${active ? "lg:opacity-0" : ""}`}>
                <h5 className="mb-2 text-[32px] font-light leading-[30px] tracking-[4.8px]">SPACE TO</h5>
                <h2 className="mb-[34px] font-serif text-[72px] font-light italic leading-[84px] tracking-[9px] lg:text-[134px] lg:leading-[100px] lg:tracking-[20.5px]">
                  Breathe
                </h2>
              </div>
            </div>
          </div>

          {/*
            Collage at Sobha's sizes: 379×511 and 339×482 (left column), 379×559 and 379×511 (right column).
            Desktop: three columns with the middle one left empty for the clipped photo.
            Phones: the column wrappers use `contents`, so all four photos stack in one narrow column on the left.
            The whole block is moved up by the effect while the stage is pinned.
          */}
          <div ref={collageRef} className="absolute inset-x-0 top-0 will-change-transform">
            <div className="wrap">
              <div className="flex w-[37vw] flex-col gap-5 lg:grid lg:w-auto lg:grid-cols-3 lg:gap-x-6 lg:gap-y-0">
                <div className="contents lg:block">
                  <div ref={addUp} className={`relative -translate-y-[150px] opacity-0 lg:left-[7%] ${tween} ${boxIn}`}>
                    <div className="relative aspect-[379/511] overflow-hidden rounded-[7px]">
                      <Image src="/images/swing-chair.jpg" alt="Woman relaxing on a rattan swing chair in a garden" fill sizes="(min-width: 1000px) 379px, 37vw" className="object-cover" />
                    </div>
                  </div>
                  <div ref={addDown} className={`relative translate-y-[150px] opacity-0 lg:left-[7%] lg:mt-[86px] lg:pl-10 ${tween} ${boxIn}`}>
                    <div className="relative aspect-[339/482] overflow-hidden rounded-[7px]">
                      <Image src="/images/library-lounge-hd.jpg" alt="Library lounge with arched window" fill sizes="(min-width: 1000px) 339px, 37vw" className="object-cover" />
                    </div>
                  </div>
                </div>

                <div aria-hidden className="hidden lg:block" />

                <div className="contents lg:block">
                  <div ref={addUp} className={`relative -translate-y-[150px] opacity-0 lg:-left-[7%] lg:mb-[113px] ${tween} ${boxIn}`}>
                    <div className="relative aspect-[379/559] overflow-hidden rounded-[7px]">
                      <Image src="/images/formal-living-hd.jpg" alt="Formal living room with chandelier" fill sizes="(min-width: 1000px) 379px, 37vw" className="object-cover" />
                    </div>
                  </div>
                  <div ref={addDown} className={`relative translate-y-[150px] opacity-0 lg:-left-[7%] ${tween} ${boxIn}`}>
                    <div className="relative aspect-[379/511] overflow-hidden rounded-[7px]">
                      <Image src="/images/pool-deck-hd.jpg" alt="Lounger beside a reflecting pool" fill sizes="(min-width: 1000px) 379px, 37vw" className="object-cover" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
