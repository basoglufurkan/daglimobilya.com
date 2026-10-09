"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { manifesto } from "@/content/site";
import { easeLuxe } from "@/lib/motion";
import { Counter } from "@/components/ui/Counter";
import { FadeIn, SectionLabel } from "@/components/ui/Reveal";

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.24em] inline-block">
      {children}
    </motion.span>
  );
}

/** Sayfa kaydırıldıkça kelimeleri sırayla aydınlatan paragraf. */
function ScrollLitText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = text.split(" ");
  return (
    <p
      ref={ref}
      className="relative font-display text-[2.15rem] leading-[1.12] font-light text-ink sm:text-5xl lg:text-[4.1vw]"
    >
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  );
}

export function Manifesto() {
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imageRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section id="atolye" className="relative bg-ivory px-5 py-28 sm:px-10 sm:py-40">
      <SectionLabel index="01">Atölye</SectionLabel>

      <div className="mt-10 max-w-[78rem] sm:mt-14">
        <ScrollLitText text={manifesto.text} />
      </div>

      <div className="mt-20 grid gap-14 sm:mt-28 lg:grid-cols-12 lg:gap-10">
        <motion.div
          ref={imageRef}
          initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
          whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{ duration: 1.5, ease: easeLuxe }}
          className="relative aspect-[4/5] overflow-hidden bg-sand lg:col-span-5"
          data-cursor="Usta"
        >
          <motion.div style={{ y: imageY }} className="absolute -inset-y-[14%] inset-x-0">
            <Image
              src={manifesto.image}
              alt="Ahşap üzerinde el aletiyle çalışan bir usta"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </motion.div>
          <span className="absolute bottom-5 left-5 rounded-full bg-ink/60 px-4 py-2 text-[10px] font-semibold tracking-[0.25em] text-ivory uppercase backdrop-blur">
            Her parça elde işlenir
          </span>
        </motion.div>

        <div className="flex flex-col justify-between lg:col-span-6 lg:col-start-7">
          <FadeIn className="max-w-lg text-[15px] leading-relaxed text-walnut/90">
            <p>
              Ahşap yaşayan bir malzemedir. Onu tanımak, nefes almasına izin vermek ve doğru
              birleştirmek ustalık ister. Atölyemizde ürettiğimiz her mobilya; seçilen kütükten
              son kat cilaya kadar aynı özenle, aynı ellerden geçer.
            </p>
          </FadeIn>

          <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 lg:mt-0">
            {manifesto.stats.map((s, i) => (
              <FadeIn key={s.label} delay={i * 0.1} className="border-t border-walnut/25 pt-5">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-6xl leading-none font-light text-ink sm:text-7xl">
                  {s.value !== undefined ? (
                    <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
                  ) : (
                    <em className="text-brass">{s.text}</em>
                  )}
                </dd>
                <dd className="mt-3 text-[13px] tracking-wide text-walnut/80">{s.label}</dd>
              </FadeIn>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
