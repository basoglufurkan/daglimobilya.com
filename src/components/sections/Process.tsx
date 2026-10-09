"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView, useScroll, useSpring } from "motion/react";
import { process } from "@/content/site";
import { easeCurtain, easeLuxe } from "@/lib/motion";
import { RevealWords, SectionLabel } from "@/components/ui/Reveal";

function Step({ index, title, text, image, onActive }: (typeof process)[number] & { index: number; onActive: (i: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <div ref={ref} className="flex min-h-[60vh] flex-col justify-center py-10 lg:min-h-[85vh]">
      <div className="relative mb-8 aspect-[4/3] overflow-hidden lg:hidden">
        <Image src={image} alt={title} fill sizes="100vw" className="object-cover" />
      </div>
      <motion.div
        animate={{ opacity: inView ? 1 : 0.3 }}
        transition={{ duration: 0.6 }}
        className="max-lg:opacity-100!"
      >
        <span className="font-display text-7xl leading-none font-light text-brass italic sm:text-8xl">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="mt-6 font-display text-4xl font-light text-ink sm:text-5xl">{title}</h3>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-walnut/85">{text}</p>
      </motion.div>
    </div>
  );
}

export function Process() {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start center", "end center"] });
  const line = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="surec" className="relative bg-sand px-5 py-28 sm:px-10 sm:py-40">
      <div className="max-w-3xl">
        <SectionLabel index="04">Süreç</SectionLabel>
        <h2 className="mt-6 font-display text-5xl leading-[0.95] font-light text-ink sm:text-6xl lg:text-7xl">
          <RevealWords text="Fikirden ömürlük" />
          <br />
          <RevealWords text="bir mobilyaya." className="text-walnut italic" delay={0.15} />
        </h2>
      </div>

      <div className="mt-16 grid gap-10 lg:mt-8 lg:grid-cols-12">
        <div className="hidden lg:col-span-6 lg:block">
          <div className="sticky top-0 flex h-screen items-center">
            <div className="relative aspect-[4/5] w-full max-w-xl overflow-hidden bg-walnut">
              {/* Görseller üst üste dizilir; aktif adıma kadar olanlar perde gibi açılır. */}
              {process.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={false}
                  animate={{
                    clipPath: i <= active ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
                    scale: i <= active ? 1 : 1.15,
                  }}
                  transition={{ duration: 1.1, ease: easeCurtain }}
                  className="absolute inset-0"
                >
                  <Image src={step.image} alt={step.title} fill sizes="45vw" className="object-cover" />
                </motion.div>
              ))}
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-ink/70 to-transparent p-6 text-ivory">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={active}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.5, ease: easeLuxe }}
                    className="font-display text-2xl italic"
                  >
                    {process[active].title}
                  </motion.span>
                </AnimatePresence>
                <span className="text-xs tracking-[0.25em] tabular-nums">
                  {String(active + 1).padStart(2, "0")} / {String(process.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div ref={listRef} className="relative lg:col-span-5 lg:col-start-8 lg:pl-12">
          <span className="absolute top-0 bottom-0 left-0 hidden w-px bg-walnut/20 lg:block" />
          <motion.span
            style={{ scaleY: line }}
            className="absolute top-0 bottom-0 left-0 hidden w-px origin-top bg-brass lg:block"
          />
          {process.map((step, i) => (
            <Step key={step.title} {...step} index={i} onActive={setActive} />
          ))}
        </div>
      </div>
    </section>
  );
}
