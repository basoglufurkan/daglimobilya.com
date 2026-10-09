"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { founders, site } from "@/content/site";
import { easeLuxe } from "@/lib/motion";
import { FadeIn, RevealWords, SectionLabel } from "@/components/ui/Reveal";

const values = ["Zanaat", "Dürüst işçilik", "Ömürlük kalite", "Nesilden nesile"];

type Person = { name: string; role: string; initials: string };

function Monogram({ initials, size = "h-28 w-28" }: { initials: string; size?: string }) {
  return (
    <div className={`relative flex shrink-0 items-center justify-center ${size}`}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full text-brass transition-transform duration-[2000ms] ease-luxe group-hover:rotate-180" aria-hidden>
        <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 4" />
        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeOpacity="0.35" strokeWidth="0.6" />
      </svg>
      <span className="font-display text-4xl text-brass-light italic">{initials}</span>
    </div>
  );
}

function PersonCard({ person, index, delay, wide }: { person: Person; index: number; delay: number; wide?: boolean }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.2, delay, ease: easeLuxe }}
      className={`group relative overflow-hidden border border-ivory/12 bg-espresso/70 p-8 backdrop-blur-sm transition-colors duration-700 hover:border-brass/50 sm:p-10 ${
        wide ? "sm:col-span-2 sm:flex sm:items-center sm:gap-10" : ""
      }`}
    >
      <Monogram initials={person.initials} />
      <div className={wide ? "mt-10 sm:mt-0" : "mt-10"}>
        <h3 className="font-display text-3xl leading-tight font-light sm:text-[2.1rem]">{person.name}</h3>
        <p className="mt-3 flex items-center gap-3 text-[11px] font-semibold tracking-[0.22em] whitespace-nowrap text-brass-light uppercase xl:tracking-[0.3em]">
          <span className="h-px w-6 bg-brass-light/60" />
          {person.role}
        </p>
        {wide && (
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ivory/60">
            Atölyenin ustalığını ve değerlerini geleceğe taşıyor.
          </p>
        )}
      </div>
      <span className="absolute right-6 bottom-6 font-display text-6xl leading-none text-ivory/5 italic">
        0{index + 1}
      </span>
    </motion.article>
  );
}

export function Founders() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const textX = useTransform(scrollYProgress, [0, 1], ["10%", "-35%"]);

  return (
    <section id="hakkimizda" ref={ref} className="relative overflow-hidden bg-ink px-5 py-28 text-ivory sm:px-10 sm:py-40">
      <motion.div style={{ y: bgY }} className="absolute -inset-y-[20%] inset-x-0 opacity-25">
        <Image src={founders.image} alt="" fill sizes="100vw" className="object-cover grayscale" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/80 to-ink" />

      <motion.p
        aria-hidden
        style={{ x: textX }}
        className="text-outline pointer-events-none [--outline:rgba(214,184,134,0.18)] absolute top-1/2 left-0 -translate-y-1/2 font-display text-[28vw] leading-none whitespace-nowrap italic select-none"
      >
        Dağlı Ailesi
      </motion.p>

      <div className="relative">
        <SectionLabel index="07" light>
          Hakkımızda
        </SectionLabel>

        <div className="mt-10 grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <h2 className="font-display text-5xl leading-[0.95] font-light sm:text-7xl lg:text-8xl">
              <RevealWords text="Bir aile," />
              <br />
              <RevealWords text="tek imza." className="text-brass-light italic" delay={0.15} />
            </h2>
            <FadeIn delay={0.2} className="mt-10 max-w-lg text-[15px] leading-relaxed text-ivory/70">
              <p>{founders.text}</p>
            </FadeIn>
            <FadeIn delay={0.3} className="mt-10 flex flex-wrap gap-3">
              {values.map((v) => (
                <span key={v} className="rounded-full border border-ivory/20 px-5 py-2 text-[12px] tracking-[0.12em] text-ivory/80">
                  {v}
                </span>
              ))}
            </FadeIn>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-6 lg:col-start-7 lg:self-end">
            {site.founders.map((f, i) => (
              <PersonCard key={f.name} person={f} index={i} delay={i * 0.15} />
            ))}

            {/* Kuruculardan yeni nesle uzanan bağ */}
            <div aria-hidden className="relative -my-5 hidden h-20 sm:col-span-2 sm:block">
              <span className="absolute top-0 left-1/4 h-1/2 w-px bg-brass/40" />
              <span className="absolute top-0 right-1/4 h-1/2 w-px bg-brass/40" />
              <span className="absolute top-1/2 right-1/4 left-1/4 h-px bg-brass/40" />
              <span className="absolute top-1/2 left-1/2 h-1/2 w-px bg-brass/40" />
            </div>

            <PersonCard person={site.nextGeneration} index={2} delay={0.3} wide />
          </div>
        </div>
      </div>
    </section>
  );
}
