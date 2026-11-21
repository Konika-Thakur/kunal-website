"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Header from "../Header";
import Testimonial from "../Testimonial";
import { BgVideo, MaskText, ParallaxImg, Reveal } from "../motion";
import { Lightbox, PlayIcon, useFilmPlayer } from "../media";
import { M, propertyFilms, propertyProjects, whatsapp } from "@/data/site";

const ease = [0.16, 1, 0.3, 1] as const;

function Hero() {
  const v = M.video["property-loop"];
  return (
    <section className="relative bg-stone pt-[76px] font-arch text-slate">
      <div className="wrap grid min-h-[calc(100svh-76px)] items-center gap-12 py-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="eyebrow text-sage">
            Odyra Studio · Property &amp; Hospitality
          </motion.p>
          <h1 className="mt-6 text-[clamp(48px,6.6vw,104px)] font-light leading-[0.98] tracking-[-0.04em]">
            {["Spaces that", "sell the stay."].map((l, i) => (
              <span key={l} className="block overflow-hidden">
                <motion.span className={`block ${i === 1 ? "font-semibold" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.3 + i * 0.12, duration: 1.2, ease }}>
                  {l}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 1 }} className="mt-8 max-w-md text-[17px] leading-relaxed text-slate/75">
            HDR interior photography, drone aerials and walkthrough films for hotels, homestays, villas and real-estate developers —
            from the Scottish Highlands to the Himalayas.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="mt-10 flex flex-wrap gap-4">
            <a href="#projects" className="bg-slate px-7 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-stone transition hover:bg-sage">
              View projects
            </a>
            <a
              href={whatsapp("Hi Odyra Studio! I'd like a quote for a property shoot. Property: __ · Location: __")}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-slate px-7 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] transition hover:bg-slate hover:text-stone"
            >
              Get a quote
            </a>
          </motion.div>
        </div>
        <motion.div
          initial={{ clipPath: "inset(0 0 0 100%)" }}
          animate={{ clipPath: "inset(0 0 0 0%)" }}
          transition={{ delay: 0.2, duration: 1.6, ease }}
          className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-[5/4]"
        >
          <BgVideo src={v.src} poster={v.poster} />
          <div className="absolute bottom-0 left-0 flex gap-6 bg-stone/90 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] backdrop-blur">
            <span>4K</span><span>HDR</span><span>Aerial</span><span>Walkthrough</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const services = [
  { k: "01", t: "HDR interiors", d: "Bracketed exposures blended for true colour — bright rooms, clean window views, straight verticals." },
  { k: "02", t: "Drone & aerial", d: "Establishing shots, rooftop reveals and landscape context that a ground camera can't give." },
  { k: "03", t: "Walkthrough films", d: "Cinematic tours of rooms, amenities and experiences for websites, OTAs and ads." },
  { k: "04", t: "Social reels", d: "Vertical, hook-first edits built for Instagram — the format guests actually book from." },
];

function Services() {
  return (
    <section className="border-y border-slate/15 bg-stone font-arch text-slate">
      <div className="wrap grid sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s, i) => (
          <Reveal key={s.k} delay={i * 0.06} className="border-slate/15 py-12 sm:px-8 sm:[&:not(:first-child)]:border-l">
            <span className="text-[12px] font-semibold text-sage">{s.k}</span>
            <h3 className="mt-5 text-2xl font-semibold tracking-tight">{s.t}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-slate/70">{s.d}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  const [active, setActive] = useState(0);
  const [lb, setLb] = useState<number | null>(null);
  const p = propertyProjects[active];
  const [hero, ...rest] = p.images;

  return (
    <section id="projects" className="scroll-mt-20 bg-stone-2 py-28 font-arch text-slate sm:py-36">
      <div className="wrap">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-8">
          <MaskText lines={["Selected", "properties"]} className="text-[clamp(44px,6vw,92px)] font-light leading-[0.95] tracking-[-0.04em]" />
          <div role="tablist" aria-label="Properties" className="flex flex-wrap gap-2">
            {propertyProjects.map((pp, i) => (
              <button
                key={pp.key}
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={`relative px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.15em] transition ${i === active ? "text-stone" : "text-slate/70 hover:text-slate"}`}
              >
                {i === active && <motion.span layoutId="ptab" className="absolute inset-0 bg-slate" transition={{ type: "spring", stiffness: 380, damping: 34 }} />}
                <span className="relative">{pp.name}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={p.key}
            role="tabpanel"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease }}
          >
            <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
              <button onClick={() => setLb(0)} className="group relative aspect-[16/10] overflow-hidden" aria-label={`Open ${p.name} photo 1`}>
                <Image src={hero.src} alt={`${p.name} — featured`} fill sizes="(min-width:1024px) 60vw, 100vw" className="object-cover transition duration-[1.4s] group-hover:scale-105" />
              </button>
              <div className="flex flex-col justify-between gap-6 bg-stone p-8">
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-sage">{p.type}</p>
                  <h3 className="mt-4 text-4xl font-semibold tracking-tight">{p.name}</h3>
                  <p className="mt-5 leading-relaxed text-slate/75">{p.note}</p>
                </div>
                <div className="flex items-center justify-between border-t border-slate/15 pt-5 text-[12px] font-semibold uppercase tracking-[0.15em]">
                  <span>{p.images.length} frames</span>
                  <button onClick={() => setLb(0)} className="link-u">Open gallery →</button>
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
              {rest.slice(0, 8).map((im, i) => (
                <button key={im.src} onClick={() => setLb(i + 1)} className="group relative aspect-[4/3] overflow-hidden" aria-label={`Open ${p.name} photo ${i + 2}`}>
                  <Image src={im.src} alt={`${p.name} ${i + 2}`} fill sizes="(min-width:768px) 25vw, 50vw" className="object-cover transition duration-[1.2s] group-hover:scale-105" />
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <Lightbox images={p.images} index={lb} onClose={() => setLb(null)} onIndex={setLb} label={p.name} />
    </section>
  );
}

function Films() {
  const { play, player } = useFilmPlayer();
  return (
    <section className="bg-slate py-28 font-arch text-stone sm:py-36">
      <div className="wrap">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <MaskText lines={["Property", "films"]} className="text-[clamp(44px,6vw,92px)] font-light leading-[0.95] tracking-[-0.04em]" />
          <p className="max-w-sm text-stone/70">Venue films and hotel walkthroughs — the moving version of the listing.</p>
        </div>
        <div className="grid gap-x-5 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {propertyFilms.map((f, i) => (
            <Reveal key={f.id} delay={(i % 3) * 0.08}>
              <button onClick={() => play(f)} className="group block w-full text-left">
                <span className="relative block aspect-video overflow-hidden">
                  <Image src={f.cover.src} alt={f.title} fill sizes="(min-width:1024px) 33vw, 100vw" className="object-cover transition duration-[1.2s] group-hover:scale-105" />
                  <span className="absolute inset-0 bg-black/20 transition group-hover:bg-black/0" />
                  <PlayIcon className="absolute bottom-4 right-4 h-14 w-14 text-white" />
                </span>
                <span className="mt-5 flex items-baseline justify-between gap-4 border-b border-stone/20 pb-4">
                  <span className="text-xl font-semibold tracking-tight">{f.title}</span>
                  <span className="shrink-0 text-[11px] uppercase tracking-[0.15em] text-stone/60">{f.sub}</span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
      {player}
    </section>
  );
}

const uses = ["Booking.com & Airbnb listings", "Brand websites", "Instagram & reels", "Performance ads", "Brochures & print", "Investor decks"];

function Built() {
  return (
    <section className="bg-stone py-28 font-arch text-slate sm:py-36">
      <div className="wrap grid items-center gap-16 lg:grid-cols-2">
        <ParallaxImg img={M.property["golden-lagoon"][3]} alt="Rooftop terrace" className="aspect-[4/5] w-full" strength={50} sizes="(min-width:1024px) 50vw, 100vw" />
        <div>
          <Reveal>
            <p className="eyebrow text-sage">Built for bookings</p>
            <h2 className="mt-6 text-[clamp(38px,4.6vw,68px)] font-light leading-[1] tracking-[-0.03em]">
              One shoot. <span className="font-semibold">Every channel covered.</span>
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-slate/75">
              We plan the shot list around where the content will live — so the same day delivers listing photos, a hero film and
              a month of social posts.
            </p>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-3">
            {uses.map((u, i) => (
              <Reveal key={u} delay={i * 0.05}>
                <div className="border border-slate/20 bg-stone-2/60 px-5 py-4 text-[14px] font-medium">{u}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Property() {
  return (
    <>
      <Header theme="stone" overVideo={false} />
      <main>
        <Hero />
        <Services />
        <Projects />
        <Films />
        <Testimonial tone="stone" />
        <Built />
      </main>
    </>
  );
}
