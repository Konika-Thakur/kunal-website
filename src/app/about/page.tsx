import type { Metadata } from "next";
import About from "@/components/pages/About";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About Kunal Nagia — Founder",
  description: "Kunal Nagia — cinematographer and creative director, founder of Odyra Studio. 4+ years, 100+ projects, 50+ creator collaborations.",
  openGraph: { images: ["/media/kunal/kunal-portrait.jpg"] },
};

export default function Page() {
  return (
    <>
      <About />
      <Footer cta="Let's create something together" />
    </>
  );
}
