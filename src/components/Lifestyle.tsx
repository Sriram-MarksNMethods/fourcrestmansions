"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BedIcon, LoungeIcon, PoolIcon } from "./Icons";

const blocks = [
  {
    id: "live",
    label: "Live",
    Icon: BedIcon,
    image: "/images/master-bedroom-hd.jpg",
    alt: "Master bedroom with upholstered headboard",
    title: "A Personal Retreat of Comfort & Calm",
    body: "Master bedrooms on every floor set a new standard of luxury living. Every mansion is a 5 BHK with a bathtub, and the living spaces begin on the first floor, away from the street.",
  },
  {
    id: "gather",
    label: "Gather",
    Icon: LoungeIcon,
    image: "/images/family-lounge-hd.jpg",
    alt: "Family lounge with chandelier and sectional sofas",
    title: "Spaces That Bring Everyone Together",
    body: "Thoughtfully designed to blend comfort, elegance and openness, the living room is a welcoming space for meaningful conversations, cherished moments and memorable gatherings.",
  },
  {
    id: "unwind",
    label: "Unwind",
    Icon: PoolIcon,
    image: "/images/pool-villa-hd.jpg",
    alt: "Private pool and swing deck beside a villa",
    title: "Beyond Amenities. A Lifestyle of Its Own.",
    body: "A clubhouse of around 13,000 to 18,000 sq. ft. with a swimming pool, gym, yoga deck, games lounge and multipurpose hall.",
  },
];

const activeBg =
  "bg-[linear-gradient(90deg,rgba(138,87,76,0.32)_0%,rgba(138,87,76,0.18)_41%,rgba(138,87,76,0)_100%)]";
const idleBg =
  "bg-[linear-gradient(90deg,#b39d96_0%,#f1e9e6_100%)] hover:bg-[linear-gradient(90deg,rgba(138,87,76,0.32)_0%,rgba(138,87,76,0.18)_41%,rgba(138,87,76,0)_100%)]";

export default function Lifestyle() {
  // Sobha: a pill turns "on" while its block spans the vertical centre of the screen ("top center" → "bottom center").
  const [active, setActive] = useState<string | null>(null);
  const refs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
          else setActive((cur) => (cur === e.target.id ? null : cur));
        });
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    Object.values(refs.current).forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="lifestyle" className="relative z-10 scroll-mt-16 bg-blush pb-[10px] pt-[33px] lg:pb-[50px] lg:pt-5">
      {/* Section heading, same style as the other section headings */}
      <div className="wrap">
        <h2 className="mb-[34px] text-center font-serif text-[42px] font-light italic leading-[50px] text-brand lg:mb-[50px] lg:text-[52px] lg:leading-[62px]">
          <span className="block font-sans text-[18px] font-light not-italic uppercase leading-[21px] tracking-[1.5px] text-ink lg:inline lg:text-[24px] lg:leading-[29px]">
            Life at Fourcrest.{" "}
          </span>
          Live, Gather, Unwind
        </h2>
      </div>
      <div className="wrap lg:grid lg:grid-cols-12 lg:gap-x-6">
        {/* Sticky pill nav: 278px wide, 30/50 padding, 28px radius */}
        <nav className="hidden lg:col-span-3 lg:block">
          <ul className="sticky top-[109px]">
            {blocks.map(({ id, label, Icon }) => {
              const on = active === id;
              return (
                <li key={id} className="mb-2.5">
                  <a href={`#${id}`} className={`group flex rounded-[28px] p-px transition-all duration-200 ${on ? activeBg : idleBg}`}>
                    <span
                      className={`flex w-full items-center rounded-[28px] px-[50px] py-[30px] text-[18px] font-normal leading-[26px] text-ink ${
                        on ? "bg-transparent" : "bg-blush group-hover:bg-transparent"
                      }`}
                    >
                      <Icon className={`mr-[35px] h-[41px] w-[38px] shrink-0 ${on ? "text-brand" : "text-ink/75"}`} />
                      {label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="lg:col-span-9">
          {blocks.map((b, i) => {
            const even = i % 2 === 1;
            return (
              <div
                key={b.id}
                id={b.id}
                ref={(el) => {
                  refs.current[b.id] = el;
                }}
                className="scroll-mt-24 lg:pt-[110px] lg:first:pt-5"
              >
                <div className="grid items-start gap-[35px] lg:grid-cols-12 lg:gap-x-6 lg:gap-y-0">
                  {/* 505×341 image */}
                  <div className={`relative aspect-[505/341] overflow-hidden rounded-[7px] lg:col-span-7 ${even ? "lg:order-2" : ""}`}>
                    <Image src={b.image} alt={b.alt} fill sizes="(min-width: 1000px) 36vw, 100vw" className="object-cover" />
                  </div>
                  <div className={`text-center lg:col-span-5 ${even ? "lg:text-right" : "lg:text-left"}`}>
                    <h5 className="text-[18px] font-normal uppercase leading-[26px] tracking-[1px] text-brand/75">{b.label}</h5>
                    <h4
                      className={`mb-6 border-b border-line pb-5 font-serif text-[30px] font-light italic leading-[36px] text-brand lg:border-0 lg:pb-0 lg:text-[34px] lg:leading-[41px] lg:after:relative lg:after:mb-0 lg:after:mt-[15px] lg:after:block lg:after:h-px lg:after:w-full lg:after:bg-line lg:after:content-[''] ${
                        even ? "lg:after:-right-6 lg:after:left-auto" : "lg:after:-left-[25px]"
                      }`}
                    >
                      {b.title}
                    </h4>
                    {/* Full paragraph on every screen size (no scroll box on phones) */}
                    <div className="mb-[25px]">
                      <p className="mb-[30px] text-[16px] lg:mb-5 font-light leading-[26px] text-ink">{b.body}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
