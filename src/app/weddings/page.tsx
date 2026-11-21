import type { Metadata } from "next";
import Weddings from "@/components/pages/Weddings";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Wedding Films & Photography",
  description: "Cinematic wedding films and editorial wedding photography by Odyra Studio — Delhi-NCR, destination and pan-India.",
  openGraph: { images: ["/media/wedding/w08.jpg"] },
};

export default function Page() {
  return (
    <>
      <Weddings />
      <Footer cta="Tell us about your wedding" msg="Hi Odyra Studio! We're getting married and would love to check your availability. Date: __ · Venue: __" />
    </>
  );
}
