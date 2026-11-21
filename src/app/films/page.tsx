import type { Metadata } from "next";
import Films from "@/components/pages/Films";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Brand Films, Reels & Music Videos",
  description: "Campaign films, social-first reels and music videos for fashion, hospitality and lifestyle brands — by Odyra Studio.",
  openGraph: { images: ["/media/films/1QHIfP2PRe.jpg"] },
};

export default function Page() {
  return (
    <>
      <Films />
      <Footer cta="Got a brief? Let's roll." msg="Hi Odyra Studio! We're a brand looking for a film/reels. Brief: __" />
    </>
  );
}
