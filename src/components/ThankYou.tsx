"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Curtain from "./Curtain";
import TraceButton from "./TraceButton";
import { downloadBrochure, isBrochureUnlocked } from "@/lib/brochure";

/*
  Thank-you page.
  Entrance: the brown curtain from the form lifts away (0.7s), the photo settles from a slight zoom,
  then the text and buttons fade up one after another.
  The brochure is only available here: it downloads automatically (when requested) once the curtain
  has lifted, and the Download Brochure button is shown. Visitors who haven't submitted the form are
  sent back to it.
*/
export default function ThankYou() {
  const router = useRouter();
  const [entered, setEntered] = useState(false);
  const [brochure, setBrochure] = useState(false);

  useEffect(() => {
    if (!isBrochureUnlocked()) {
      router.replace("/#enquire");
      return;
    }
    const wantsBrochure = new URLSearchParams(window.location.search).get("brochure") === "1";
    const enter = setTimeout(() => {
      setBrochure(wantsBrochure);
      setEntered(true);
    }, 150);
    // Start the download once the page has arrived (curtain lifted).
    const download = wantsBrochure ? setTimeout(downloadBrochure, 900) : undefined;
    return () => {
      clearTimeout(enter);
      clearTimeout(download);
    };
  }, [router]);

  // Staggered fade-up for each line of content
  const rise = (delay: string) =>
    `transition-[opacity,transform] duration-1000 ease-out ${delay} ${entered ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`;

  return (
    <main className="relative flex h-svh min-h-[600px] items-center justify-center overflow-hidden">
      <Curtain show={!entered} lifted={entered} />

      <Image
        src="/images/hero-dusk-full.jpg"
        alt="Fourcrest Mansions at dusk, artistic impression"
        fill
        priority
        sizes="100vw"
        className={`object-cover transition-transform duration-[2400ms] ease-out ${entered ? "scale-100" : "scale-110"}`}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(35,31,32,0.55)_0%,rgba(35,31,32,0.75)_100%)]" />

      <div className="wrap relative pb-[60px] text-center text-white">
        <p className={`text-[16px] font-light uppercase tracking-[3.6px] lg:text-[20px] ${rise("delay-[500ms]")}`}>Enquiry Received</p>
        <h1 className={`mt-2 font-serif text-[64px] font-light italic leading-[72px] text-gold lg:text-[96px] lg:leading-[104px] ${rise("delay-[650ms]")}`}>
          Thank You
        </h1>
        <p className={`mx-auto mt-6 max-w-[560px] text-[16px] font-light leading-[26px] text-white/90 lg:text-[18px] lg:leading-[30px] ${rise("delay-[800ms]")}`}>
          Our team will get in touch with you shortly about Fourcrest Mansions.
          {brochure && " Your brochure download has started. If it didn't, use the button below."}
        </p>
        <div className={`mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row ${rise("delay-[950ms]")}`}>
          <TraceButton tone="light" onClick={downloadBrochure} className="h-[49px] min-w-[220px] text-[14px] tracking-[2.5px]">
            Download Brochure
          </TraceButton>
          <TraceButton tone="light" onClick={() => router.push("/")} className="h-[49px] min-w-[220px] text-[14px] tracking-[2.5px]">
            Back to Home
          </TraceButton>
        </div>
      </div>
    </main>
  );
}
