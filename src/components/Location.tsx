import Image from "next/image";
import { PinIcon } from "./Icons";
import { MAP_URL } from "@/lib/site";

// Drive times from the Fourcrest brochure ("Connectivity").
const places = [
  { name: "Rajiv Gandhi Int'l Airport", time: "10 minutes away (3 km)" },
  { name: "Airport View Point", time: "2 minutes away" },
  { name: "Pharma City & Aerospace SEZ", time: "25 minutes away" },
  { name: "Gachibowli IT Hub", time: "40 minutes away" },
  { name: "Hitech City", time: "45 minutes away" },
];

/*
  Desktop: heading sits over the top of a 1440×979 photo that fades into the page.
  Phones: label on its own line, heading above a 390×266 photo that also fades in at the top (as on Sobha).
*/
export default function Location() {
  return (
    <section id="location" className="relative z-10 scroll-mt-16 bg-blush pt-[69px] lg:pt-0">
      <div className="wrap relative z-10 lg:absolute lg:inset-x-0 lg:top-0 lg:pt-[55px]">
        <h2 className="mb-[34px] text-center font-serif text-[42px] font-light italic leading-[50px] text-brand lg:text-[52px] lg:leading-[62px]">
          <span className="block lg:inline font-sans text-[18px] font-light not-italic uppercase leading-[21px] tracking-[1.5px] text-ink lg:text-[24px] lg:leading-[29px]">
            An Address That{" "}
          </span>
          Connects You to More
        </h2>
      </div>

      <div className="relative aspect-[390/266] w-full lg:aspect-[1440/979]">
        <Image
          src="/images/aerial-south-hyderabad-hd.jpg"
          alt="Aerial view of Hyderabad South towards the airport corridor"
          fill
          sizes="100vw"
          className="object-cover"
        />
        {/* Sobha's photo fades into the page at the top and darkens bottom-left behind the labels */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#f1e9e6_0%,rgba(241,233,230,0.85)_10%,rgba(241,233,230,0)_30%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(81,47,40,0.6)_0%,rgba(81,47,40,0)_60%)] lg:bg-[linear-gradient(90deg,rgba(81,47,40,0.55)_0%,rgba(81,47,40,0)_45%)]" />

        <div className="absolute inset-x-0 bottom-3 lg:bottom-auto lg:top-[34.3%]">
          <ul className="wrap space-y-1.5 lg:space-y-[31px]">
            {places.map((p) => (
              <li key={p.name} className="flex items-start gap-1.5 text-white lg:-ml-2">
                <PinIcon className="size-3 shrink-0 lg:size-4" />
                <div>
                  <p className="text-[9px] font-semibold uppercase leading-3 tracking-[0.6px] lg:text-[13px] lg:leading-4 lg:tracking-[1px]">{p.name}</p>
                  <p className="text-[8px] font-normal uppercase leading-[11px] tracking-[0.4px] text-white/80 lg:mt-0.5 lg:text-[10px] lg:leading-[14px] lg:tracking-[0.5px]">
                    {p.time}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* "View on map": white pill that opens out on hover (0.5s), as on Sobha */}
        <a
          href={MAP_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="View location on Google Maps"
          className="group absolute bottom-5 right-5 z-10 flex items-center rounded-[50px] bg-white px-[7px] py-[5px] transition-all duration-500 ease-[ease] lg:bottom-[100px] lg:right-[50px]"
        >
          <span
            aria-hidden
            className="invisible max-w-0 overflow-hidden whitespace-nowrap text-[14px] font-semibold text-black transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] lg:group-hover:visible lg:group-hover:max-w-48 lg:group-hover:px-5"
          >
            VIEW ON MAP
          </span>
          <PinIcon className="h-6 w-5 text-black" />
        </a>
      </div>
    </section>
  );
}
