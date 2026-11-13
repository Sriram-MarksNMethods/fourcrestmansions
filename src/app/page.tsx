import BottomBar from "@/components/BottomBar";
import EnquiryForm from "@/components/EnquiryForm";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Lifestyle from "@/components/Lifestyle";
import Location from "@/components/Location";
import LuxuryGallery from "@/components/LuxuryGallery";
import Sophistication from "@/components/Sophistication";

// Section order follows sobharealty.com/sobha-communities/sobha-reserve 1:1.
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <LuxuryGallery />
        <Sophistication />
        <Lifestyle />
        <Location />
        <Faq />
        <EnquiryForm />
      </main>
      <Footer />
      <BottomBar />
    </>
  );
}
