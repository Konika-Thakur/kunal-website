import { Anton, Cormorant_Garamond, Inter, Manrope, Space_Grotesk } from "next/font/google";

export const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
export const display = Anton({ subsets: ["latin"], weight: "400", variable: "--font-display", display: "swap" });
export const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--font-serif", display: "swap" });
export const arch = Manrope({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-arch", display: "swap" });
export const tech = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-tech", display: "swap" });
