import type { Metadata } from "next";
import BottomBar from "@/components/BottomBar";
import Header from "@/components/Header";
import ThankYou from "@/components/ThankYou";

export const metadata: Metadata = {
  title: "Thank You | Fourcrest Mansions",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <>
      <Header />
      <ThankYou />
      <BottomBar />
    </>
  );
}
