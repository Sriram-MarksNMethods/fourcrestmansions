import { getImageProps } from "next/image";
import Reveal from "./Reveal";

const clubCommon = { alt: "", fill: true, sizes: "100vw" } as const;
const {
  props: { srcSet: desktopClub },
} = getImageProps({ ...clubCommon, src: "/images/clubhouse-hd.jpg" });
const { props: mobileClub } = getImageProps({ ...clubCommon, src: "/images/clubhouse-mobile-v2.jpg" });

export default function Sophistication() {
  return (
    <section className="relative z-10 bg-blush pb-[40px] lg:pb-[80px]">
      <div className="wrap">
        <h2 className="mb-[34px] text-center font-serif text-[42px] font-light italic leading-[46px] text-brand lg:mb-[50px] lg:text-[52px] lg:leading-[54px] wide:text-[73px] wide:leading-[76px]">
          <span className="block font-sans text-[18px] font-light not-italic uppercase leading-[21px] tracking-[1.5px] text-ink lg:text-[24px] lg:leading-[29px] wide:text-[34px] wide:leading-[41px] wide:tracking-[2.1px]">
            Four Expressions.{" "}
          </span>
          One signature legacy
        </h2>
      </div>
      <Reveal>
        <div className="relative aspect-[1223/1286] w-full lg:aspect-[1440/783]">
          {/* Portrait version on phones, wide render on desktop; the browser fetches only one */}
          <picture>
            <source media="(min-width: 1000px)" srcSet={desktopClub} />
            <img {...mobileClub} alt="Fourcrest clubhouse, artistic impression" className="absolute inset-0 size-full object-cover" />
          </picture>
        </div>
      </Reveal>
    </section>
  );
}
