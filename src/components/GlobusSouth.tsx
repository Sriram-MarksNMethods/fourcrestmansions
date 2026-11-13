"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/*
  "Globus South" from brochure page 20, as a pinned take-off scene.

  Layers (both cut from the brochure photo, 1518×1036):
  - runway.jpg: the photo with the plane removed
  - plane.webp: the plane on its own, edges cleaned (it sits at x 595, y 518, 822×251 in the photo)

  How it works:
  - The section is 260vh tall; inside it a full-screen box is sticky, so the scene stays put
    for 160vh of scrolling while everything else waits.
  - Over that scroll the plane lifts off and climbs to just below the text (about halfway up),
    where it stops. The runway photo stays fixed, and the plane grows only 6%: the brochure photo is low resolution, so it must not be enlarged much.
    Then the sticky box releases and the page scrolls on.
  - Moving the mouse nudges the plane a few pixels (the runway never moves).
  - With "reduce motion" the plane stays where it is in the photo.

  The photo is placed by layoutStage() so the plane is always fully on screen at the start:
  - landscape screens: the photo covers the screen, plane at about 70% down
  - portrait screens (phones): the photo is 160% of the screen width, sitting on the bottom edge,
    with plain sky (the photo's own sky colour) above it for the text and the climb
*/
const RATIO = 1518 / 1036;
const PLANE = { x: 595 / 1518, y: 518 / 1036, w: 822 / 1518, h: 251 / 1036 };
const PLANE_CX = PLANE.x + PLANE.w / 2; // 0.66 of the photo width
const PLANE_CY = PLANE.y + PLANE.h / 2; // 0.62 of the photo height
const SKY = "#f4ebe8"; // sampled from the top of the photo

export default function GlobusSouth() {
  const section = useRef<HTMLElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const plane = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sec = section.current;
    const bx = box.current;
    const st = stage.current;
    const pl = plane.current;
    const tx = text.current;
    if (!sec || !bx || !st || !pl || !tx) return;

    const geo = { w: 0, h: 0, top: 0 };
    const layoutStage = () => {
      const vw = bx.clientWidth;
      const vh = bx.clientHeight;
      const portrait = vw / vh < 1;
      const w = portrait ? vw * 1.6 : Math.max(vw, vh * RATIO);
      const h = w / RATIO;
      const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
      const left = clamp(vw / 2 - PLANE_CX * w, vw - w, 0);
      const top = portrait ? vh - h : clamp(vh * 0.7 - PLANE_CY * h, vh - h, 0);
      Object.assign(st.style, { width: `${w}px`, height: `${h}px`, left: `${left}px`, top: `${top}px`, opacity: "1" });
      geo.w = w;
      geo.h = h;
      geo.top = top;
    };
    layoutStage();
    const ro = new ResizeObserver(layoutStage);
    ro.observe(bx);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => ro.disconnect();

    let frame = 0;
    let running = false;
    const mouse = { x: 0, y: 0 }; // target, -1..1
    const lean = { x: 0, y: 0 }; // eased towards the target

    const tick = () => {
      const r = sec.getBoundingClientRect();
      const vh = bx.clientHeight;
      // 0 when the scene pins, 1 when it releases
      const p = Math.min(1, Math.max(0, -r.top / (r.height - window.innerHeight)));
      // Take-off between 5% and 85% of the pinned scroll, then it holds; eased in and out
      const raw = Math.min(1, Math.max(0, (p - 0.05) / 0.8));
      const t = raw * raw * (3 - 2 * raw);

      lean.x += (mouse.x - lean.x) * 0.05;
      lean.y += (mouse.y - lean.y) * 0.05;

      // Where the plane stops: its centre just below the text, and never lower than where it started
      const planeH = PLANE.h * geo.h * 1.06;
      const start = geo.top + PLANE_CY * geo.h;
      const textBottom = tx.offsetTop + tx.offsetHeight;
      const end = Math.min(start - 60, Math.max(textBottom + planeH / 2 + 24, vh * 0.4));
      // The runway stays fixed; only the plane moves
      const y = (end - start) * t + lean.y * 4;
      const x = t * geo.w * 0.015 + lean.x * 6;
      const scale = 1 + t * 0.06;
      const rotate = -t * 1.5;
      pl.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotate(${rotate.toFixed(2)}deg) scale(${scale.toFixed(3)})`;

      if (running) frame = requestAnimationFrame(tick);
    };

    // Only animate while the section is on screen
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true;
        frame = requestAnimationFrame(tick);
      } else if (!entry.isIntersecting) {
        running = false;
        cancelAnimationFrame(frame);
      }
    });
    io.observe(sec);

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = bx.getBoundingClientRect();
      mouse.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      mouse.y = ((e.clientY - r.top) / r.height) * 2 - 1;
    };
    const onLeave = () => {
      mouse.x = 0;
      mouse.y = 0;
    };
    bx.addEventListener("pointermove", onMove);
    bx.addEventListener("pointerleave", onLeave);

    return () => {
      ro.disconnect();
      io.disconnect();
      running = false;
      cancelAnimationFrame(frame);
      bx.removeEventListener("pointermove", onMove);
      bx.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    // 260vh: 100vh of scene + 160vh of scrolling while it is pinned
    <section ref={section} id="globus-south" className="relative z-10 h-[260vh] scroll-mt-0 bg-blush pb-[40px] lg:pb-[80px]">
      <div ref={box} className="sticky top-0 h-svh overflow-hidden" style={{ backgroundColor: SKY }}>
        {/* The photo, placed by layoutStage(); hidden until placed */}
        <div ref={stage} className="absolute opacity-0">
          <Image
            src="/images/globus-south/runway.jpg"
            alt="Airport runway with the control tower and terminal in the distance"
            fill
            sizes="(orientation: portrait) 160vw, 100vw"
            className="object-cover"
          />
          {/* Blends the top edge of the photo into the plain sky above it (phones) */}
          <div className="absolute inset-x-0 top-0 h-[20%]" style={{ background: `linear-gradient(180deg, ${SKY} 0%, rgba(244,235,232,0) 100%)` }} />
          <div
            ref={plane}
            className="absolute z-30 origin-center will-change-transform"
            style={{ left: `${PLANE.x * 100}%`, top: `${PLANE.y * 100}%`, width: `${PLANE.w * 100}%` }}
          >
            <Image src="/images/globus-south/plane.webp" alt="Aircraft taking off" width={852} height={254} sizes="(orientation: portrait) 90vw, 56vw" className="h-auto w-full" />
          </div>
        </div>

        {/* Text over the sky, below the header */}
        <div ref={text} className="wrap relative z-20 pt-[100px] text-center lg:pt-[110px] wide:pt-[140px]">
          <h2 className="font-serif text-[28px] font-light italic leading-[34px] text-brand sm:text-[34px] sm:leading-[42px] lg:text-[42px] lg:leading-[50px] wide:text-[60px] wide:leading-[70px]">
            <span className="mb-2 block font-sans text-[16px] font-light not-italic uppercase leading-[21px] tracking-[1.5px] text-ink lg:mb-3 lg:text-[24px] lg:leading-[29px] wide:text-[34px] wide:leading-[41px] wide:tracking-[2.1px]">
              Globus South
            </span>
            Hyderabad South&apos;s Growth Story <br className="hidden sm:block lg:hidden" />
            Begins with Globus.
          </h2>
          <p className="mx-auto mt-4 max-w-[820px] text-[14px] font-light leading-[22px] text-ink lg:mt-6 lg:text-[18px] lg:leading-[28px] wide:max-w-[1100px] wide:text-[24px] wide:leading-[36px]">
            The emerging growth hub, powered by international airport connectivity, proposed bullet train, expanding road
            networks and the visionary Bharat Future City.
          </p>
          <p className="mx-auto mt-3 max-w-[820px] text-[14px] font-light leading-[22px] text-ink lg:mt-4 lg:text-[18px] lg:leading-[28px] wide:max-w-[1100px] wide:text-[24px] wide:leading-[36px]">
            A destination where world-class infrastructure meets tomorrow&apos;s opportunities.
          </p>
        </div>
      </div>
    </section>
  );
}
