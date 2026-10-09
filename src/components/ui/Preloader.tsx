"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, animate, motion, useReducedMotion } from "motion/react";
import { useIntro } from "@/components/providers/Providers";
import { easeCurtain, easeLuxe } from "@/lib/motion";
import { useScrollLock } from "@/lib/useScrollLock";

const letters = "DAĞLI".split("");

export function Preloader() {
  const { finishIntro } = useIntro();
  const reduceMotion = useReducedMotion();
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);

  useScrollLock(visible);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const controls = animate(0, 100, {
      duration: reduceMotion ? 0 : 1.9,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => {
        timeout = setTimeout(() => {
          setVisible(false);
          finishIntro();
        }, reduceMotion ? 0 : 250);
      },
    });
    return () => {
      controls.stop();
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          className="preloader fixed inset-0 z-[90] flex flex-col bg-ink text-ivory"
          exit={{ y: "-100%" }}
          transition={{ duration: 1.1, ease: easeCurtain }}
        >
          <motion.div
            className="flex flex-1 flex-col items-center justify-center"
            exit={{ opacity: 0, y: -60 }}
            transition={{ duration: 0.6, ease: easeLuxe }}
          >
            <div className="flex overflow-hidden font-display text-[22vw] leading-[0.85] font-light tracking-[0.04em] sm:text-[14vw] lg:text-[11vw]">
              {letters.map((l, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, delay: 0.15 + i * 0.07, ease: easeLuxe }}
                  className="inline-block"
                >
                  {l}
                </motion.span>
              ))}
            </div>
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.2em" }}
              animate={{ opacity: 1, letterSpacing: "0.6em" }}
              transition={{ duration: 1.4, delay: 0.6, ease: easeLuxe }}
              className="mt-4 pl-[0.6em] text-xs font-medium text-brass-light sm:text-sm"
            >
              MOBİLYA
            </motion.p>
          </motion.div>

          <div className="flex items-end justify-between px-5 pb-6 sm:px-10 sm:pb-10">
            <p className="max-w-[12rem] text-[11px] tracking-[0.25em] text-stone uppercase">
              El işçiliği · A kalite
            </p>
            <p className="font-display text-6xl leading-none font-light tabular-nums sm:text-8xl">
              {String(count).padStart(3, "0")}
            </p>
          </div>
          <div className="h-px w-full bg-walnut">
            <div className="h-full bg-brass" style={{ width: `${count}%` }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
