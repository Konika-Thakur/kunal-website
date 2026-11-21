"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useState } from "react";
import Header from "../Header";
import { BgVideo, MaskText, ParallaxImg, Reveal } from "../motion";
import { Masonry, PlayIcon, useFilmPlayer } from "../media";
import { M, weddingFilms, whatsapp, type Film } from "@/data/site";

const W = M.wedding;
const ease = [0.16, 1, 0.3, 1] as const;

function Hero() {
  const v = M.video["wedding-loop"];
  return (
    <section className="relative h-[100svh] min-h-[620px] overflow-hidden bg-maroon-2 text-ivory">
      <BgVideo src={v.src} poster={W[1].src} />
      <div className="absolute inset-0 bg-gradient-to-b from-maroon-2/40 via-black/20 to-maroon-2/85" />
      <div className="relative flex h-full flex-col items-center justify-center px-5 text-center">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1.2 }} className="eyebrow text-ivory/80">
          Odyra Studio · Weddings
        </motion.p>
        <h1 className="mt-6 font-serif font-normal leading-[0.9]">
          <span className="block overflow-hidden">
            <motion.span className="block text-[clamp(72px,15vw,230px)] italic" initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ delay: 0.3, duration: 1.4, ease }}>
              Love,
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span className="block text-[clamp(56px,11vw,170px)]" initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ delay: 0.45, duration: 1.4, ease }}>
              in motion.
            </motion.span>
          </span>
        </h1>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 1 }} className="mt-8 max-w-lg text-[15px] leading-relaxed text-ivory/85">
          Cinematic wedding films and editorial photography for couples who want to feel the day again — not just see it.
        </motion.p>
      </div>
      <div className="absolute inset-x-0 bottom-8 text-center text-[10px] uppercase tracking-mega text-ivory/70">Scroll</div>
    </section>
  );
}

function Intro() {
  return (
    <section className="bg-ivory py-28 text-maroon-2 sm:py-40">
      <div className="wrap grid items-center gap-16 lg:grid-cols-[1.1fr_1fr]">
        <Reveal>
          <p className="eyebrow text-maroon/70">Our approach</p>
          <p className="mt-8 font-serif text-[clamp(32px,4vw,58px)] leading-[1.1]">
            We don&apos;t stage your wedding. We <em>read</em> it — the glance during the pheras, the tears at the vidaai,
            your grandmother on the dance floor — and build a film around the moments that were truly yours.
          </p>
        </Reveal>
        <div className="relative h-[560px] sm:h-[680px]">
          <ParallaxImg img={W[0]} alt="Bride portrait in window light" className="absolute left-0 top-0 h-[78%] w-[68%]" strength={40} sizes="40vw" />
          <ParallaxImg img={W[24]} alt="Couple portrait" className="absolute bottom-0 right-0 h-[56%] w-[52%] border-[8px] border-ivory" strength={70} sizes="30vw" />
        </div>
      </div>
    </section>
  );
}

/** Editorial list of films: hovering a row floats its cover beside the cursor (desktop). */
function Films() {
  const { play, player } = useFilmPlayer();
  const [hover, setHover] = useState<Film | null>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 160, damping: 20 });
  const y = useSpring(useMotionValue(0), { stiffness: 160, damping: 20 });

  return (
    <section
      className="relative bg-maroon-2 py-28 text-ivory sm:py-36"
      onPointerMove={(e) => { x.set(e.clientX); y.set(e.clientY); }}
    >
      <div className="wrap">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <MaskText lines={["Wedding", "films"]} className="font-serif text-[clamp(64px,9vw,140px)] italic leading-[0.9]" />
          <p className="max-w-sm text-ivory/70">Full films, teasers and reels. Click any title to watch.</p>
        </div>
        <ul className="border-t border-ivory/20">
          {weddingFilms.map((f, i) => (
            <li key={f.id}>
              <button
                onClick={() => play(f)}
                onPointerEnter={() => setHover(f)}
                onPointerLeave={() => setHover(null)}
                className="group grid w-full grid-cols-[auto_1fr] items-center gap-5 border-b border-ivory/20 py-7 text-left sm:grid-cols-[80px_1fr_auto] sm:py-9"
              >
                <span className="relative h-16 w-24 overflow-hidden sm:hidden">
                  <Image src={f.cover.src} alt="" fill sizes="96px" className="object-cover" />
                </span>
                <span className="hidden font-serif text-xl italic text-ivory/50 sm:block">0{i + 1}</span>
                <span>
                  <span className="block font-serif text-[clamp(30px,4.6vw,68px)] leading-none transition duration-500 group-hover:translate-x-3 group-hover:italic">
                    {f.title}
                  </span>
                  <span className="mt-2 block text-[12px] uppercase tracking-[0.2em] text-ivory/60">{f.sub}</span>
                </span>
                <span className="hidden text-[11px] font-semibold uppercase tracking-[0.25em] text-ivory/70 transition group-hover:text-ivory sm:block">
                  Play film ▶
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <AnimatePresence>
        {hover && (
          <motion.div
            key={hover.id}
            style={{ x, y, translateX: "-50%", translateY: "-50%" }}
            initial={{ opacity: 0, scale: 0.7, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.4, ease }}
            className="pointer-events-none fixed left-0 top-0 z-30 hidden aspect-video w-[380px] overflow-hidden shadow-2xl lg:block"
          >
            <Image src={hover.cover.src} alt="" fill sizes="380px" className="object-cover" />
            <PlayIcon className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 text-white" />
          </motion.div>
        )}
      </AnimatePresence>
      {player}
    </section>
  );
}

const chapters = [
  { t: "The Bride", d: "Unhurried portraits — window light, veils and the quiet before everything begins.", imgs: [W[0], W[8], W[9], W[23]] },
  { t: "Haldi & Mehendi", d: "Colour, chaos and laughter. We move with the family instead of stopping it for poses.", imgs: [W[16], W[18], W[21], W[26]] },
  { t: "The Couple", d: "Directed but never stiff — golden-hour portraits that still look like the two of you.", imgs: [W[10], W[14], W[24], W[27]] },
  { t: "The Details", d: "Rings, mehendi, jewellery and the heirlooms that carry the story between frames.", imgs: [W[30], W[6], W[12], W[33]] },
  { t: "The Celebration", d: "Sangeet stages, sparkler exits and the uncles who own the dance floor.", imgs: [W[37], W[38], W[17], W[35]] },
];

function Chapters() {
  return (
    <section className="bg-ivory py-28 text-maroon-2 sm:py-36">
      <div className="wrap">
        <Reveal className="mb-20 max-w-2xl">
          <p className="eyebrow text-maroon/70">Chapters of the day</p>
          <h2 className="mt-6 font-serif text-[clamp(44px,6vw,92px)] leading-[0.95]">
            Every ritual, <em>its own story.</em>
          </h2>
        </Reveal>
        <div className="space-y-28">
          {chapters.map((c, i) => (
            <div key={c.t} className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <span className="font-serif text-7xl italic text-maroon/30">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-serif text-[clamp(40px,4.6vw,68px)] leading-none">{c.t}</h3>
                <p className="mt-5 max-w-sm text-[16px] leading-relaxed text-maroon-2/75">{c.d}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {c.imgs.map((im, k) => (
                  <ParallaxImg
                    key={im.src}
                    img={im}
                    alt={`${c.t} ${k + 1}`}
                    className={k % 3 === 0 ? "col-span-2 aspect-[16/10]" : "aspect-[4/5]"}
                    strength={30}
                    sizes="(min-width:1024px) 40vw, 50vw"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const deliverables = [
  { t: "Cinematic wedding film", d: "A story-driven film of your day, edited and colour-graded in-house." },
  { t: "Teaser & reels", d: "Short vertical edits made for Instagram — perfect for sharing the week after." },
  { t: "Editorial photography", d: "Portraits, candids and details, retouched with a consistent signature look." },
  { t: "Drone coverage", d: "Aerial reveals of the venue, baraat and celebrations where permitted." },
  { t: "Multi-camera coverage", d: "Ceremonies and sangeet covered from multiple angles so nothing is missed." },
];

const steps = ["Tell us your dates & venue", "A planning call with Kunal", "Shoot days — we blend in", "Films & photos delivered"];

function Offer() {
  return (
    <section className="bg-ivory-2 py-28 text-maroon-2 sm:py-36">
      <div className="wrap grid gap-20 lg:grid-cols-2">
        <div>
          <Reveal>
            <p className="eyebrow text-maroon/70">What&apos;s included</p>
            <h2 className="mt-6 font-serif text-[clamp(40px,5vw,76px)] leading-[0.95]">Collections, <em>tailored.</em></h2>
            <p className="mt-6 max-w-md leading-relaxed text-maroon-2/75">
              Every wedding is quoted around your events, days and destination. Pick what you need — we&apos;ll shape the team around it.
            </p>
          </Reveal>
          <div className="mt-12 divide-y divide-maroon/15 border-y border-maroon/15">
            {deliverables.map((d, i) => (
              <Reveal key={d.t} delay={i * 0.05}>
                <div className="grid grid-cols-[40px_1fr] gap-4 py-6">
                  <span className="font-serif text-xl italic text-maroon/50">{i + 1}.</span>
                  <span>
                    <span className="block font-serif text-2xl">{d.t}</span>
                    <span className="mt-1 block text-[15px] text-maroon-2/70">{d.d}</span>
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <div>
          <Reveal>
            <p className="eyebrow text-maroon/70">How it works</p>
          </Reveal>
          <div className="mt-10 space-y-5">
            {steps.map((s, i) => (
              <Reveal key={s} delay={i * 0.08}>
                <div className="flex items-center gap-6 rounded-full border border-maroon/20 bg-ivory px-7 py-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-maroon font-serif text-lg text-ivory">{i + 1}</span>
                  <span className="font-serif text-2xl">{s}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <a
              href={whatsapp("Hi Odyra Studio! We're getting married and would love to check your availability. Date: __ · Venue: __")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-12 inline-flex rounded-full bg-maroon px-9 py-5 text-[12px] font-semibold uppercase tracking-[0.22em] text-ivory transition hover:bg-maroon-2"
            >
              Check our availability →
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section className="bg-ivory py-28 text-maroon-2">
      <div className="wrap">
        <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-serif text-[clamp(44px,6vw,92px)] italic leading-none">The gallery</h2>
          <p className="max-w-sm text-maroon-2/70">A wider look across recent weddings. Tap any photo to view it full-screen.</p>
        </Reveal>
        <Masonry images={W} label="Wedding" cols="columns-2 lg:columns-4" />
      </div>
    </section>
  );
}

export default function Weddings() {
  return (
    <>
      <Header theme="ivory" />
      <main>
        <Hero />
        <Intro />
        <Films />
        <Chapters />
        <Gallery />
        <Offer />
      </main>
    </>
  );
}
