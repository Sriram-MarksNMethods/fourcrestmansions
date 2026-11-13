import Image from "next/image";

const blocks = [
  {
    id: "live",
    label: "Live",
    image: "/images/master-bedroom-hd.jpg",
    alt: "Master bedroom with upholstered headboard",
    title: "A personal retreat of comfort & calm",
    body: "Master bedrooms on every floor set a new standard of luxury living. Every mansion is a 5 BHK with a bathtub, and the living spaces begin on the first floor, away from the street.",
  },
  {
    id: "gather",
    label: "Gather",
    image: "/images/family-lounge-hd.jpg",
    alt: "Family lounge with chandelier and sectional sofas",
    title: "Spaces that bring everyone together",
    body: "Thoughtfully designed to blend comfort, elegance and openness, the living room is a welcoming space for meaningful conversations, cherished moments and memorable gatherings.",
  },
  {
    id: "unwind",
    label: "Unwind",
    image: "/images/pool-villa-hd.jpg",
    alt: "Private pool and swing deck beside a villa",
    title: "Beyond amenities. A lifestyle of its own.",
    body: "A clubhouse of around 13,000 to 18,000 sq. ft. with a swimming pool, gym, yoga deck, games lounge and multipurpose hall.",
  },
];

export default function Lifestyle() {
  return (
    <section
      id="lifestyle"
      className="relative z-10 scroll-mt-16 bg-stone pb-[40px] pt-[60px] lg:pb-[80px] lg:pt-[90px]"
    >
      {/* Section heading, same style as the other section headings */}
      <div className="wrap">
        <h2 className="mb-[34px] text-center font-serif text-[42px] font-light italic leading-[50px] text-brand lg:mb-[50px] lg:text-[52px] lg:leading-[62px] wide:text-[73px] wide:leading-[87px]">
          <span className="block font-sans text-[18px] font-light not-italic uppercase leading-[21px] tracking-[1.5px] text-ink lg:inline lg:text-[24px] lg:leading-[29px] wide:text-[34px] wide:leading-[41px] wide:tracking-[2.1px]">
            Life at Fourcrest.{" "}
          </span>
          Live, gather, unwind
        </h2>
      </div>
      {/* Blocks span the full column: photo (7/12) and text (5/12), alternating sides */}
      <div className="wrap">
        {blocks.map((b, i) => {
          const even = i % 2 === 1;
          return (
            <div
              key={b.id}
              id={b.id}
              className="scroll-mt-24 lg:pt-[110px] lg:first:pt-5"
            >
              <div className="grid items-start gap-[35px] lg:grid-cols-12 lg:items-center lg:gap-x-12 lg:gap-y-0">
                {/* 505×341 ratio photo */}
                <div
                  className={`relative aspect-[505/341] overflow-hidden rounded-[7px] lg:col-span-7 ${even ? "lg:order-2" : ""}`}
                >
                  <Image
                    src={b.image}
                    alt={b.alt}
                    fill
                    sizes="(min-width: 1000px) 52vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div
                  className={`text-center lg:col-span-5 ${even ? "lg:text-right" : "lg:text-left"}`}
                >
                  <h5 className="text-[18px] font-normal uppercase leading-[26px] tracking-[1px] text-brand/75 wide:text-[25px] wide:leading-[36px] wide:tracking-[1.4px]">
                    {b.label}
                  </h5>
                  <h4
                    className={`mb-6 border-b border-line pb-5 font-serif text-[30px] font-light italic leading-[36px] text-brand lg:border-0 lg:pb-0 lg:text-[34px] lg:leading-[41px] lg:after:relative lg:after:mb-0 lg:after:mt-[15px] lg:after:block lg:after:h-px lg:after:w-full lg:after:bg-line lg:after:content-[''] wide:text-[48px] wide:leading-[57px] ${
                      even
                        ? "lg:after:-right-6 lg:after:left-auto"
                        : "lg:after:-left-[25px]"
                    }`}
                  >
                    {b.title}
                  </h4>
                  {/* Full paragraph on every screen size (no scroll box on phones) */}
                  <div className="mb-[25px]">
                    <p className="mb-[30px] text-[16px] lg:mb-5 font-light leading-[26px] text-ink wide:text-[22px] wide:leading-[36px]">
                      {b.body}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
