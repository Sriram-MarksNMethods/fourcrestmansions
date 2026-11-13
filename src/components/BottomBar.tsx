import Link from "next/link";
import { ContactIcon, DownloadIcon, WhatsAppIcon } from "./Icons";
import BrochureButton from "./BrochureButton";
import { WHATSAPP_URL } from "@/lib/site";

// Fixed action bar along the bottom (Sobha's Walkthrough / WhatsApp / Contact Us bar).
export default function BottomBar() {
  const item =
    "flex flex-1 items-center justify-center text-ink transition-colors duration-500 hover:text-brand";
  const inner = "flex flex-col items-center px-[22px] text-[12px] font-semibold uppercase leading-[15px] tracking-[-0.48px] wide:text-[17px] wide:leading-[21px] wide:tracking-[-0.7px]";
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 flex h-[60px] items-stretch bg-white shadow-[0_-3px_10px_rgba(0,0,0,0.08)]">
      <BrochureButton className={item}>
        <span className={inner}>
          <DownloadIcon className="mb-0.5 h-5 w-[17px]" />
          Brochure
        </span>
      </BrochureButton>
      <span className="my-[15px] w-px bg-[#d9d9d9]" />
      <a href={WHATSAPP_URL} className={item}>
        <span className={inner}>
          <WhatsAppIcon className="mb-0.5 h-5 w-[17px]" />
          WhatsApp
        </span>
      </a>
      <span className="my-[15px] w-px bg-[#d9d9d9]" />
      <Link href="/#enquire" className={item}>
        <span className={inner}>
          <ContactIcon className="mb-0.5 h-5 w-[17px]" />
          Contact Us
        </span>
      </Link>
    </nav>
  );
}
