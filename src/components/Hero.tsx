import Image from "next/image";
import CountUp from "./CountUp";
import FourcrestLogo from "./FourcrestLogo";
import Reveal from "./Reveal";
import { LandIcon, MansionIcon, PlotIcon } from "./Icons";

const stats = [
  { Icon: LandIcon, iconClass: "h-11 w-[41px]", value: 6.14, unit: "Acres", label: "Total Land Area" },
  { Icon: MansionIcon, iconClass: "h-10 w-[60px]", value: 28, unit: "", label: "Triplex Mansions" },
  { Icon: PlotIcon, iconClass: "h-11 w-[38px]", value: 500, unit: "Sq. Yds.", label: "Plot per Mansion" },
];

// Banner (sticky on desktop) + frosted details card + intro row.
export default function Hero() {
  return (
    <>
      <section id="top" className="lg:sticky lg:top-0">
        <div className="relative h-svh min-h-[560px] w-full">
          <Image
            src="/images/hero-dusk-full.jpg"
            alt="Fourcrest Mansions at dusk, artistic impression"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[62%_50%] lg:object-[50%_60%]"
          />
        </div>
      </section>

      <section
        id="overview"
        className="relative z-10 -mt-20 min-h-[247px] scroll-mt-16 overflow-hidden rounded-t-[30px] bg-[rgba(241,233,230,0.4)] py-[50px] backdrop-blur-[42px] lg:-mt-[57px] lg:py-10 before:absolute before:inset-x-0 before:bottom-0 before:h-[301px] before:bg-[linear-gradient(180deg,rgba(241,233,230,0)_0%,rgba(241,233,230,0.5)_16%,#f1e9e6_45%,#f1e9e6_100%)] before:content-['']"
      >
        <div className="wrap relative">
          <div className="grid gap-[60px] lg:grid-cols-12 lg:gap-x-6 lg:gap-y-0">
            <div className="flex items-center justify-center lg:col-span-3 lg:justify-start">
              <FourcrestLogo className="h-auto w-[239px] text-brand" />
            </div>

            <div className="hidden justify-center lg:col-span-1 lg:flex">
              <div className="h-full w-px bg-[rgba(112,112,112,0.44)]" />
            </div>

            <div className="lg:col-span-8">
              <h1 className="mb-5 text-center font-serif text-[26px] font-light italic text-brand lg:mb-8 lg:text-left">
                <span className="font-sans text-[16px] font-light not-italic uppercase leading-[19px] tracking-[1.5px] text-ink">
                  Your Mansion, Your Signature:{" "}
                </span>
                Fourcrest Mansions - Luxury Triplex Villas in Hyderabad
              </h1>

              <div className="grid gap-[15px] px-5 sm:grid-cols-3 sm:gap-6 sm:px-0">
                {stats.map(({ Icon, iconClass, value, unit, label }) => (
                  <div key={label} className="flex items-center">
                    <span className="mr-5 flex w-[60px] shrink-0 text-brand">
                      <Icon className={iconClass} />
                    </span>
                    <span className="text-[14px] font-light leading-[17px] text-ink">
                      <strong className="text-[27px] font-medium leading-[17px]">
                        <CountUp value={value} />
                      </strong>{" "}
                      {unit}
                      <br />
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 bg-blush pb-[50px]">
        <div className="wrap grid items-center lg:grid-cols-12 lg:gap-x-6 lg:gap-y-0">
          <p className="mb-[30px] text-center text-[18px] font-light leading-[30px] text-ink lg:col-span-5 lg:mb-[35px] lg:text-left lg:text-[21px]">
            Some homes are built to accommodate life. Others are envisioned to elevate it. At Fourcrest Mansions, just
            28 triplex mansions sit on 6.14 acres, each on a 500 sq. yd. plot, where every space offers comfort, privacy
            and a sense of belonging. The size of each mansion is about 6,800 sq. ft.
          </p>
          <Reveal className="lg:col-span-7">
            {/* Photo with a smoky brush-stroke edge baked into the PNG (Sobha uses separate desktop / phone crops) */}
            <Image
              src="/images/window-morning-brush-v2.png"
              alt="Morning light through the bedroom window"
              width={1362}
              height={930}
              sizes="681px"
              className="hidden h-auto w-full lg:block"
            />
            <Image
              src="/images/window-morning-brush-mobile-v2.png"
              alt="Morning light through the bedroom window"
              width={700}
              height={828}
              sizes="100vw"
              className="h-auto w-full lg:hidden"
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
