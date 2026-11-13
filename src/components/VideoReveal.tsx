import RevealVideo from "./RevealVideo";
import ScrollLitText from "./ScrollLitText";

// Launch film (launch-video-FCM.mp4), re-encoded for the web: 1080p, no sound track, 6 MB instead of 59 MB
const VIDEO_SRC = "/videos/fourcrest-launch.mp4";

// Intro section: heading + intro copy, then the launch film that wipes in from the right
export default function VideoReveal() {
  return (
    <section className="relative z-10 bg-stone pb-[60px] pt-[60px] lg:pb-[90px] lg:pt-[90px]">
      <div className="wrap">
        {/*
          Laid out like the second section of findrealestate.com: heading on the left (two lines),
          the intro copy on the right lighting up word by word as you scroll, then the video below.
        */}
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-x-6">
          <h2 className="font-serif text-[42px] font-light italic leading-[46px] text-brand lg:col-span-5 lg:text-[52px] lg:leading-[54px] wide:text-[73px] wide:leading-[76px]">
            <span className="mb-1 block font-sans text-[18px] font-light not-italic uppercase leading-[21px] tracking-[1.5px] text-ink lg:mb-2 lg:text-[24px] lg:leading-[29px] wide:text-[34px] wide:leading-[41px] wide:tracking-[2.1px]">
              The Fourcrest Story.
            </span>
            Crafted for the few
          </h2>
          <ScrollLitText
            text="Some homes accommodate life. Others elevate it. At Fourcrest Mansions, just 28 triplex mansions of about 6,800 sq. ft. each sit on 500 sq. yd. plots across 6.14 acres, built for comfort and privacy."
            className="text-[20px] font-light leading-[30px] text-ink lg:col-span-7 lg:text-[28px] lg:leading-[40px] wide:text-[38px] wide:leading-[54px]"
          />
        </div>
        <RevealVideo
          src={VIDEO_SRC}
          // A frame from the film (house render at 0:19), shown until the video loads
          poster="/images/fourcrest-launch-poster.jpg"
          label="Fourcrest Mansions project film"
          // 16:9 on every screen: the film has text and a map that a portrait crop would cut off.
          // Full width of the content column, under the text (as on findrealestate.com)
          className="mt-12 aspect-video w-full lg:mt-20"
        />
      </div>
    </section>
  );
}
