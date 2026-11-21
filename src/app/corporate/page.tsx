import type { Metadata } from "next";
import Corporate from "@/components/pages/Corporate";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Corporate & Event Coverage",
  description: "Conference, award night, launch and leadership portrait coverage — photography and recap films by Odyra Studio.",
  openGraph: { images: ["/media/corporate/c08.jpg"] },
};

export default function Page() {
  return (
    <>
      <Corporate />
      <Footer cta="Planning an event? We'll be there." msg="Hi Odyra Studio! We'd like coverage for a corporate event. Date: __ · City: __ · Type: __" />
    </>
  );
}
