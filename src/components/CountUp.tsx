"use client";

import { useEffect, useRef, useState } from "react";

const swing = (p: number) => 0.5 - Math.cos(p * Math.PI) / 2; // jQuery "swing" easing

/*
  Sobha's counter: stays empty until the first scroll event after the stats are on screen,
  then counts 0 → value over 2000ms with jQuery "swing", showing whole numbers while counting
  and the exact value (e.g. 6.14) at the end.
*/
export default function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLElement>(null);
  const [text, setText] = useState("");

  useEffect(() => {
    let frame = 0;
    let started = false;

    const onScroll = () => {
      const el = ref.current;
      if (started || !el) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      if (window.scrollY <= top - window.innerHeight) return;
      started = true;
      window.removeEventListener("scroll", onScroll);
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / 2000, 1);
        if (p < 1) {
          setText(Math.floor(value * swing(p)).toLocaleString());
          frame = requestAnimationFrame(tick);
        } else {
          setText(value.toLocaleString());
        }
      };
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <i ref={ref} className="not-italic">
      {text}
    </i>
  );
}
