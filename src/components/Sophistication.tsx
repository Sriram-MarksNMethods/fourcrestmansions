import Image from "next/image";
import Reveal from "./Reveal";

export default function Sophistication() {
  return (
    <section className="relative z-10 bg-blush">
      <div className="wrap">
        <h2 className="mb-[34px] text-center font-serif text-[42px] font-light italic leading-[50px] text-brand lg:mb-[50px] lg:text-[52px] lg:leading-[62px]">
          <span className="font-sans text-[18px] font-light not-italic uppercase leading-[21px] tracking-[1.5px] text-ink lg:text-[24px] lg:leading-[29px]">
            Four Expressions.{" "}
          </span>
          One Signature Legacy
        </h2>
      </div>
      <Reveal>
        <div className="relative aspect-[390/771] w-full lg:aspect-[1440/783]">
          <Image
            src="/images/clubhouse-hd.jpg"
            alt="Fourcrest clubhouse, artistic impression"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </Reveal>
    </section>
  );
}
