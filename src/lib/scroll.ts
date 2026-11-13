import type Lenis from "lenis";

// The site-wide Lenis instance (set by SmoothScroll), so other code can scroll through it.
let instance: Lenis | null = null;

export function setLenis(l: Lenis | null) {
  instance = l;
}

// Glide to an element (falls back to the browser's smooth scroll if Lenis is off)
export function scrollToElement(el: HTMLElement) {
  if (instance) instance.scrollTo(el);
  else el.scrollIntoView({ behavior: "smooth" });
}

// Jump to the very top with no animation
export function jumpToTop() {
  if (instance) instance.scrollTo(0, { immediate: true, force: true });
  window.scrollTo({ top: 0, behavior: "instant" });
}
