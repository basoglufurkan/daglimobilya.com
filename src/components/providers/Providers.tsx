"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { ReactLenis } from "lenis/react";
import { MotionConfig, useReducedMotion } from "motion/react";

type IntroState = { introDone: boolean; finishIntro: () => void };

const IntroContext = createContext<IntroState>({ introDone: true, finishIntro: () => {} });

/** Açılış animasyonu bittiğinde true olur; hero animasyonları buna göre başlar. */
export const useIntro = () => useContext(IntroContext);

export function Providers({ children }: { children: ReactNode }) {
  const [introDone, setIntroDone] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <MotionConfig reducedMotion="user">
      <ReactLenis
        root
        options={{ lerp: 0.085, smoothWheel: !reduceMotion, anchors: true }}
      >
        <IntroContext.Provider
          value={{ introDone, finishIntro: () => setIntroDone(true) }}
        >
          {children}
        </IntroContext.Provider>
      </ReactLenis>
    </MotionConfig>
  );
}
