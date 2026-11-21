"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Header from "../Header";
import { MaskText, ParallaxImg, Reveal } from "../motion";
import { Masonry } from "../media";
import { M, whatsapp } from "@/data/site";

const C = M.corporate;
const ease = [0.16, 1, 0.3, 1] as const;

function Hero() {
  const tiles = [
    { im: C[7], cls: "col-span-2 row-span-2" },
    { im: C[2], cls: "" },
    { im: C[8], cls: "" },
    { im: C[4], cls: "col-span-2" },
  ];
  return (
    <section className="relative overflow-hidden bg-navy pt-[76px] font-tech text-white">
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(rgba(91,140,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(91,140,255,0.08)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_top,#000_30%,transparent_75%)]" />
      <div className="wrap relative grid min-h-[calc(100svh-76px)] items-center gap-12 py-14 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-electric/40 bg-electric/10 px-4 py-1.5 text-[12px] font-medium text-electric"
          >
            <i className="h-1.5 w-1.5 rounded-full bg-electric" /> Corporate &amp; Events
          </motion.span>
          <h1 className="mt-7 text-[clamp(46px,6.4vw,100px)] font-bold leading-[0.95] tracking-[-0.04em]">
            {["Your event,", "documented", "like a film."].map((l, i) => (
              <span key={l} className="block overflow-hidden">
                <motion.span className={`block ${i === 2 ? "text-electric" : ""}`} initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.3 + i * 0.1, duration: 1.2, ease }}>
                  {l}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-7 max-w-md text-[17px] leading-relaxed text-white/70">
            Conferences, award nights, launches and leadership portraits — fast, discreet coverage with the polish of a brand film.
          </motion.p>
        </div>
        <div className="grid aspect-square grid-cols-3 grid-rows-3 gap-3">
          {tiles.map((t, i) => (
            <motion.div
              key={t.im.src}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.12, duration: 1, ease }}
              className={`relative overflow-hidden rounded-xl ${t.cls}`}
            >
              <Image src={t.im.src} alt="Corporate event" fill sizes="40vw" priority={i === 0} className="object-cover" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const coverage = [
  ["Conferences & summits", "Keynotes, panels and audience reactions, plus same-day selects for social."],
  ["Award nights", "Stage moments, winners and candid celebrations — lit and timed for the reveal."],
  ["Launches & activations", "Product reveals, brand installations and experiential setups."],
  ["Leadership portraits", "On-location headshots and portraits for websites, press and LinkedIn."],
  ["Recap films", "60–90 second highlight films that sell next year's edition."],
  ["Offsites & culture", "Team days and offsites that show what it's like to work with you."],
];

function Coverage() {
  return (
    <section className="bg-navy-2 py-28 font-tech text-white sm:py-36">
      <div className="wrap grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-electric">What we cover</p>
          <h2 className="mt-5 text-[clamp(36px,4.4vw,64px)] font-bold leading-[1] tracking-[-0.03em]">Built for teams who need it right, first time.</h2>
          <a
            href={whatsapp("Hi Odyra Studio! We'd like coverage for a corporate event. Date: __ · City: __ · Type: __")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex rounded-lg bg-electric px-7 py-4 text-[13px] font-semibold text-navy transition hover:bg-white"
          >
            Request a proposal →
          </a>
        </Reveal>
        <div className="grid gap-3 sm:grid-cols-2">
          {coverage.map(([t, d], i) => (
            <Reveal key={t} delay={(i % 2) * 0.08}>
              <div className="h-full rounded-2xl border border-white/10 bg-navy-3/60 p-7 transition hover:-translate-y-1 hover:border-electric/50">
                <span className="text-[13px] font-semibold text-electric">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 text-xl font-semibold">{t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/65">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Feature() {
  return (
    <section className="bg-navy py-28 font-tech text-white sm:py-36">
      <div className="wrap">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <MaskText lines={["Featured:", "Qriosity"]} className="text-[clamp(44px,6vw,92px)] font-bold leading-[0.95] tracking-[-0.04em]" />
          <p className="max-w-sm text-white/65">A corporate quiz finale — stage, winners, networking and the after-hours — covered end to end.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <ParallaxImg img={C[3]} alt="Winners on stage" className="aspect-[4/3] rounded-2xl md:col-span-2" strength={40} sizes="66vw" />
          <ParallaxImg img={C[0]} alt="On-stage interview" className="aspect-[4/3] rounded-2xl md:aspect-auto" strength={40} sizes="33vw" />
          <ParallaxImg img={C[18]} alt="Felicitation" className="aspect-[4/3] rounded-2xl" strength={30} sizes="33vw" />
          <ParallaxImg img={C[5]} alt="Audience" className="aspect-[4/3] rounded-2xl" strength={30} sizes="33vw" />
          <ParallaxImg img={C[14]} alt="Networking" className="aspect-[4/3] rounded-2xl" strength={30} sizes="33vw" />
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section className="bg-navy-2 py-28 font-tech text-white">
      <div className="wrap">
        <Reveal className="mb-12">
          <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-electric">Event gallery</p>
          <h2 className="mt-4 text-[clamp(36px,4.4vw,64px)] font-bold tracking-[-0.03em]">More from the floor</h2>
        </Reveal>
        <Masonry images={C} label="Corporate event" cols="columns-2 lg:columns-3" itemClass="mb-3 md:mb-4 rounded-xl" />
      </div>
    </section>
  );
}

export default function Corporate() {
  return (
    <>
      <Header theme="navy" overVideo={false} />
      <main>
        <Hero />
        <Coverage />
        <Feature />
        <Gallery />
      </main>
    </>
  );
}
