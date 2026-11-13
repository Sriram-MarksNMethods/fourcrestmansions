import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

// Body copy: Poppins (as in the brochure).
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Fourcrest Mansions | 5 BHK Triplex Mansions in Globus South, Hyderabad",
  description:
    "Fourcrest Mansions by Globus Developers: just 28 Vastu-compliant 5 BHK triplex mansions on 6.14 acres, minutes from Rajiv Gandhi International Airport, Hyderabad.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${poppins.variable} antialiased`}>
      <head>
        {/* Adobe Fonts kit: "collier" (headings). Add every live/staging domain to the kit in Adobe Fonts. */}
        <link rel="preconnect" href="https://use.typekit.net" crossOrigin="" />
        <link rel="stylesheet" href="https://use.typekit.net/uvl1whu.css" />
      </head>
      <body className="font-sans font-light">{children}</body>
    </html>
  );
}
