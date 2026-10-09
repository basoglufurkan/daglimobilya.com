"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { collections } from "@/content/site";
import { ArrowRight, ArrowUpRight } from "@/components/ui/Icons";
import { Magnetic } from "@/components/ui/Magnetic";
import { RevealWords, SectionLabel } from "@/components/ui/Reveal";

/** İletişim formunda ilgili alanı önceden seçmek için yayınlanan olay. */
export const INTEREST_EVENT = "dagli:interest";

export function Collections() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const distance = useRef(0);
  const [height, setHeight] = useState<number>();
  const [active, setActive] = useState(1);
  const x = useMotionValue(0);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });

  // Masaüstünde dikey kaydırma, kartları yatay olarak kaydırır.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      const desktop = window.matchMedia("(min-width: 1024px)").matches;
      distance.current = desktop ? Math.max(0, track.scrollWidth - window.innerWidth) : 0;
      setHeight(desktop ? distance.current + window.innerHeight : undefined);
      x.set(-scrollYProgress.get() * distance.current);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [x, scrollYProgress]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    x.set(-v * distance.current);
    setActive(Math.min(collections.length, Math.floor(v * collections.length) + 1));
  });

  return (
    <section
      id="koleksiyonlar"
      ref={sectionRef}
      style={{ height }}
      className="relative bg-ink text-ivory"
    >
      <div className="flex flex-col justify-center py-24 sm:py-32 lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden lg:py-0">
        <div className="mb-10 flex flex-col gap-8 px-5 sm:px-10 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionLabel index="02" light>
              Koleksiyonlar
            </SectionLabel>
            <h2 className="mt-6 font-display text-5xl leading-[0.95] font-light sm:text-6xl lg:text-7xl">
              <RevealWords text="Yaşamın her odası için" />
              <br />
              <RevealWords text="ölçüye özel." className="text-brass-light italic" delay={0.2} />
            </h2>
          </div>
          <div className="hidden items-center gap-6 lg:flex">
            <span className="font-display text-2xl tabular-nums">
              {String(active).padStart(2, "0")}
              <span className="text-ivory/40"> / {String(collections.length).padStart(2, "0")}</span>
            </span>
            <span className="relative h-px w-48 bg-ivory/15">
              <motion.span style={{ scaleX: progress }} className="absolute inset-0 origin-left bg-brass" />
            </span>
          </div>
        </div>

        <div className="no-scrollbar snap-x snap-mandatory overflow-x-auto lg:snap-none lg:overflow-visible" data-lenis-prevent-horizontal>
          <motion.div ref={trackRef} style={{ x }} className="flex w-max gap-4 px-5 sm:gap-6 sm:px-10">
            {collections.map((c, i) => (
              <a
                key={c.title}
                href="#iletisim"
                onClick={() => window.dispatchEvent(new CustomEvent(INTEREST_EVENT, { detail: c.title }))}
                data-cursor="Teklif Al"
                className="group relative block aspect-[3/4] w-[80vw] shrink-0 snap-start overflow-hidden bg-espresso sm:w-[52vw] lg:aspect-auto lg:h-[64vh] lg:w-[34vw] xl:w-[30vw]"
              >
                <Image
                  src={c.image}
                  alt={`${c.title} koleksiyonu`}
                  fill
                  sizes="(min-width: 1024px) 34vw, 80vw"
                  className="object-cover transition-transform duration-[1600ms] ease-luxe group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/25 to-ink/10 transition-opacity duration-700 group-hover:opacity-90" />

                <div className="absolute inset-x-0 top-0 flex items-start justify-between p-6 sm:p-8">
                  <span className="font-display text-xl text-brass-light italic">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/30 transition-all duration-500 group-hover:rotate-45 group-hover:border-brass group-hover:bg-brass group-hover:text-ink">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <h3 className="font-display text-4xl leading-none font-light sm:text-5xl">{c.title}</h3>
                  <p className="mt-3 font-display text-lg text-brass-light italic">{c.subtitle}</p>
                  <div className="grid transition-all duration-700 ease-luxe lg:grid-rows-[0fr] lg:opacity-0 lg:group-hover:grid-rows-[1fr] lg:group-hover:opacity-100">
                    <p className="overflow-hidden pt-3 text-sm leading-relaxed text-ivory/75">{c.description}</p>
                  </div>
                </div>
              </a>
            ))}

            <div className="flex aspect-[3/4] w-[80vw] shrink-0 snap-start flex-col justify-between border border-ivory/15 p-8 sm:w-[52vw] lg:aspect-auto lg:h-[64vh] lg:w-[30vw]">
              <p className="text-[11px] font-semibold tracking-[0.3em] text-brass-light uppercase">Özel Tasarım</p>
              <p className="font-display text-4xl leading-tight font-light sm:text-5xl">
                Aklınızdaki tasarımı <em className="text-brass-light">birlikte</em> hayata geçirelim.
              </p>
              <Magnetic className="self-start">
                <a
                  href="#iletisim"
                  className="flex h-28 w-28 flex-col items-center justify-center gap-1 rounded-full bg-brass text-[11px] font-bold tracking-[0.15em] text-ink uppercase transition-colors duration-500 hover:bg-ivory"
                >
                  <ArrowRight className="h-5 w-5" />
                  Bize Yazın
                </a>
              </Magnetic>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
