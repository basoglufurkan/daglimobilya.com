"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { steelDoors } from "@/content/site";
import { INTEREST_EVENT } from "./Collections";
import { ArrowRight } from "@/components/ui/Icons";
import { Magnetic } from "@/components/ui/Magnetic";
import { FadeIn, RevealWords, SectionLabel } from "@/components/ui/Reveal";

function DoorLeaf({ side, rotate, opacity }: { side: "left" | "right"; rotate: MotionValue<number>; opacity: MotionValue<number> }) {
  const left = side === "left";
  return (
    <motion.div
      aria-hidden
      style={{ rotateY: rotate, opacity }}
      className={`steel absolute inset-y-0 w-1/2 ${left ? "left-0 origin-left" : "right-0 origin-right"}`}
    >
      <div className="absolute inset-5 border border-brass/25 sm:inset-8">
        <div className="absolute inset-x-5 top-6 bottom-6 border border-ivory/5 sm:inset-x-8" />
      </div>
      <span
        className={`absolute top-1/2 h-28 w-1.5 -translate-y-1/2 rounded-full bg-gradient-to-b from-brass-light via-brass to-walnut shadow-[0_0_12px_rgba(184,146,90,0.35)] ${
          left ? "right-5" : "left-5"
        }`}
      />
      {left && (
        <span className="absolute top-10 left-1/2 -translate-x-1/2 font-display text-2xl text-brass-light/70 italic sm:top-14">D</span>
      )}
    </motion.div>
  );
}

export function SteelDoors() {
  const doorRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: doorRef, offset: ["start 0.85", "center 0.45"] });
  const leftRotate = useTransform(scrollYProgress, [0, 1], [0, -92]);
  const rightRotate = useTransform(scrollYProgress, [0, 1], [0, 92]);
  const leafOpacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 1, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.25, 1]);

  return (
    <section id="celik-kapi" className="relative overflow-hidden bg-espresso px-5 py-28 text-ivory sm:px-10 sm:py-40">
      <div className="grid gap-20 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="relative lg:col-span-6">
          {/* İki kanat, kaydırdıkça kapı gibi açılarak arkadaki görseli gösterir. */}
          <div ref={doorRef} className="relative aspect-[4/5] overflow-hidden bg-ink [perspective:1800px]">
            <motion.div style={{ scale: imageScale }} className="absolute inset-0">
              <Image
                src={steelDoors.image}
                alt="Altın detaylı siyah çelik giriş kapısı"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </motion.div>
            <DoorLeaf side="left" rotate={leftRotate} opacity={leafOpacity} />
            <DoorLeaf side="right" rotate={rightRotate} opacity={leafOpacity} />
          </div>

          <FadeIn delay={0.2} className="absolute -right-2 -bottom-12 hidden w-40 sm:block lg:-right-8 lg:w-48">
            <div className="relative aspect-[3/4] overflow-hidden border-[6px] border-espresso">
              <Image
                src={steelDoors.detailImage}
                alt="Siyah kapı üzerinde pirinç kapı kolu detayı"
                fill
                sizes="200px"
                className="object-cover"
              />
            </div>
          </FadeIn>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <SectionLabel index="03" light>
            Çelik Kapı
          </SectionLabel>
          <h2 className="mt-6 font-display text-5xl leading-[0.95] font-light sm:text-6xl lg:text-7xl">
            <RevealWords text="Evinizin ilk" />
            <br />
            <RevealWords text="imzası." className="text-brass-light italic" delay={0.15} />
          </h2>
          <FadeIn className="mt-8 max-w-lg text-[15px] leading-relaxed text-ivory/70">
            <p>{steelDoors.text}</p>
          </FadeIn>

          <ul className="mt-12 border-b border-ivory/10">
            {steelDoors.features.map((f, i) => (
              <li key={f.title}>
                <FadeIn delay={i * 0.1} y={20} className="flex gap-6 border-t border-ivory/10 py-6">
                  <span className="font-display text-xl text-brass-light italic">0{i + 1}</span>
                  <div>
                    <h3 className="font-display text-2xl font-light">{f.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ivory/60">{f.text}</p>
                  </div>
                </FadeIn>
              </li>
            ))}
          </ul>

          <FadeIn delay={0.2} className="mt-12">
            <Magnetic className="inline-block">
              <a
                href="#iletisim"
                onClick={() => window.dispatchEvent(new CustomEvent(INTEREST_EVENT, { detail: "Çelik Kapı" }))}
                className="group flex items-center gap-3 rounded-full bg-brass px-7 py-4 text-[12px] font-bold tracking-[0.16em] text-ink uppercase transition-colors duration-500 hover:bg-ivory"
              >
                Çelik Kapı için Teklif Alın
                <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
              </a>
            </Magnetic>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
