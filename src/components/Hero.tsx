import { getImageProps } from "next/image";
import CountUp from "./CountUp";
import FourcrestLogo from "./FourcrestLogo";
import { LandIcon, MansionIcon, PlotIcon } from "./Icons";

const stats = [
  { Icon: LandIcon, iconClass: "h-11 w-[41px]", value: 6.14, unit: "Acres", label: "Total Land Area" },
  { Icon: MansionIcon, iconClass: "h-10 w-[60px]", value: 28, unit: "", label: "Triplex Mansions" },
  { Icon: PlotIcon, iconClass: "h-11 w-[38px]", value: 500, unit: "Sq. Yds.", label: "Plot per Mansion" },
];

const heroCommon = { alt: "", fill: true, priority: true, sizes: "100vw" } as const;
const {
  props: { srcSet: desktopHero },
} = getImageProps({ ...heroCommon, src: "/images/hero-dusk-full.jpg" });
const { props: mobileHero } = getImageProps({ ...heroCommon, src: "/images/hero-dusk-mobile.jpg" });

// Banner (sticky on desktop) + frosted details card + intro row.
export default function Hero() {
  return (
    <>
      <section id="top" className="lg:sticky lg:top-0">
        {/* Phones: Sobha's 390×666 portrait crop, so the details card peeks into the first screen */}
        <div className="relative aspect-[390/666] w-full lg:aspect-auto lg:h-svh lg:min-h-[560px]">
          {/* Art direction: portrait dusk render on phones, landscape on desktop; the browser fetches only one */}
          <picture>
            <source media="(min-width: 1000px)" srcSet={desktopHero} />
            <img
              {...mobileHero}
              alt="Fourcrest Mansions at dusk, artistic impression"
              className="absolute inset-0 size-full object-cover object-[50%_62%] lg:object-[50%_60%]"
            />
          </picture>
        </div>
      </section>

      <section
        id="overview"
        className="relative z-10 -mt-20 min-h-[247px] scroll-mt-16 rounded-t-[30px] bg-[rgba(241,233,230,0.4)] py-[50px] backdrop-blur-[42px] lg:-mt-[57px] lg:py-10 before:absolute before:inset-0 before:rounded-t-[30px] before:bg-[linear-gradient(180deg,rgba(241,233,230,0)_0%,rgba(241,233,230,0.5)_16%,#f1e9e6_45%,#f1e9e6_100%)] before:content-['']"
      >
        <div className="wrap relative">
          <div className="grid lg:grid-cols-12 lg:gap-x-6 lg:gap-y-0">
            {/*
              Logo on a white square card, lifted so its top overlaps the hero photo
              (like the project logo card on sobharealty.com project pages)
            */}
            <div className="flex justify-center lg:col-span-3 lg:items-start lg:justify-start">
              <div className="-mt-[95px] grid aspect-square w-[160px] place-items-center rounded-[7px] bg-white shadow-[0_12px_40px_rgba(35,31,32,0.10)] lg:-mt-[80px] lg:w-[180px] wide:w-[240px]">
                <FourcrestLogo className="h-auto w-[120px] text-brand lg:w-[136px] wide:w-[180px]" />
              </div>
            </div>

            {/* Phones: Sobha turns the vertical divider into an 86px rule, 30px above and below */}
            <div className="mx-auto my-[30px] h-px w-[86px] bg-[#707070] opacity-40 lg:hidden" />

            <div className="hidden justify-center lg:col-span-1 lg:flex">
              <div className="h-full w-px bg-[rgba(112,112,112,0.44)]" />
            </div>

            <div className="lg:col-span-8">
              <h1 className="mb-5 text-center font-serif text-[26px] font-light italic text-brand lg:mb-8 lg:text-left wide:text-[36px]">
                <span className="font-sans text-[16px] font-light not-italic uppercase leading-[19px] tracking-[1.5px] text-ink wide:text-[22px] wide:leading-[27px] wide:tracking-[2.1px]">
                  Your Mansion, Your Signature:{" "}
                </span>
                Fourcrest Mansions - Luxury triplex villas in Hyderabad
              </h1>

              {/* Phones: the stat column is centred as a block, rows stay aligned */}
              <div className="mx-auto grid w-fit gap-[15px] sm:mx-0 sm:w-auto sm:grid-cols-3 sm:gap-6">
                {stats.map(({ Icon, iconClass, value, unit, label }) => (
                  <div key={label} className="flex items-center">
                    <span className="mr-5 flex w-[60px] shrink-0 text-brand">
                      <Icon className={iconClass} />
                    </span>
                    <span className="text-[14px] font-light leading-[17px] text-ink wide:text-[20px] wide:leading-[24px]">
                      <strong className="text-[27px] font-medium leading-[17px] wide:text-[38px] wide:leading-[24px]">
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

    </>
  );
}
