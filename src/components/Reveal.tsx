"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/*
  Same behaviour as Sobha's AOS setup: AOS.init({ duration: 2400 }), data-aos="fade-up".
  - starts 100px lower at opacity 0
  - animates in when its top passes 120px above the bottom of the screen
  - animates out again only when you scroll back up past that point (AOS once: false, mirror: false)
*/
export default function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShown(true);
        else if (entry.boundingClientRect.top > 0) setShown(false); // below the trigger line again
      },
      { rootMargin: "0px 0px -120px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] duration-[2400ms] ease-[ease] ${
        shown ? "translate-y-0 opacity-100" : "translate-y-[100px] opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}
