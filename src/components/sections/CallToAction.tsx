"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { cta } from "@/content/site";
import { Magnetic } from "@/components/ui/Magnetic";
import { ArrowUpRight } from "@/components/ui/Icons";
import { RevealWords } from "@/components/ui/Reveal";

export function CallToAction() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5], [1.35, 1]);
  const clip = useTransform(scrollYProgress, [0, 0.4], ["inset(12% 10% 12% 10%)", "inset(0% 0% 0% 0%)"]);

  return (
    <section ref={ref} className="relative bg-ivory">
      <motion.div style={{ clipPath: clip }} className="relative flex h-[100svh] min-h-[600px] items-center justify-center overflow-hidden bg-ink text-ivory">
        <motion.div style={{ scale }} className="absolute inset-0">
          <Image src={cta.image} alt="Ahşap işçiliğiyle döşenmiş görkemli bir salon" fill sizes="100vw" className="object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-ink/65" />

        <div className="relative flex flex-col items-center px-5 text-center">
          <p className="text-[11px] font-semibold tracking-[0.35em] text-brass-light uppercase">Randevu & Keşif</p>
          <h2 className="mt-8 font-display text-[12vw] leading-[0.92] font-light sm:text-7xl lg:text-[7vw]">
            <RevealWords text="Hayalinizdeki mobilyayı" />
            <br />
            <RevealWords text="birlikte tasarlayalım." className="text-brass-light italic" delay={0.2} />
          </h2>
          <p className="mt-8 max-w-md text-[15px] leading-relaxed text-ivory/75">
            Atölyemizi ziyaret edin ya da mekânınızda keşif için randevu alın; projenizi birlikte
            planlayalım.
          </p>
          <Magnetic className="mt-12" strength={0.45}>
            <a
              href="#iletisim"
              className="group flex h-36 w-36 flex-col items-center justify-center gap-2 rounded-full bg-brass text-[12px] font-bold tracking-[0.16em] text-ink uppercase transition-colors duration-500 hover:bg-ivory sm:h-40 sm:w-40"
            >
              <ArrowUpRight className="h-6 w-6 transition-transform duration-500 group-hover:rotate-45" />
              Randevu Al
            </a>
          </Magnetic>
        </div>
      </motion.div>
    </section>
  );
}
