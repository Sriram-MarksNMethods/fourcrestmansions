"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const clamp = (v: number) => Math.min(Math.max(v, 0), 1);

/*
  Sobha's "In the heart of Luxury" block (their GSAP code, translated). Same 0.5s tween (GSAP default
  power1.out) on every screen size, toggled (not scrubbed); scrolling back above the trigger reverses it.

  Desktop (≥1000px), plus a pinned pan so the full-size collage can actually be seen:
    the section pins a full-screen stage; when it pins, the photo clips to inset(15vh 38vw 15vh 38vw round 7px),
    the title fades out and the four side photos come in from ±150px. While pinned, the collage pans upwards
    behind the clipped photo (top photos just below the header → bottom photos just above the bottom bar).

  Phones (<1000px), as on Sobha's phone layout — no pin:
    the photo sits 2vh into a short section, and when the section top reaches 30% of the screen it clips to
    inset(18vh 5vw 18vh 42vw round 7px) while the four small photos (Sobha's 80/103px widths) fade in around it.
*/
export default function LuxuryGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const collageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1000px)");
    let frame = 0;

    const tick = () => {
      frame = 0;
      const section = sectionRef.current;
      const collage = collageRef.current;
      if (!section || !collage) return;
      const vh = window.innerHeight;

      if (!desktop.matches) {
        section.style.height = "";
        collage.style.transform = "";
        setActive(section.getBoundingClientRect().top <= vh * 0.3);
        return;
      }

      // Pin length = how far the collage must travel to show every photo, plus a short hold at the end.
      const top = 90; // just below the header
      const bottom = 80; // just above the bottom bar
      const pan = Math.max(0, collage.offsetHeight + top + bottom - vh);
      section.style.height = `${vh + pan + vh * 0.25}px`;

      const r = section.getBoundingClientRect();
      const panProgress = pan ? clamp(-r.top / pan) : 1;
      collage.style.transform = `translateY(${top - pan * panProgress}px)`;
      setActive(r.top <= 0);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    desktop.addEventListener("change", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      desktop.removeEventListener("change", onScroll);
    };
  }, []);

  // GSAP plays the 0.5s timeline forwards with power1.out; reversing it runs the same curve backwards (power1.in).
  const tween = `transition-all duration-500 ${active ? "ease-power1-out" : "ease-power1-in"}`;
  const boxIn = active ? "translate-y-0! opacity-100!" : "";

  return (
    <section className="relative z-10 bg-blush pb-[60px] lg:pb-[50px]">
      {/* "Space to Breathe" sits above the collage as a section heading (same style as "Four Expressions"), not over the photo */}
      <div className="wrap">
        <h2 className="mb-[34px] text-center font-serif text-[42px] font-light italic leading-[50px] text-brand lg:mb-[50px] lg:text-[52px] lg:leading-[62px]">
          <span className="block font-sans text-[18px] font-light not-italic uppercase leading-[21px] tracking-[1.5px] text-ink lg:inline lg:text-[24px] lg:leading-[29px]">
            Space to{" "}
          </span>
          Breathe
        </h2>
      </div>
      {/* Desktop height is set in the effect: one screen + the collage's pan distance + a short hold. Phones: as tall as the collage. */}
      <div ref={sectionRef} className="relative lg:h-[200vh]">
        <div className="relative overflow-hidden lg:sticky lg:top-0 lg:h-screen">
          {/* Full-bleed photo that clips into the centre */}
          <div
            className={`absolute inset-x-0 top-[2vh] z-10 aspect-[390/667] lg:inset-0 lg:aspect-auto ${tween} ${
              active
                ? "[clip-path:inset(18vh_5vw_18vh_42vw_round_7px)] lg:[clip-path:inset(15vh_38vw_15vh_38vw_round_7px)]"
                : "[clip-path:inset(0px_0px_0px_0px_round_0px)]"
            }`}
          >
            {/* Landscape cover on desktop, vertical version on phones */}
            <Image src="/images/garden-path-wide.jpg" alt="Woman walking a stone path through a tropical garden" fill sizes="100vw" className="hidden object-cover lg:block" />
            <Image src="/images/garden-path-tall.jpg" alt="Woman walking a stone path through a tropical garden" fill sizes="100vw" className="object-cover lg:hidden" />
          </div>

          {/*
            Collage at Sobha's sizes: 379×511 and 339×482 (left column), 379×559 and 379×511 (right column).
            Desktop: three columns with the middle one left empty for the clipped photo; the whole block is moved
            up by the effect while the stage is pinned.
            Phones (Sobha's sizes): first row = swing chair (135px, 80px ≤400px) left + library (103px) right,
            10vh gap, then living room (103px) and pool deck (133px, 80px ≤400px) down the left edge.
          */}
          <div ref={collageRef} className="relative lg:absolute lg:inset-x-0 lg:top-0 lg:will-change-transform">
            <div className="wrap">
              <div className="lg:grid lg:grid-cols-3 lg:gap-x-6 lg:gap-y-0">
                <div className="mb-[10vh] flex items-start justify-between lg:mb-0 lg:block">
                  <div className={`relative mt-[35px] w-[135px] -translate-y-[150px] opacity-0 max-[400px]:w-20 lg:left-[7%] lg:mt-0 lg:w-auto ${tween} ${boxIn}`}>
                    <div className="relative aspect-[379/511] overflow-hidden rounded-[7px]">
                      <Image src="/images/swing-chair.jpg" alt="Woman relaxing on a rattan swing chair in a garden" fill sizes="(min-width: 1000px) 27vw, 140px" className="object-cover" />
                    </div>
                  </div>
                  <div className={`relative w-[103px] translate-y-[150px] opacity-0 max-[360px]:w-20 lg:left-[7%] lg:mt-[86px] lg:w-auto lg:pl-10 ${tween} ${boxIn}`}>
                    <div className="relative aspect-[339/482] overflow-hidden rounded-[7px]">
                      <Image src="/images/library-lounge-hd.jpg" alt="Library lounge with arched window" fill sizes="(min-width: 1000px) 27vw, 140px" className="object-cover" />
                    </div>
                  </div>
                </div>

                <div aria-hidden className="hidden lg:block" />

                <div>
                  <div className={`relative mb-[25px] w-[103px] -translate-y-[150px] opacity-0 max-[360px]:w-20 min-[767px]:mb-[113px] lg:-left-[7%] lg:w-auto ${tween} ${boxIn}`}>
                    <div className="relative aspect-[379/559] overflow-hidden rounded-[7px]">
                      <Image src="/images/formal-living-hd.jpg" alt="Formal living room with chandelier" fill sizes="(min-width: 1000px) 27vw, 140px" className="object-cover" />
                    </div>
                  </div>
                  <div className={`relative w-[133px] translate-y-[150px] opacity-0 max-[400px]:w-20 lg:-left-[7%] lg:w-auto ${tween} ${boxIn}`}>
                    <div className="relative aspect-[379/511] overflow-hidden rounded-[7px]">
                      <Image src="/images/pool-deck-hd.jpg" alt="Lounger beside a reflecting pool" fill sizes="(min-width: 1000px) 27vw, 140px" className="object-cover" />
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
