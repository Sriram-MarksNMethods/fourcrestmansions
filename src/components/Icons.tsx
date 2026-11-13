// Thin line icons used across the page (stroke = currentColor).
type IconProps = { className?: string };

const line = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/* ---- Hero stats ---- */
export function LandIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 44 44" className={className} {...line} strokeWidth={1.2}>
      <path d="M4 32 15 12l9 9 6-6 10 17Z" />
      <path d="M4 32h36M10 38h24" />
    </svg>
  );
}

export function MansionIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 74 44" className={className} {...line} strokeWidth={1.2}>
      <path d="M6 40h62M12 40V16h22v24M34 40V8h28v32" />
      <path d="M18 24h10M18 31h10M40 16h6M50 16h6M40 24h6M50 24h6M45 40v-8h6v8" />
    </svg>
  );
}

export function PlotIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 44 44" className={className} {...line} strokeWidth={1.2}>
      <path d="M6 10h32v28H6Z" strokeDasharray="3 3" />
      <path d="M14 30V20l8-6 8 6v10Z" />
      <path d="M20 30v-5h4v5" />
    </svg>
  );
}

/* ---- Lifestyle nav ---- */
export function BedIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 44 36" className={className} {...line}>
      <path d="M4 30V6M4 22h36v8M4 22v-6h12a4 4 0 0 1 4 4v2M20 16h14a6 6 0 0 1 6 6" />
      <circle cx="10" cy="13" r="3" />
    </svg>
  );
}

export function LoungeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 46 34" className={className} {...line}>
      <path d="M8 18v-6a4 4 0 0 1 4-4h22a4 4 0 0 1 4 4v6" />
      <path d="M4 18a3 3 0 0 1 6 0v4h26v-4a3 3 0 0 1 6 0v8H4Z" />
      <path d="M8 26v4M38 26v4" />
    </svg>
  );
}

export function PoolIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 44 36" className={className} {...line}>
      <path d="M14 22V6a3 3 0 0 1 6 0M26 22V6a3 3 0 0 1 6 0M14 11h12M14 17h12" />
      <path d="M4 26c3 0 3 2 6 2s3-2 6-2 3 2 6 2 3-2 6-2 3 2 6 2 3-2 6-2" />
      <path d="M4 32c3 0 3 2 6 2s3-2 6-2 3 2 6 2 3-2 6-2 3 2 6 2 3-2 6-2" />
    </svg>
  );
}

/* ---- Small UI ---- */
export function PinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...line}>
      <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}

export function PlusIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 22 22" className={className} {...line} strokeWidth={1.2}>
      <path d="M11 2v18M2 11h18" />
    </svg>
  );
}

export function MinusIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 22 22" className={className} {...line} strokeWidth={1.2}>
      <path d="M2 11h18" />
    </svg>
  );
}

export function DownloadIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...line}>
      {/* Arrow dropping into a tray */}
      <path d="M12 4v11M7.5 10.5 12 15l4.5-4.5" />
      <path d="M5 15v4h14v-4" />
    </svg>
  );
}

export function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...line}>
      <path d="M4 20l1.2-3.6A8 8 0 1 1 8 19Z" />
      <path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.5-2-1-1 1a4.5 4.5 0 0 1-2.5-2.5l1-1-1-2Z" />
    </svg>
  );
}

export function ContactIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...line}>
      <rect x="6" y="3" width="12" height="18" rx="2" />
      <path d="M9 11h6M9 14h6M9 17h3" />
      <circle cx="12" cy="7" r="1" />
    </svg>
  );
}

export function ChevronDownIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...line}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
