"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Header from "../Header";
import Testimonial from "../Testimonial";
import { BgVideo, Counter, Marquee, MaskText, ParallaxImg, Reveal } from "../motion";
import { PlayIcon, useFilmPlayer } from "../media";
import { M, brandFilms, brands, categories, founder, musicVideo, propertyFilms, stats, studio, weddingFilms, whatsapp } from "@/data/site";

const ease = [0.16, 1, 0.3, 1] as const;

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px] overflow-hidden bg-ink text-white">
      <motion.div style={{ scale }} className="absolute inset-0">
        <BgVideo src="/media/video/home-reel.mp4" srcMobile="/media/video/home-reel-720.mp4" poster="/media/video/home-reel-poster.jpg" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/80" />

      <motion.div style={{ y, opacity: fade }} className="wrap relative flex h-full flex-col justify-end pb-14 sm:pb-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1, ease }}
          className="eyebrow text-gold-2"
        >
          Film &amp; Photography Studio · {studio.city}
        </motion.p>
        <h1 className="mt-3 overflow-hidden font-display uppercase leading-[0.95] tracking-[0.04em]">
          <motion.span
            className="block whitespace-nowrap text-[clamp(44px,7.5vw,112px)]"
            initial={{ y: "105%" }}
            animate={{ y: "0%" }}
            transition={{ delay: 0.35, duration: 1.3, ease }}
          >
            Odyra Studio
          </motion.span>
        </h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 1 }}
          className="mt-8 flex flex-col justify-between gap-6 border-t border-white/25 pt-6 sm:flex-row sm:items-end"
        >
          <p className="max-w-md font-serif text-xl italic leading-snug text-white/85 sm:text-2xl">
            Cinematic stories for weddings, spaces and brands — directed by {founder.name}.
          </p>
          <div className="flex flex-wrap gap-x-7 gap-y-2 text-[11px] font-medium uppercase tracking-[0.22em]">
            {categories.map((c) => (
              <Link key={c.slug} href={c.href} className="link-u opacity-80 hover:opacity-100">
                {c.title}
              </Link>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Intro() {
  return (
    <section className="bg-ink py-28 text-bone sm:py-40">
      <div className="wrap grid gap-14 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <p className="eyebrow text-gold">The studio</p>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-bone-dim">
            One creative team for the whole journey — concept, storyboard, shoot, drone, edit and final grade.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="font-serif text-[clamp(30px,4.2vw,62px)] font-normal leading-[1.08]">
            We make <em className="text-gold-2">films people feel</em> and photographs that make a space impossible to scroll past — for couples,
            hoteliers and brands across India and beyond.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section className="bg-ink text-bone">
      {categories.map((c, i) => (
        <Link key={c.slug} href={c.href} className="group relative block h-[78vh] min-h-[520px] overflow-hidden border-t border-white/10">
          <ParallaxImg img={c.cover} alt={c.title} className="absolute inset-0 h-full w-full" strength={90} sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20 transition duration-700 group-hover:from-black/70" />
          <div className="wrap relative flex h-full flex-col justify-between py-10">
            <div className="flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.25em] text-white/80">
              <span>{c.kicker}</span>
              <span>0{i + 1} / 0{categories.length}</span>
            </div>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <MaskText lines={[c.title]} className="font-display text-[clamp(56px,11vw,170px)] uppercase leading-[0.9] text-white" />
              <div className="max-w-sm pb-3">
                <p className="text-[15px] leading-relaxed text-white/80">{c.blurb}</p>
                <span className="mt-5 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-2">
                  Explore {c.title}
                  <span className="inline-block transition-transform duration-500 group-hover:translate-x-2">→</span>
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </section>
  );
}

function Founder() {
  return (
    <section className="bg-bone py-28 text-ink sm:py-36">
      <div className="wrap grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
        <div className="relative">
          <ParallaxImg img={M.kunal.gallery[0]} alt={`${founder.name}, founder of Odyra Studio`} className="aspect-[4/5] w-full" strength={40} sizes="(min-width:1024px) 50vw, 100vw" />
          <motion.div
            initial={{ opacity: 0, rotate: -8, scale: 0.8 }}
            whileInView={{ opacity: 1, rotate: -5, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 1, ease }}
            className="absolute -bottom-10 -right-3 w-36 border-[6px] border-bone shadow-2xl sm:-right-8 sm:w-52"
          >
            <div className="relative aspect-[4/5] w-full">
              <Image src={M.kunal.portrait.src} alt="" fill sizes="210px" className="object-cover" />
            </div>
          </motion.div>
        </div>
        <div>
          <Reveal>
            <p className="eyebrow text-maroon">Founder</p>
          </Reveal>
          <MaskText lines={["Kunal", "Nagia"]} className="mt-5 font-display text-[clamp(64px,9vw,140px)] uppercase leading-[0.88]" />
          <Reveal delay={0.1}>
            <p className="mt-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-ink/60">{founder.role}</p>
            <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-ink/80">
              {founder.bio.map((b) => <p key={b}>{b}</p>)}
            </div>
            <Link href="/about" className="group mt-10 inline-flex items-center gap-3 border-b border-ink pb-1 text-[12px] font-semibold uppercase tracking-[0.22em]">
              The full story <span className="transition group-hover:translate-x-1">→</span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="bg-ink py-24 text-bone">
      <div className="wrap grid grid-cols-2 gap-y-12 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="border-l border-white/15 pl-6">
            <b className="block font-display text-[clamp(56px,7vw,104px)] font-normal leading-none text-gold-2">
              <Counter to={s.n} suffix={s.s} />
            </b>
            <span className="mt-3 block text-[12px] uppercase tracking-[0.2em] text-bone-dim">{s.label}</span>
          </Reveal>
        ))}
      </div>
      <div className="mt-24 border-y border-white/10 py-8">
        <p className="eyebrow mb-6 text-center text-bone-dim">Brands &amp; properties we&apos;ve filmed for</p>
        <Marquee items={brands} className="font-serif text-[clamp(28px,3.4vw,48px)] italic text-bone/90" sep="·" slow />
      </div>
    </section>
  );
}

function FeaturedFilms() {
  const { play, player } = useFilmPlayer();
  const picks = [weddingFilms[0], propertyFilms[0], brandFilms[0], musicVideo];
  return (
    <section className="bg-ink pb-32 pt-8 text-bone">
      <div className="wrap">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <MaskText lines={["Selected", "films"]} className="font-display text-[clamp(56px,9vw,140px)] uppercase leading-[0.88]" />
          <p className="max-w-sm text-bone-dim">One from every room of the studio. Hit play — each opens the full film.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {picks.map((f, i) => (
            <Reveal key={f.id} delay={(i % 2) * 0.1}>
              <button onClick={() => play(f)} className="group relative block aspect-video w-full overflow-hidden text-left">
                <Image src={f.cover.src} alt={f.title} fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover transition duration-[1.4s] ease-out group-hover:scale-105" />
                <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <PlayIcon className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 text-white" />
                <span className="absolute bottom-5 left-5 right-5">
                  <span className="eyebrow text-gold-2">{["Wedding", "Property", "Brand film", "Music video"][i]}</span>
                  <span className="mt-2 block font-display text-3xl uppercase sm:text-4xl">{f.title}</span>
                  <span className="text-sm text-white/70">{f.sub}</span>
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

const reasons = [
  { t: "Story before shots", d: "Every project starts with a narrative and a storyboard — so the film has a spine, not just pretty frames." },
  { t: "Cinema-grade kit", d: "RED, Blackmagic and Sony FX cinema cameras, prime glass, gimbals and multi-camera setups." },
  { t: "Air & ground", d: "Drone cinematography built into the plan — reveals, aerial establishing shots and property flyovers." },
  { t: "In-house edit & grade", d: "Edited and colour-graded in DaVinci Resolve and Premiere Pro by the people who shot it." },
];

function Why() {
  return (
    <section className="bg-bone py-28 text-ink sm:py-36">
      <div className="wrap">
        <Marquee items={["Why work with us", "Why work with us", "Why work with us"]} sep="〰" className="font-display text-[clamp(44px,7vw,110px)] uppercase leading-none text-ink" />
        <div className="mt-20 grid gap-px bg-ink/15 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r, i) => (
            <Reveal key={r.t} delay={i * 0.08} className="bg-bone p-8">
              <span className="font-serif text-5xl italic text-maroon">0{i + 1}</span>
              <h3 className="mt-8 text-lg font-semibold uppercase tracking-[0.08em]">{r.t}</h3>
              <p className="mt-3 leading-relaxed text-ink/70">{r.d}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-16 flex flex-wrap items-center gap-5">
          <a
            href={whatsapp("Hi Odyra Studio! I'd like to discuss a shoot.")}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-ink px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-bone transition hover:bg-maroon"
          >
            Start a project →
          </a>
          <span className="text-sm text-ink/60">{studio.reach}</span>
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Header theme="dark" />
      <main>
        <Hero />
        <Intro />
        <Categories />
        <Founder />
        <Stats />
        <Testimonial />
        <FeaturedFilms />
        <Why />
      </main>
    </>
  );
}
