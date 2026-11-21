import Link from "next/link";
import { nav, studio, whatsapp } from "@/data/site";
import { Logo } from "./Header";
import { Reveal } from "./motion";

/** Shared contact footer — always dark, with a big call-to-action. */
export default function Footer({ cta = "Let's make something unforgettable", msg = "Hi Odyra Studio! I'd like to discuss a shoot." }: { cta?: string; msg?: string }) {
  return (
    <footer id="contact" className="relative overflow-hidden bg-ink text-bone">
      <div className="wrap pb-10 pt-28">
        <Reveal>
          <p className="eyebrow text-gold">Get in touch</p>
          <h2 className="mt-6 max-w-5xl font-display text-[clamp(48px,9vw,140px)] uppercase leading-[0.92]">{cta}</h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-12 flex flex-wrap gap-4">
          <a
            href={whatsapp(msg)}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-ink transition hover:bg-gold-2"
          >
            WhatsApp us <span className="transition group-hover:translate-x-1">→</span>
          </a>
          <a
            href={`mailto:${studio.email}`}
            className="inline-flex items-center gap-3 rounded-full border border-bone/30 px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.22em] transition hover:border-bone hover:bg-bone hover:text-ink"
          >
            Email the studio
          </a>
          <a
            href={studio.linktree}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full border border-bone/30 px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.22em] transition hover:border-bone hover:bg-bone hover:text-ink"
          >
            Book a 1:1 call
          </a>
        </Reveal>

        <div className="mt-24 grid gap-10 border-t border-white/10 pt-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-bone-dim">{studio.tagline}</p>
          </div>
          <div className="text-sm">
            <p className="eyebrow mb-4 text-bone-dim">Studio</p>
            <p>{studio.city}</p>
            <p className="text-bone-dim">{studio.reach}</p>
          </div>
          <div className="space-y-1.5 text-sm">
            <p className="eyebrow mb-4 text-bone-dim">Contact</p>
            <a className="link-u block w-fit" href={`mailto:${studio.email}`}>{studio.email}</a>
            <a className="link-u block w-fit" href={`tel:+${studio.phoneRaw}`}>{studio.phone}</a>
            <a className="link-u block w-fit" href={studio.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
            <a className="link-u block w-fit" href={studio.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
          <div className="space-y-1.5 text-sm">
            <p className="eyebrow mb-4 text-bone-dim">Work</p>
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="link-u block w-fit">{n.label}</Link>
            ))}
          </div>
        </div>
        <div className="mt-16 flex flex-wrap justify-between gap-4 text-[11px] uppercase tracking-[0.2em] text-bone-dim">
          <span>© {new Date().getFullYear()} Odyra Studio</span>
          <span>Founded by Kunal Nagia</span>
        </div>
      </div>
      <div aria-hidden className="pointer-events-none select-none overflow-hidden whitespace-nowrap pb-2 text-center font-display text-[24vw] leading-[0.8] text-white/[0.03]">
        ODYRA
      </div>
    </footer>
  );
}
