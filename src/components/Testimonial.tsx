"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Reveal } from "./motion";

/** Client review: a large, cinematic video player — click to play with sound. */
export default function Testimonial({ tone = "dark" }: { tone?: "dark" | "stone" }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const dark = tone === "dark";

  function play() {
    const v = ref.current;
    if (!v) return;
    v.muted = false;
    v.controls = true;
    v.play().catch(() => {});
    setStarted(true);
  }

  return (
    <section className={dark ? "bg-ink py-24 text-bone sm:py-32" : "bg-stone py-24 font-arch text-slate sm:py-32"}>
      <div className="wrap">
        <Reveal className="mx-auto mb-12 max-w-3xl text-center">
          <p className={`eyebrow ${dark ? "text-gold" : "text-sage"}`}>Client reviews</p>
          <h2 className={dark ? "mt-5 font-display text-[clamp(40px,5.5vw,80px)] uppercase leading-[0.95]" : "mt-5 text-[clamp(36px,4.4vw,64px)] font-light leading-[1.05] tracking-[-0.03em]"}>
            {dark ? "Hear it from our clients" : <>Hear it from <span className="font-semibold">our clients.</span></>}
          </h2>
          <p className={`mx-auto mt-5 max-w-xl text-[16px] leading-relaxed ${dark ? "text-bone-dim" : "text-slate/70"}`}>
            Unscripted feedback, filmed on location. Press play to listen.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative mx-auto max-w-6xl">
            <span aria-hidden className={`absolute -inset-px ${dark ? "bg-gradient-to-b from-gold/40 to-transparent" : "bg-gradient-to-b from-sage/40 to-transparent"}`} />
            <div className="group relative aspect-video overflow-hidden bg-black shadow-[0_40px_120px_-30px_rgba(0,0,0,.8)]">
              <video
                ref={ref}
                src="/media/video/testimonial.mp4"
                poster="/media/video/testimonial-poster.jpg"
                preload="metadata"
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
                onEnded={() => setStarted(false)}
              >
                <track kind="captions" />
              </video>
              {!started && (
                <button onClick={play} aria-label="Play client review with sound" className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-black/30 transition duration-500 hover:bg-black/15">
                  <motion.span
                    whileHover={{ scale: 1.08 }}
                    className="grid h-24 w-24 place-items-center rounded-full border border-white/70 bg-white/15 text-white backdrop-blur-md sm:h-32 sm:w-32"
                  >
                    <svg viewBox="0 0 24 24" className="ml-1 h-10 w-10" fill="currentColor"><path d="M7 4.5v15l13-7.5z" /></svg>
                  </motion.span>
                  <span className="rounded-full bg-black/45 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur">
                    🔊 Watch with sound · 0:44
                  </span>
                </button>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
