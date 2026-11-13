import type { ReactNode } from "react";

/*
  Sobha's ".button-1": outlined pill. On hover (≥1200px) the border fades out, two strokes
  trace around the pill (top-right corner first, then bottom-left) and an arrow slides in.
  Timings copied 1:1 from their CSS.
*/
// Shared shape + hover-trace timings; colours come from `tones` below.
const base =
  "group/btn relative inline-block overflow-hidden rounded-[25px] border text-center font-medium uppercase transition-all duration-500 ease-[ease] disabled:cursor-wait xl:hover:border-transparent " +
  "before:absolute before:right-0 before:top-0 before:h-0 before:w-0 before:rounded-[25px] before:border-l before:border-t before:opacity-0 before:content-[''] " +
  "before:[transition:width_.2s_.5s_ease-out,height_.15s_.35s_linear,opacity_0s_.7s] " +
  "hover:before:h-[96%] hover:before:w-full hover:before:opacity-100 hover:before:[transition:width_.2s_ease-in,height_.15s_.2s_linear,opacity_0s] " +
  "after:absolute after:bottom-0 after:left-0 after:h-0 after:w-0 after:rounded-[25px] after:border-b after:border-r after:opacity-0 after:content-[''] " +
  "after:[transition:width_.2s_.15s_linear,height_.15s_ease-in,opacity_0s_.35s] " +
  "hover:after:h-[96%] hover:after:w-full hover:after:opacity-100 hover:after:[transition:width_.2s_.35s_linear,height_.15s_.5s_ease-out,opacity_0s_.3s]";

const tones = {
  brand: "border-brand text-brand before:border-brand after:border-brand",
  light: "border-white text-white before:border-gold after:border-gold", // for use on photos
};

function Arrow() {
  return (
    <svg
      viewBox="0 0 18 13"
      aria-hidden
      className="relative top-[2px] ml-0 inline-block h-[13px] w-0 opacity-0 transition-all duration-500 ease-[ease] xl:group-hover/btn:ml-2.5 xl:group-hover/btn:w-[18px] xl:group-hover/btn:opacity-100"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <path d="M0 6.5h17M11.5 1l5.5 5.5-5.5 5.5" />
    </svg>
  );
}

type Props = {
  children: ReactNode;
  className?: string; // size: e.g. "h-[42px] min-w-[174px] pt-2 text-[10px] tracking-[1.25px]"
  type?: "submit" | "button";
  onClick?: () => void;
  disabled?: boolean;
  tone?: keyof typeof tones;
};

export default function TraceButton({ children, className = "", type = "button", onClick, disabled, tone = "brand" }: Props) {
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${tones[tone]} ${className}`}>
      {children}
      <Arrow />
    </button>
  );
}
