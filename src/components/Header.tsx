"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { nav, studio, whatsapp } from "@/data/site";
import { lockScroll } from "./SmoothScroll";

export type Theme = "dark" | "ivory" | "stone" | "navy";

const solid: Record<Theme, string> = {
  dark: "bg-ink/85 text-bone border-white/10",
  ivory: "bg-ivory/90 text-maroon-2 border-maroon/10",
  stone: "bg-stone/90 text-slate border-slate/10",
  navy: "bg-navy/85 text-white border-white/10",
};

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline gap-2 ${className}`}>
      <span className="font-display text-[26px] leading-none tracking-[0.08em]">ODYRA</span>
      <span className="text-[9px] font-medium uppercase tracking-mega opacity-70">Studio</span>
    </span>
  );
}

/** Fixed header. Transparent (light text) over the hero, then a solid themed bar once scrolled. */
const plain: Record<Theme, string> = {
  dark: "text-bone",
  ivory: "text-maroon-2",
  stone: "text-slate",
  navy: "text-white",
};

export default function Header({ theme = "dark", overVideo = true }: { theme?: Theme; overVideo?: boolean }) {
  const path = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 60));

  useEffect(() => { lockScroll(open); return () => lockScroll(false); }, [open]);
  useEffect(() => setOpen(false), [path]);

  return (
    <>
      <motion.header
        initial={{ y: -90 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition-colors duration-500 ${
          scrolled && !open ? solid[theme] : open ? "border-transparent bg-transparent text-bone" : `border-transparent bg-transparent ${overVideo ? "text-white" : plain[theme]}`
        }`}
      >
        <div className="wrap flex h-[76px] items-center justify-between">
          <Link href="/" aria-label="Odyra Studio — home">
            <Logo />
          </Link>
          <nav className="hidden items-center gap-9 lg:flex">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`link-u text-[12px] font-medium uppercase tracking-[0.22em] ${path === n.href ? "opacity-100" : "opacity-75 hover:opacity-100"}`}
              >
                {n.label}
              </Link>
            ))}
            <a
              href={whatsapp("Hi Odyra Studio! I'd like to discuss a shoot.")}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-current px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] transition hover:opacity-70"
            >
              Book a shoot
            </a>
          </nav>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="relative z-[60] grid h-11 w-11 place-items-center lg:hidden"
          >
            <span className="relative block h-3 w-7">
              <span className={`absolute left-0 h-[1.5px] w-7 bg-current transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-[1.5px] w-7 bg-current transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-ink px-6 pb-10 pt-28 text-bone lg:hidden"
          >
            <nav className="flex flex-col gap-2">
              {[{ href: "/", label: "Home" }, ...nav].map((n, i) => (
                <motion.div
                  key={n.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.06 }}
                >
                  <Link href={n.href} className="font-display text-[44px] uppercase leading-[1.1] tracking-wide">
                    {n.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="space-y-2 text-sm text-bone-dim">
              <a className="block" href={`mailto:${studio.email}`}>{studio.email}</a>
              <a className="block" href={`tel:+${studio.phoneRaw}`}>{studio.phone}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
