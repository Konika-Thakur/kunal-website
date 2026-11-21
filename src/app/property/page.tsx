import type { Metadata } from "next";
import Property from "@/components/pages/Property";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Property, Hotel & Real Estate Shoots",
  description: "HDR interior photography, drone aerials and walkthrough films for hotels, homestays, villas and real estate — by Odyra Studio.",
  openGraph: { images: ["/media/property/sleepy-blue-06.jpg"] },
};

export default function Page() {
  return (
    <>
      <Property />
      <Footer cta="Let's shoot your property" msg="Hi Odyra Studio! I'd like a quote for a property shoot. Property: __ · Location: __" />
    </>
  );
}
