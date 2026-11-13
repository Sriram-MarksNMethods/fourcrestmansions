"use client";

import { useState, type ReactNode } from "react";
import Reveal from "./Reveal";
import { MinusIcon, PlusIcon } from "./Icons";

// Answers come from the project brief and the Fourcrest brochure.
const faqs: { q: string; a: ReactNode }[] = [
  {
    q: "What type of homes are offered at Fourcrest Mansions?",
    a: (
      <>
        <p>
          Fourcrest Mansions by Globus Developers is a gated community of just 28 ultra-luxury triplex mansions (G+2)
          on 6.14 acres in Globus South, Hyderabad. Every home is a 5 BHK on a plot of about 500 sq. yds., with around
          6,800 sq. ft. of built-up space, terrace access and parking for three cars.
        </p>
        <p>
          With roughly 4 to 5 homes per acre, it is genuinely low-density living. Internal roads are 33 ft wide and
          connect to a 40 ft main road, and every floor plan and all construction follow Vastu, with a dedicated water
          point in the northeast of each mansion.
        </p>
      </>
    ),
  },
  {
    q: "What amenities are available at Fourcrest Mansions?",
    a: (
      <>
        <p>A clubhouse of around 13,000 to 18,000 sq. ft. anchors the community&apos;s amenities:</p>
        <p>
          1. <strong className="font-normal">Swimming Pool:</strong> a resort-style pool for laps or a slow afternoon.
        </p>
        <p>
          2. <strong className="font-normal">Fully Equipped Gym:</strong> everything you need for a daily workout, close
          to home.
        </p>
        <p>
          3. <strong className="font-normal">Yoga & Meditation Deck:</strong> a quiet space to begin or end the day.
        </p>
        <p>
          4. <strong className="font-normal">Indoor Games Lounge & Multipurpose Hall:</strong> room for game nights,
          celebrations and community events.
        </p>
        <p>
          5. <strong className="font-normal">Kids&apos; Play Area:</strong> a dedicated, safe place for children to play.
        </p>
        <p>
          6. <strong className="font-normal">Landscaped Gardens and Jogging & Walking Track:</strong> green open spaces
          woven through the community.
        </p>
        <p>
          Inside every mansion, the ground floor is planned entirely for entertaining, with a barbecue and space for
          hosting, while the living spaces begin on the first floor.
        </p>
      </>
    ),
  },
  {
    q: "Can I choose the elevation of my mansion?",
    a: (
      <>
        <p>
          Yes. Fourcrest offers four distinctive elevations: Crest-01 Modern Elegance, Crest-02 Timeless Grandeur,
          Crest-03 The Classic and Crest-04 Distinctive Expression. Buyers can pick any of them.
        </p>
        <p>
          If you would like something entirely your own, you can work directly with the project architect to have a
          custom elevation designed.
        </p>
      </>
    ),
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <section id="faqs" className="relative z-10 scroll-mt-16 bg-stone pb-[60px] pt-[60px] lg:pb-[50px] lg:pt-[90px]">
        <div className="wrap grid lg:grid-cols-12 lg:gap-x-6 lg:gap-y-0">
          <Reveal className="lg:col-span-4">
            <h2 className="mb-[34px] text-center font-serif text-[42px] font-light italic leading-[50px] text-brand lg:text-left lg:text-[52px] lg:leading-[62px] wide:text-[73px] wide:leading-[87px]">
              FAQs
            </h2>
          </Reveal>

          <Reveal className="lg:col-span-8">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              const last = i === faqs.length - 1;
              return (
                <div key={f.q} className={last ? "" : "border-b border-line"}>
                  <div className={i === 0 ? "border-t border-line" : ""}>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-${i}`}
                      className="flex w-full items-start justify-between px-5 py-[30px] text-left lg:py-[26px]"
                    >
                      <span className="flex items-start">
                        <span className="mr-5 flex size-9 shrink-0 items-center justify-center rounded-[7px] bg-brand text-[18px] font-normal leading-[18px] text-white wide:text-[25px] wide:leading-[25px]">
                          Q{i + 1}
                        </span>
                        <span className="pt-0.5 font-serif text-[23px] font-light italic leading-[28px] text-ink lg:text-[25px] lg:leading-[30px] wide:text-[35px] wide:leading-[42px]">
                          {f.q}
                        </span>
                      </span>
                      <span className="mt-[5px] flex size-[22px] shrink-0 items-center text-brand">
                        {isOpen ? <MinusIcon className="size-[22px]" /> : <PlusIcon className="size-[22px]" />}
                      </span>
                    </button>
                  </div>

                  {/* Bootstrap collapse: height over 0.35s ease */}
                  <div
                    id={`faq-${i}`}
                    className={`grid transition-[grid-template-rows] duration-[350ms] ease-[ease] ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                  >
                    <div className="overflow-hidden">
                      <div className="mb-[26px] mt-[15px] space-y-[1rem] rounded-[7px] border border-line px-[30px] py-10 text-[18px] font-light leading-[28px] text-ink lg:text-[21px] lg:leading-[30px] wide:text-[29px] wide:leading-[42px]">
                        {f.a}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Reveal>
        </div>
      </section>

      {/* Divider row between FAQs and the form */}
      <section className="relative z-10 bg-stone pb-[50px]">
        <div className="wrap">
          <div className="h-px bg-divider" />
        </div>
      </section>
    </>
  );
}
