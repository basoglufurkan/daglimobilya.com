"use client";

import { Fragment, type ReactNode } from "react";
import { motion } from "motion/react";
import { easeLuxe } from "@/lib/motion";

type WordsProps = {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  /** Verilirse görünürlük yerine bu değere göre oynar (örn. açılış animasyonu). */
  play?: boolean;
};

/** Metni kelimelere böler; her kelime maskenin altından yukarı kayarak belirir. */
export function RevealWords({ text, className, delay = 0, stagger = 0.05, play }: WordsProps) {
  const words = text.split(" ");
  // Görünürlük dıştaki kapsayıcıda izlenir; maskelenmiş kelimeler gözlemciye görünmez.
  const trigger =
    play !== undefined
      ? { animate: play ? "shown" : "hidden" }
      : { whileInView: "shown", viewport: { once: true, margin: "0px 0px -10% 0px" } };
  return (
    <motion.span className={className} initial="hidden" {...trigger}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((word, i) => (
          <Fragment key={i}>
            <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
              <motion.span
                className="inline-block"
                variants={{
                  hidden: { y: "110%" },
                  shown: { y: 0, transition: { duration: 1, delay: delay + i * stagger, ease: easeLuxe } },
                }}
              >
                {word}
              </motion.span>
            </span>
            {i < words.length - 1 && " "}
          </Fragment>
        ))}
      </span>
    </motion.span>
  );
}

type FadeProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

/** Görünür olduğunda hafifçe yukarı kayarak beliren kapsayıcı. */
export function FadeIn({ children, className, delay = 0, y = 40 }: FadeProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.1, delay, ease: easeLuxe }}
    >
      {children}
    </motion.div>
  );
}

/** Bölüm etiketi: "(01) — Atölye" */
export function SectionLabel({ index, children, light }: { index: string; children: ReactNode; light?: boolean }) {
  return (
    <FadeIn y={16} className={`flex items-center gap-3 text-[11px] font-semibold tracking-[0.3em] uppercase ${light ? "text-brass-light" : "text-walnut"}`}>
      <span className="font-display text-sm tracking-normal italic">({index})</span>
      <span className={`h-px w-10 ${light ? "bg-brass-light/50" : "bg-walnut/40"}`} />
      <span>{children}</span>
    </FadeIn>
  );
}
