"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Header from "../Header";
import { MaskText, Reveal } from "../motion";
import { PlayIcon, useFilmPlayer } from "../media";
import { brandFilms, musicVideo, whatsapp, type Film } from "@/data/site";

const ease = [0.16, 1, 0.3, 1] as const;

function Column({ films, anim, offset = "" }: { films: Film[]; anim: string; offset?: string }) {
  return (
    <div className={`flex flex-col gap-4 ${offset}`}>
      <div className={`flex flex-col gap-4 ${anim}`}>
        {[...films, ...films].map((f, i) => (
          <div key={i} className="relative aspect-[9/16] w-full overflow-hidden">
            <Image src={f.cover.src} alt="" fill sizes="25vw" className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  const a = brandFilms.slice(0, 3), b = brandFilms.slice(3, 6), c = brandFilms.slice(6, 9);
  return (
    <section className="relative h-[100svh] min-h-[640px] overflow-hidden bg-black text-white">
      <div aria-hidden className="absolute inset-0 grid -rotate-6 scale-125 grid-cols-3 gap-4 opacity-55 sm:grid-cols-4 lg:grid-cols-5">
        <Column films={a} anim="animate-up-slow" />
        <Column films={b} anim="animate-up-fast" offset="-mt-40" />
        <Column films={c} anim="animate-up-slow" offset="-mt-20" />
        <div className="hidden sm:block"><Column films={[...b].reverse()} anim="animate-up-fast" offset="-mt-60" /></div>
        <div className="hidden lg:block"><Column films={[...a].reverse()} anim="animate-up-slow" offset="-mt-10" /></div>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.35),rgba(0,0,0,0.92)_75%)]" />
      <div className="wrap relative flex h-full flex-col justify-center">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="eyebrow text-ember">
          Odyra Studio · Commercial
        </motion.p>
        <h1 className="mt-5 font-display uppercase leading-[0.85]">
          {["Brand", "films."].map((w, i) => (
            <span key={w} className="block overflow-hidden">
              <motion.span className="block text-[clamp(90px,20vw,320px)]" initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ delay: 0.3 + i * 0.12, duration: 1.3, ease }}>
                {w}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 1 }} className="mt-6 max-w-md text-lg text-white/75">
          Fashion, hospitality, F&amp;B and music — scroll-stopping films and reels made for the feed and the big screen.
        </motion.p>
      </div>
    </section>
  );
}

/** Pinned section: vertical scroll drives a horizontal strip of 9:16 reels. */
function Reels() {
  const { play, player } = useFilmPlayer();
  const ref = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  useEffect(() => {
    const m = () => track.current && setDist(Math.max(0, track.current.scrollWidth - window.innerWidth));
    m();
    window.addEventListener("resize", m);
    return () => window.removeEventListener("resize", m);
  }, []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);

  return (
    <section ref={ref} style={{ height: `calc(100vh + ${dist}px)` }} className="relative bg-black text-white">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="wrap mb-10 flex items-end justify-between gap-6">
          <h2 className="font-display text-[clamp(44px,7vw,110px)] uppercase leading-none">
            The reel <span className="text-ember">wall</span>
          </h2>
          <p className="hidden max-w-xs text-white/60 sm:block">Keep scrolling to move through the work. Tap any reel to play.</p>
        </div>
        <motion.div ref={track} style={{ x }} className="flex gap-5 pl-5 pr-[10vw] sm:pl-8 lg:pl-12">
          {brandFilms.map((f, i) => (
            <button key={f.id} onClick={() => play(f)} className="group relative aspect-[9/16] h-[58vh] max-h-[620px] shrink-0 overflow-hidden text-left">
              <Image src={f.cover.src} alt={f.title} fill sizes="35vh" className="object-cover transition duration-[1.2s] group-hover:scale-105" />
              <span className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
              <span className="absolute left-4 top-4 font-display text-xl text-white/70">{String(i + 1).padStart(2, "0")}</span>
              <PlayIcon className="absolute right-4 top-4 h-12 w-12 text-white" />
              <span className="absolute bottom-5 left-5 right-5">
                <span className="block font-display text-2xl uppercase leading-tight">{f.title}</span>
                <span className="text-[12px] uppercase tracking-[0.15em] text-white/60">{f.sub}</span>
              </span>
            </button>
          ))}
        </motion.div>
      </div>
      {player}
    </section>
  );
}

function Music() {
  const { play, player } = useFilmPlayer();
  return (
    <section className="bg-[#111] py-28 text-white sm:py-36">
      <div className="wrap">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-ember">Music video</p>
            <h2 className="mt-4 font-display text-[clamp(44px,7vw,110px)] uppercase leading-[0.9]">Aja Aja</h2>
          </div>
          <p className="max-w-sm text-white/65">Kili Paul × Akil The Brain — official music video. Shot on location with a full cinema setup.</p>
        </Reveal>
        <Reveal>
          <button onClick={() => play(musicVideo)} className="group relative block aspect-video w-full overflow-hidden">
            <Image src={musicVideo.cover.src} alt={musicVideo.title} fill sizes="100vw" className="object-cover transition duration-[1.6s] group-hover:scale-105" />
            <span className="absolute inset-0 bg-black/30 transition group-hover:bg-black/10" />
            <PlayIcon className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 text-white sm:h-32 sm:w-32" />
            <span className="absolute bottom-6 left-6 text-[11px] font-semibold uppercase tracking-[0.25em]">Watch on YouTube ▶</span>
          </button>
        </Reveal>
      </div>
      {player}
    </section>
  );
}

const caps = [
  ["Campaign films", "Hero films for launches and seasons — concept, casting, shoot and grade."],
  ["Social-first reels", "Vertical edits with a hook in the first second, cut to trend and to brand."],
  ["Fashion & runway", "Lookbooks, runway coverage and behind-the-scenes for designers and labels."],
  ["Hospitality & F&B", "Cafés, retreats and resorts — the mood that makes people book a table or a trip."],
  ["Creator collaborations", "50+ creators collaborated with across India on branded, influencer-led content."],
  ["Music videos", "Performance and narrative videos with multi-camera and drone setups."],
];

function Capabilities() {
  return (
    <section className="bg-black py-28 text-white sm:py-36">
      <div className="wrap">
        <MaskText lines={["What we", "make"]} className="font-display text-[clamp(56px,9vw,140px)] uppercase leading-[0.88]" />
        <div className="mt-16 border-t border-white/15">
          {caps.map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.04}>
              <div className="group grid gap-3 border-b border-white/15 py-8 transition-colors hover:bg-ember sm:grid-cols-[100px_1fr_1.2fr] sm:items-center sm:px-4">
                <span className="font-display text-2xl text-ember transition group-hover:text-black">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-[clamp(30px,3.6vw,52px)] uppercase leading-none transition group-hover:text-black">{t}</span>
                <span className="text-white/65 transition group-hover:text-black">{d}</span>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-14">
          <a
            href={whatsapp("Hi Odyra Studio! We're a brand looking for a film/reels. Brief: __")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex bg-ember px-9 py-5 font-display text-xl uppercase tracking-wide text-black transition hover:bg-white"
          >
            Send us a brief →
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export default function Films() {
  return (
    <>
      <Header theme="dark" />
      <main>
        <Hero />
        <Reels />
        <Music />
        <Capabilities />
      </main>
    </>
  );
}
