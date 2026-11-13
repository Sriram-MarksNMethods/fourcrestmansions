import Amenities from "@/components/Amenities";
import BottomBar from "@/components/BottomBar";
import Crests from "@/components/Crests";
import EnquiryForm from "@/components/EnquiryForm";
import Faq from "@/components/Faq";
import FloorPlans from "@/components/FloorPlans";
import Footer from "@/components/Footer";
import GlobusSouth from "@/components/GlobusSouth";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Lifestyle from "@/components/Lifestyle";
import Location from "@/components/Location";
import LuxuryGallery from "@/components/LuxuryGallery";
import Sophistication from "@/components/Sophistication";
import VideoReveal from "@/components/VideoReveal";
import StickyBrochure from "@/components/StickyBrochure";

// Section order follows sobharealty.com/sobha-communities/sobha-reserve, except Sophistication and the crests sit before the collage.
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        {/* Video that wipes in from the right (same effect as the Linq landing page) */}
        <VideoReveal />
        {/* Brochure p.20: Globus South take-off scene, pinned while the plane takes off */}
        <GlobusSouth />
        {/* Moved above the collage on request (Sobha has it after) */}
        <Sophistication />
        {/* Brochure p.15: amenities with self-drawing icons (after the clubhouse image, on request) */}
        <Amenities />
        {/* Not on Sobha: the four elevations from the brochure (trial, awaiting review) */}
        <Crests />
        <LuxuryGallery />
        <Lifestyle />
        {/* Gated (pre-blurred) floor plans; hover button scrolls to the enquiry form */}
        <FloorPlans />
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
