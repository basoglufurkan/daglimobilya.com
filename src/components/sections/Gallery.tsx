"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { gallery } from "@/content/site";
import { easeLuxe } from "@/lib/motion";
import { useScrollLock } from "@/lib/useScrollLock";
import { FadeIn, RevealWords, SectionLabel } from "@/components/ui/Reveal";

type Item = (typeof gallery)[number];

function Column({ items, y, className = "", onOpen }: { items: Item[]; y: MotionValue<string>; className?: string; onOpen: (item: Item) => void }) {
  return (
    <motion.div style={{ y }} className={`flex min-w-0 flex-1 flex-col gap-3 sm:gap-5 ${className}`}>
      {items.map((item) => (
        <button
          key={item.src}
          type="button"
          onClick={() => onOpen(item)}
          data-cursor="Büyüt"
          aria-label={`${item.alt} — büyüt`}
          className="group relative aspect-[3/4] w-full shrink-0 overflow-hidden bg-sand"
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="(min-width: 1024px) 33vw, 50vw"
            className="object-cover transition-transform duration-[1400ms] ease-luxe group-hover:scale-110"
          />
          <span className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-ink/80 to-transparent p-4 text-left text-sm text-ivory transition-transform duration-500 ease-luxe group-hover:translate-y-0">
            {item.alt}
          </span>
        </button>
      ))}
    </motion.div>
  );
}

export function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<Item | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const up = useTransform(scrollYProgress, [0, 1], ["0%", "-26%"]);
  const down = useTransform(scrollYProgress, [0, 1], ["-30%", "-4%"]);

  useScrollLock(open !== null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const thirds = [gallery.slice(0, 4), gallery.slice(4, 8), gallery.slice(8, 12)];
  const halves = [gallery.slice(0, 6), gallery.slice(6, 12)];

  return (
    <section id="projeler" className="relative bg-ivory py-28 sm:py-40">
      <div className="flex flex-col gap-8 px-5 sm:px-10 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <SectionLabel index="06">Mekânlar</SectionLabel>
          <h2 className="mt-6 font-display text-5xl leading-[0.95] font-light text-ink sm:text-6xl lg:text-7xl">
            <RevealWords text="Ahşabın dokunduğu" />
            <br />
            <RevealWords text="mekânlar." className="text-walnut italic" delay={0.15} />
          </h2>
        </div>
        <FadeIn className="max-w-sm text-[15px] leading-relaxed text-walnut/85">
          <p>
            Klasik oymalardan yalın modern çizgilere; her mekânın kendi diline uygun, ona ait
            hissettiren mobilyalar.
          </p>
        </FadeIn>
      </div>

      <div ref={ref} className="relative mt-16 h-[110vh] overflow-hidden px-3 sm:mt-20 sm:h-[150vh] sm:px-5 lg:h-[175vh]">
        <div className="flex h-full gap-3 sm:gap-5 lg:hidden">
          <Column items={halves[0]} y={up} onOpen={setOpen} />
          <Column items={halves[1]} y={down} onOpen={setOpen} />
        </div>
        <div className="hidden h-full gap-5 lg:flex">
          <Column items={thirds[0]} y={up} onOpen={setOpen} />
          <Column items={thirds[1]} y={down} onOpen={setOpen} />
          <Column items={thirds[2]} y={up} onOpen={setOpen} />
        </div>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ivory to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ivory to-transparent" />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={open.alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/92 p-5 backdrop-blur-sm sm:p-12"
          >
            <motion.div
              initial={{ scale: 0.92, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ duration: 0.6, ease: easeLuxe }}
              className="relative h-full w-full max-w-5xl"
            >
              <Image src={open.src} alt={open.alt} fill sizes="90vw" className="object-contain" />
            </motion.div>
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-display text-lg text-ivory/80 italic">{open.alt}</p>
            <button
              type="button"
              autoFocus
              onClick={() => setOpen(null)}
              className="absolute top-5 right-5 rounded-full border border-ivory/30 px-5 py-2.5 text-[11px] font-semibold tracking-[0.2em] text-ivory uppercase hover:bg-ivory hover:text-ink"
            >
              Kapat
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
