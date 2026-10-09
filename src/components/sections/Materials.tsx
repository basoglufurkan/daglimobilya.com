"use client";

import { useState } from "react";
import Image from "next/image";
import { materials } from "@/content/site";
import { FadeIn, RevealWords, SectionLabel } from "@/components/ui/Reveal";

export function Materials() {
  const [active, setActive] = useState(0);

  return (
    <section id="malzemeler" className="relative bg-espresso px-5 py-28 text-ivory sm:px-10 sm:py-40">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <SectionLabel index="05" light>
            Malzemeler
          </SectionLabel>
          <h2 className="mt-6 font-display text-5xl leading-[0.95] font-light sm:text-6xl lg:text-7xl">
            <RevealWords text="Ahşap" />{" "}
            <RevealWords text="kütüphanemiz." className="text-brass-light italic" delay={0.1} />
          </h2>
        </div>
        <FadeIn className="max-w-sm text-[15px] leading-relaxed text-ivory/65">
          <p>
            Yalnızca kurutulmuş, seçkin masif ahşaplarla çalışıyoruz. Her türün kendine has dokusu,
            rengi ve karakteri projenize göre seçilir.
          </p>
        </FadeIn>
      </div>

      <FadeIn className="mt-14 flex h-[620px] flex-col gap-2 lg:mt-20 lg:h-[72vh] lg:flex-row">
        {materials.map((m, i) => {
          const isActive = i === active;
          return (
            <div
              key={m.name}
              onMouseEnter={() => setActive(i)}
              className={`group relative min-h-0 min-w-0 overflow-hidden transition-[flex-grow] duration-[900ms] ease-luxe ${
                isActive ? "flex-[5]" : "flex-[1]"
              }`}
            >
              <button
                type="button"
                onClick={() => setActive(i)}
                onFocus={() => setActive(i)}
                aria-expanded={isActive}
                aria-controls={`malzeme-${i}`}
                className="absolute inset-0 z-10 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-brass"
              >
                <span className="sr-only">{m.name}</span>
              </button>
              <Image
                src={m.image}
                alt={`${m.name} ahşap dokusu`}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className={`object-cover transition-transform duration-[1400ms] ease-luxe ${isActive ? "scale-100" : "scale-125"}`}
              />
              <div
                className={`absolute inset-0 transition-colors duration-700 ${isActive ? "bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" : "bg-ink/60 group-hover:bg-ink/45"}`}
              />

              {/* Kapalı panel: dikey başlık */}
              <span
                aria-hidden
                className={`absolute inset-0 flex items-center px-6 font-display text-2xl transition-opacity duration-500 lg:items-end lg:justify-center lg:px-0 lg:pb-8 ${
                  isActive ? "opacity-0" : "opacity-100"
                }`}
              >
                <span className="lg:rotate-180 lg:[writing-mode:vertical-rl]">
                  <span className="me-3 font-sans text-xs text-brass-light">0{i + 1}</span>
                  {m.name}
                </span>
              </span>

              {/* Açık panel: detaylar */}
              <div
                id={`malzeme-${i}`}
                className={`absolute inset-x-0 bottom-0 p-6 transition-all duration-700 ease-luxe sm:p-10 ${
                  isActive ? "translate-y-0 opacity-100 delay-300" : "pointer-events-none translate-y-6 opacity-0"
                }`}
              >
                <span className="font-display text-lg text-brass-light italic">0{i + 1}</span>
                <h3 className="font-display text-5xl leading-none font-light sm:text-7xl">{m.name}</h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-ivory/80 sm:text-[15px]">{m.text}</p>
                <dl className="mt-6 hidden max-w-xl grid-cols-3 gap-6 border-t border-ivory/20 pt-5 text-sm sm:grid">
                  {[
                    ["Ton", m.tone],
                    ["Karakter", m.character],
                    ["Kullanım", m.use],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-[10px] font-semibold tracking-[0.25em] text-brass-light uppercase">{k}</dt>
                      <dd className="mt-1 text-ivory/90">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          );
        })}
      </FadeIn>
    </section>
  );
}
