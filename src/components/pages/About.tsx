"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Header from "../Header";
import { MaskText, ParallaxImg, Reveal } from "../motion";
import { M, brands, founder, stats, studio } from "@/data/site";
import { Counter } from "../motion";

const ease = [0.16, 1, 0.3, 1] as const;

/** Silent looping film of Kunal; visitors can switch the sound on. */
function AboutFilm() {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(!reduced);
  // the name is baked into the film behind Kunal; phones get a 9:16 cut that follows him
  const [portrait, setPortrait] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-aspect-ratio: 1/1)");
    const on = () => setPortrait(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  const file = portrait ? "kunal-about-name-mobile" : "kunal-about-name";
  function toggleSound() {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (v.paused) v.play().then(() => setPlaying(true)).catch(() => {});
  }
  return (
    <>
      <video
        ref={ref}
        key={file}
        className="absolute inset-0 h-full w-full object-cover"
        src={`/media/video/${file}.mp4`}
        poster={`/media/video/${file}-poster.jpg`}
        autoPlay={!reduced}
        muted
        loop
        playsInline
        preload="auto"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        aria-label="Kunal Nagia walking at sunset in front of his name"
      />
      <button
        onClick={toggleSound}
        className="absolute bottom-6 right-5 z-10 inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/30 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md transition hover:bg-white hover:text-ink sm:right-10"
      >
        {!playing ? "▶ Play film" : muted ? "🔊 Play with sound" : "🔇 Mute"}
      </button>
    </>
  );
}

export default function About() {
  return (
    <>
      <Header theme="dark" overVideo={false} />
      <main className="bg-ink text-bone">
        {/* full-screen film of Kunal at sunset */}
        <section className="relative h-[100svh] min-h-[640px] overflow-hidden">
          <AboutFilm />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink to-transparent" />
          <h1 className="sr-only">{founder.name}</h1>
          <div className="wrap relative flex h-full flex-col justify-end pb-20 sm:pb-16">
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 1, ease }} className="eyebrow text-gold-2">
              About · Founder
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 1, ease }} className="mt-3 max-w-[70%] font-serif text-2xl italic text-bone/90 sm:text-3xl">
              {founder.role}
            </motion.p>
          </div>
        </section>

        {/* profile — one portrait, the story, key facts */}
        <section className="py-24 sm:py-32">
          <div className="wrap grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
            <Reveal className="lg:sticky lg:top-28 lg:self-start">
              <figure>
                <div className="relative">
                  <span aria-hidden className="absolute -right-3 -top-3 h-full w-full border border-gold/40 sm:-right-4 sm:-top-4" />
                  <ParallaxImg img={M.kunal.portrait} alt={`Portrait of ${founder.name}`} className="relative aspect-[4/5] w-full" strength={25} sizes="(min-width:1024px) 38vw, 90vw" />
                  {/* second photo: on location by the sea */}
                  <motion.div
                    initial={{ opacity: 0, y: 30, rotate: 0 }}
                    whileInView={{ opacity: 1, y: 0, rotate: 3 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 1, ease }}
                    className="absolute -bottom-12 -left-4 w-[42%] border-[6px] border-ink shadow-[0_30px_60px_-20px_rgba(0,0,0,.9)] sm:-left-8"
                  >
                    <div className="relative aspect-[3/4] w-full">
                      <Image src={M.kunal.gallery[0].src} alt={`${founder.name} on location`} fill sizes="200px" className="object-cover" />
                    </div>
                  </motion.div>
                </div>
                <figcaption className="mt-20 flex items-baseline justify-between gap-4 border-t border-white/10 pt-4">
                  <span className="font-display text-2xl uppercase tracking-wide">{founder.name}</span>
                  <span className="text-[12px] uppercase tracking-[0.18em] text-bone-dim">{studio.city}</span>
                </figcaption>
              </figure>
            </Reveal>

            <div>
              <Reveal><p className="eyebrow text-gold">The story</p></Reveal>
              <Reveal delay={0.05}>
                <p className="mt-6 font-serif text-[clamp(28px,3vw,42px)] leading-[1.2] text-bone">{founder.bio[0]}</p>
              </Reveal>
              <Reveal delay={0.1} className="mt-8 space-y-5 text-[17px] leading-relaxed text-bone/70">
                {founder.bio.slice(1).map((b) => <p key={b}>{b}</p>)}
                <p>
                  Odyra Studio is the home for that work — one team for weddings, properties, brands and events, based in {studio.city} and shooting across
                  India and beyond.
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <dl className="mt-12 grid grid-cols-1 border-t border-white/10 sm:grid-cols-2">
                  {[
                    ["Role", founder.role.replace("Founder · ", "")],
                    ["Based in", studio.city],
                    ["Working since", "2020"],
                    ["Coverage", studio.reach],
                    ["Education", "B.Com (Computer Application), PIMR Gwalior"],
                    ["Languages", "English, Hindi"],
                  ].map(([k, v]) => (
                    <div key={k} className="border-b border-white/10 py-5 sm:odd:pr-6 sm:even:border-l sm:even:pl-6">
                      <dt className="text-[11px] font-medium uppercase tracking-[0.2em] text-bone-dim">{k}</dt>
                      <dd className="mt-1.5 text-[15.5px] text-bone">{v}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </div>
        </section>

        {/* numbers */}
        <section className="border-y border-white/10 bg-ink-2 py-20">
          <div className="wrap grid grid-cols-2 gap-y-12 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="border-l border-white/15 pl-6">
                <b className="block font-display text-[clamp(52px,6vw,88px)] font-normal leading-none text-gold-2"><Counter to={s.n} suffix={s.s} /></b>
                <span className="mt-3 block text-[12px] uppercase tracking-[0.2em] text-bone-dim">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* experience timeline */}
        <section className="bg-bone py-24 text-ink sm:py-32">
          <div className="wrap grid gap-14 lg:grid-cols-[0.6fr_1.4fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="eyebrow text-maroon">Career</p>
              <MaskText lines={["Experience"]} className="mt-4 font-display text-[clamp(52px,7vw,104px)] uppercase leading-none" />
              <p className="mt-5 max-w-xs text-ink/60">From boutique hotels to luxury resorts in India and Zanzibar — and 100+ independent projects since 2020.</p>
            </div>
            <ol className="relative border-l border-ink/15">
              {founder.experience.map((e, i) => (
                <li key={e.org} className="relative pb-12 pl-10 last:pb-0">
                  <Reveal delay={i * 0.06}>
                    <span aria-hidden className={`absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-bone ${i === 0 ? "bg-maroon" : "bg-ink/40"}`} />
                    <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-maroon">{e.when} · {e.where}</p>
                    <h3 className="mt-2 font-display text-[clamp(26px,2.8vw,38px)] uppercase leading-tight">{e.org}</h3>
                    <p className="mt-1 font-serif text-xl italic text-ink/70">{e.role}</p>
                    <ul className="mt-4 space-y-2 text-[15.5px] leading-relaxed text-ink/75">
                      {e.points.map((p) => (
                        <li key={p} className="relative pl-5 before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-2.5 before:bg-maroon">{p}</li>
                      ))}
                    </ul>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* expertise */}
        <section className="py-24 sm:py-32">
          <div className="wrap">
            <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="eyebrow text-gold">Expertise</p>
                <MaskText lines={["Craft & kit"]} className="mt-4 font-display text-[clamp(48px,6.5vw,96px)] uppercase leading-none" />
              </div>
              <p className="max-w-sm text-bone-dim">Everything from storyboard to final grade is handled in-house, on industry-standard cinema equipment.</p>
            </div>
            <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-3">
              {[
                { t: "01 · On set", items: ["Cinematography", "Direction", "Drone filming", "Lighting design", "Storyboarding"] },
                { t: "02 · Post-production", items: ["DaVinci Resolve", "Adobe Premiere Pro", "Adobe Lightroom", "Colour grading", "Content strategy"] },
                { t: "03 · Cameras & kit", items: founder.gear },
              ].map((col, i) => (
                <Reveal key={col.t} delay={i * 0.06} className="bg-ink p-8">
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gold">{col.t}</p>
                  <ul className="mt-6">
                    {col.items.map((s) => (
                      <li key={s} className="border-b border-white/10 py-3 text-[16px] last:border-0">{s}</li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* trusted by */}
        <section className="border-t border-white/10 py-16">
          <div className="wrap">
            <p className="eyebrow text-center text-bone-dim">Trusted by</p>
            <div className="mx-auto mt-8 flex max-w-5xl flex-wrap items-center justify-center gap-x-8 gap-y-3 font-serif text-[clamp(20px,2.2vw,30px)] italic text-bone/80">
              {brands.map((b) => (
                <span key={b}>{b}</span>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
