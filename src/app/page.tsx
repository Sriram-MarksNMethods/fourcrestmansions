import BottomBar from "@/components/BottomBar";
import Crests from "@/components/Crests";
import EnquiryForm from "@/components/EnquiryForm";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Lifestyle from "@/components/Lifestyle";
import Location from "@/components/Location";
import LuxuryGallery from "@/components/LuxuryGallery";
import Sophistication from "@/components/Sophistication";
import StickyBrochure from "@/components/StickyBrochure";

// Section order follows sobharealty.com/sobha-communities/sobha-reserve, except Sophistication and the crests sit before the collage.
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        {/* Moved above the collage on request (Sobha has it after) */}
        <Sophistication />
        {/* Not on Sobha: the four elevations from the brochure (trial, awaiting review) */}
        <Crests />
        <LuxuryGallery />
        <Lifestyle />
        <Location />
        <Faq />
        <EnquiryForm />
      </main>
      <Footer />
      <BottomBar />
      <StickyBrochure />
    </>
  );
}
