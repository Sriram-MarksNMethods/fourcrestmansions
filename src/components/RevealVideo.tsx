"use client";

import { useEffect, useRef, useState } from "react";

/*
  Looping, muted video that wipes into view from right to left when it scrolls onto the
  screen. Copied from the Linq landing page (RevealVideo.tsx there uses the motion library;
  this version does the same thing with a plain CSS transition, so no extra package).

  - clip-path "inset(0 0 0 100%)" hides the whole video.
  - Once about 120px of it is on screen, the clip animates to 0% over 1.5s (easeOutCubic),
    so the video appears from its right edge to its left.
  - Plays once per visit: after the wipe it stays revealed, also after a reload in the same tab
    (remembered in sessionStorage, which is per tab). A new tab plays it again.
  - With "reduce motion" turned on, it shows without the wipe (motion-reduce:).
*/
const SEEN_KEY = "fourcrest-video-revealed";

export default function RevealVideo({
  src,
  poster,
  label,
  className = "",
}: {
  src: string;
  poster?: string;
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const [instant, setInstant] = useState(false); // already played this visit: show without the wipe

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {}
    if (seen) {
      setInstant(true);
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          try {
            sessionStorage.setItem(SEEN_KEY, "1");
          } catch {}
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -120px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`overflow-hidden ${instant ? "transition-none" : "transition-[clip-path] duration-[1500ms] ease-[cubic-bezier(0.33,1,0.68,1)]"} motion-reduce:[clip-path:none] motion-reduce:transition-none ${
        shown ? "[clip-path:inset(0_0_0_0%)]" : "[clip-path:inset(0_0_0_100%)]"
      } ${className}`}
    >
      <video
        src={src || undefined}
        poster={poster}
        aria-label={label}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="size-full object-cover"
      />
    </div>
  );
}
