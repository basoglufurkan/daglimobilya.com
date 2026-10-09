"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { hero } from "@/content/site";
import { useIntro } from "@/components/providers/Providers";
import { easeLuxe } from "@/lib/motion";
import { ArrowRight } from "@/components/ui/Icons";
import { Magnetic } from "@/components/ui/Magnetic";

function Line({ children, delay, play, className = "" }: { children: ReactNode; delay: number; play: boolean; className?: string }) {
  return (
    <span className={`block overflow-hidden pb-[0.06em] ${className}`}>
      <motion.span
        className="block"
        initial={{ y: "110%", rotate: 4 }}
        animate={play ? { y: 0, rotate: 0 } : undefined}
        transition={{ duration: 1.3, delay, ease: easeLuxe }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const { introDone } = useIntro();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: introDone ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 1.1, delay, ease: easeLuxe },
  });

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px] overflow-hidden bg-ink text-ivory">
      <motion.div style={{ y: imageY }} className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.35 }}
          animate={{ scale: introDone ? 1.06 : 1.35 }}
          transition={{ duration: 2.6, ease: easeLuxe }}
        >
          <Image
            src={hero.image}
            alt="Ahşap kapılar ve masif mobilyalarla döşenmiş lüks bir iç mekân"
            fill
            preload
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/35" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-transparent" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex h-full flex-col justify-end px-5 pb-8 sm:px-10 sm:pb-12"
      >
        <motion.p
          {...fade(0.3)}
          className="mb-6 flex items-center gap-3 text-[10px] font-semibold tracking-[0.2em] text-brass-light uppercase sm:text-[11px] sm:tracking-[0.32em]"
        >
          <span className="h-px w-10 bg-brass-light/60" />
          {hero.eyebrow}
        </motion.p>

        <h1 className="font-display text-[17vw] leading-[0.88] font-light tracking-[-0.01em] sm:text-[12vw] lg:text-[8.8vw]">
          <Line play={introDone} delay={0.1}>Ahşaba</Line>
          <Line play={introDone} delay={0.22} className="pl-[8vw] sm:pl-[14vw]">
            <em className="font-normal text-brass-light">ruh</em> veren
          </Line>
          <Line play={introDone} delay={0.34}>ustalık.</Line>
        </h1>

        <div className="mt-10 flex flex-col gap-8 sm:mt-12 lg:flex-row lg:items-end lg:justify-between">
          <motion.div {...fade(0.7)} className="max-w-md">
            <p className="text-[15px] leading-relaxed text-ivory/75">{hero.description}</p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Magnetic>
                <a
                  href="#koleksiyonlar"
                  className="group flex items-center gap-3 rounded-full bg-brass px-7 py-4 text-[12px] font-bold tracking-[0.16em] text-ink uppercase transition-colors duration-500 hover:bg-ivory"
                >
                  Koleksiyonları Keşfet
                  <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                </a>
              </Magnetic>
              <a
                href="#atolye"
                className="border-b border-ivory/40 pb-1 text-[12px] font-semibold tracking-[0.16em] uppercase transition-colors hover:border-brass hover:text-brass-light"
              >
                Atölyeyi Tanıyın
              </a>
            </div>
          </motion.div>

          <motion.a
            href="#atolye"
            aria-label="Aşağı kaydır"
            initial={{ opacity: 0, scale: 0.6, rotate: -90 }}
            animate={introDone ? { opacity: 1, scale: 1, rotate: 0 } : undefined}
            transition={{ duration: 1.4, delay: 0.9, ease: easeLuxe }}
            className="relative hidden h-36 w-36 shrink-0 items-center justify-center sm:flex"
          >
            <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full animate-[spin_22s_linear_infinite] text-ivory/80">
              <defs>
                <path id="hero-circle" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" />
              </defs>
              <text fontSize="14" fontWeight="600" letterSpacing="3" fill="currentColor">
                <textPath href="#hero-circle" textLength="500" lengthAdjust="spacing">
                  EL İŞÇİLİĞİ ✦ A KALİTE ✦ KİŞİYE ÖZEL ✦ MASİF AHŞAP ✦
                </textPath>
              </text>
            </svg>
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-brass/60 text-brass-light">
              <ArrowRight className="h-5 w-5 rotate-90" />
            </span>
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
