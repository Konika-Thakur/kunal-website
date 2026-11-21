"use client";

import Image from "next/image";
import { animate, motion, useInView, useReducedMotion, useScroll, useTransform, type HTMLMotionProps } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Img } from "@/data/site";

const ease = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children, delay = 0, y = 40, className = "", ...rest
}: { children: React.ReactNode; delay?: number; y?: number; className?: string } & HTMLMotionProps<"div">) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1, delay, ease }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Headline whose lines slide up from behind a mask. */
export function MaskText({ lines, className = "", delay = 0, as = "h2" }: { lines: string[]; className?: string; delay?: number; as?: "h1" | "h2" | "h3" }) {
  // The visible wrapper triggers in-view; the clipped lines follow via variants
  // (an element hidden behind overflow:hidden never reports as intersecting itself).
  const Tag = motion[as];
  return (
    <Tag className={className} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em]">
          <motion.span
            className="block"
            variants={{ hidden: { y: "110%" }, show: { y: "0%", transition: { duration: 1.1, delay: delay + i * 0.1, ease } } }}
          >
            {l}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Image that wipes in, then drifts with scroll (parallax). */
export function ParallaxImg({
  img, alt, className = "", strength = 60, sizes = "100vw", priority = false,
}: { img: Img; alt: string; className?: string; strength?: number; sizes?: string; priority?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-strength, strength]);
  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      initial={{ clipPath: "inset(12% 0 12% 0)" }}
      whileInView={{ clipPath: "inset(0% 0 0% 0)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 1.3, ease }}
    >
      <motion.div style={{ y }} className="absolute inset-[-80px_0]">
        <Image src={img.src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </motion.div>
    </motion.div>
  );
}

export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduced = useReducedMotion();
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (reduced) { setV(to); return; }
    const c = animate(0, to, { duration: 2, ease, onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [inView, reduced, to]);
  return <span ref={ref}>{v}{suffix}</span>;
}

export function Marquee({ items, className = "", sep = "✦", slow = false }: { items: string[]; className?: string; sep?: string; slow?: boolean }) {
  return (
    <div className={`flex overflow-hidden whitespace-nowrap ${className}`}>
      <div className={`flex shrink-0 ${slow ? "animate-marquee-slow" : "animate-marquee"}`}>
        {[...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center">
            <span className="px-6">{t}</span>
            <span className="opacity-50">{sep}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/** Full-bleed muted looping video (falls back to the poster for reduced-motion users). */
export function BgVideo({ src, srcMobile, poster, className = "" }: { src: string; srcMobile?: string; poster: string; className?: string }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);
  // pick the file after mount so small screens never download the large version
  const [file, setFile] = useState<string | null>(null);
  useEffect(() => {
    setFile(srcMobile && window.matchMedia("(max-width: 900px)").matches ? srcMobile : src);
  }, [src, srcMobile]);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()));
    io.observe(v);
    return () => io.disconnect();
  }, [reduced, file]);
  if (reduced) return <Image src={poster} alt="" fill priority className={`object-cover ${className}`} />;
  return (
    <video
      ref={ref}
      key={file ?? "poster"}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
      src={file ?? undefined}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden
    />
  );
}
