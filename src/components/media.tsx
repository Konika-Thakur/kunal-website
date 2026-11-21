"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useState } from "react";
import type { Film, Img } from "@/data/site";
import { lockScroll } from "./SmoothScroll";

function Portal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? createPortal(children, document.body) : null;
}

function useModal(open: boolean, onClose: () => void, onKey?: (k: string) => void) {
  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); else onKey?.(e.key); };
    window.addEventListener("keydown", h);
    return () => { lockScroll(false); window.removeEventListener("keydown", h); };
  }, [open, onClose, onKey]);
}

const youtubeUrl = (f: Film) => `https://www.youtube-nocookie.com/embed/${f.id}?autoplay=1&rel=0&modestbranding=1`;

export function PlayerModal({ film, onClose }: { film: Film | null; onClose: () => void }) {
  useModal(!!film, onClose);
  return (
    <Portal>
      <AnimatePresence>
        {film && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={film.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-black/95 p-4 sm:p-10"
            onClick={onClose}
          >
            <button onClick={onClose} className="absolute right-5 top-5 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/80 hover:text-white">
              Close ✕
            </button>
            <motion.div
              initial={{ scale: 0.94, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={`relative w-full overflow-hidden bg-black shadow-2xl ${film.vertical ? "aspect-[9/16] max-h-[82vh] max-w-[calc(82vh*9/16)]" : "aspect-video max-w-6xl"}`}
              onClick={(e) => e.stopPropagation()}
            >
              {film.kind === "youtube" ? (
                <iframe
                  src={youtubeUrl(film)}
                  title={film.title}
                  allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              ) : (
                <video
                  src={film.src}
                  poster={film.cover.src}
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 h-full w-full bg-black object-contain"
                >
                  <track kind="captions" />
                </video>
              )}
            </motion.div>
            <p className="mt-5 text-center text-sm text-white/70">
              <span className="text-white">{film.title}</span> · {film.sub}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
}

/** Hook that gives any list of film cards a shared player. */
export function useFilmPlayer() {
  const [film, setFilm] = useState<Film | null>(null);
  const close = useCallback(() => setFilm(null), []);
  return { film, play: setFilm, player: <PlayerModal film={film} onClose={close} /> };
}

export function PlayIcon({ className = "" }: { className?: string }) {
  return (
    <span className={`grid place-items-center rounded-full border border-white/60 bg-white/10 backdrop-blur-md transition duration-500 group-hover:scale-110 group-hover:bg-white group-hover:text-black ${className}`}>
      <svg viewBox="0 0 24 24" className="ml-0.5 h-1/3 w-1/3" fill="currentColor"><path d="M7 4.5v15l13-7.5z" /></svg>
    </span>
  );
}

export function Lightbox({ images, index, onClose, onIndex, label }: { images: Img[]; index: number | null; onClose: () => void; onIndex: (i: number) => void; label: string }) {
  const onKey = useCallback((k: string) => {
    if (index === null) return;
    if (k === "ArrowRight") onIndex((index + 1) % images.length);
    if (k === "ArrowLeft") onIndex((index - 1 + images.length) % images.length);
  }, [index, images.length, onIndex]);
  useModal(index !== null, onClose, onKey);
  return (
    <Portal>
      <AnimatePresence>
        {index !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${label} — photo ${index + 1} of ${images.length}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/95"
            onClick={onClose}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="absolute inset-4 sm:inset-16"
              >
                <Image src={images[index].src} alt={`${label} ${index + 1}`} fill sizes="100vw" className="object-contain" />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/80">
              <span>{String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</span>
              <button onClick={onClose} className="hover:text-white">Close ✕</button>
            </div>
            {(["prev", "next"] as const).map((d) => (
              <button
                key={d}
                aria-label={d === "prev" ? "Previous photo" : "Next photo"}
                onClick={(e) => { e.stopPropagation(); onKey(d === "prev" ? "ArrowLeft" : "ArrowRight"); }}
                className={`absolute top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/30 text-white transition hover:bg-white hover:text-black ${d === "prev" ? "left-3 sm:left-6" : "right-3 sm:right-6"}`}
              >
                {d === "prev" ? "←" : "→"}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
}

/** Masonry (CSS columns) gallery that opens a lightbox. */
export function Masonry({ images, label, cols = "columns-2 md:columns-3", gap = "gap-3 md:gap-4", itemClass = "mb-3 md:mb-4" }: { images: Img[]; label: string; cols?: string; gap?: string; itemClass?: string }) {
  const [idx, setIdx] = useState<number | null>(null);
  return (
    <>
      <div className={`${cols} ${gap}`}>
        {images.map((im, i) => (
          <motion.button
            key={im.src}
            onClick={() => setIdx(i)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.9, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className={`group relative block w-full overflow-hidden break-inside-avoid ${itemClass}`}
            aria-label={`Open ${label} photo ${i + 1}`}
          >
            <Image
              src={im.src}
              alt={`${label} ${i + 1}`}
              width={im.w}
              height={im.h}
              sizes="(min-width: 768px) 33vw, 50vw"
              className="h-auto w-full transition duration-[1.2s] ease-out group-hover:scale-[1.04]"
            />
            <span className="absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/15" />
          </motion.button>
        ))}
      </div>
      <Lightbox images={images} index={idx} onClose={() => setIdx(null)} onIndex={setIdx} label={label} />
    </>
  );
}
