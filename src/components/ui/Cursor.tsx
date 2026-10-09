"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

type Mode = "default" | "link" | "view";

const QUERIES = ["(pointer: fine)", "(prefers-reduced-motion: no-preference)"];

function subscribe(onChange: () => void) {
  const lists = QUERIES.map((q) => window.matchMedia(q));
  lists.forEach((l) => l.addEventListener("change", onChange));
  return () => lists.forEach((l) => l.removeEventListener("change", onChange));
}

const canUseCursor = () => QUERIES.every((q) => window.matchMedia(q).matches);

/**
 * Masaüstünde yerel imlecin yerine geçen nokta + halka.
 * `data-cursor="Metin"` taşıyan öğelerin üzerinde halka büyür ve metni gösterir.
 */
export function Cursor() {
  const enabled = useSyncExternalStore(subscribe, canUseCursor, () => false);
  const [mode, setMode] = useState<Mode>("default");
  const [label, setLabel] = useState("");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 380, damping: 32, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 380, damping: 32, mass: 0.6 });

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-cursor");

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = (e.target as Element | null)?.closest?.(
        "[data-cursor], a, button, label, select, [role='button']",
      );
      if (!target) {
        setMode("default");
      } else if (target.hasAttribute("data-cursor")) {
        setMode("view");
        setLabel(target.getAttribute("data-cursor") ?? "");
      } else {
        setMode("link");
      }
    };
    const onLeave = () => {
      x.set(-100);
      y.set(-100);
    };

    window.addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const size = mode === "view" ? 96 : mode === "link" ? 54 : 34;

  return (
    <>
      <motion.div
        aria-hidden
        style={{ x, y }}
        className="pointer-events-none fixed top-0 left-0 z-[100]"
      >
        <motion.div
          animate={{ scale: mode === "default" ? 1 : 0 }}
          className="h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brass"
        />
      </motion.div>
      <motion.div
        aria-hidden
        style={{ x: ringX, y: ringY }}
        className="pointer-events-none fixed top-0 left-0 z-[99]"
      >
        <motion.div
          animate={{ width: size, height: size }}
          transition={{ type: "spring", stiffness: 300, damping: 26 }}
          className={`flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-[10px] font-semibold tracking-[0.2em] uppercase transition-colors duration-300 ${
            mode === "view"
              ? "border-brass bg-brass text-ink"
              : mode === "link"
                ? "border-brass bg-brass/15"
                : "border-brass/60"
          }`}
        >
          {mode === "view" && label}
        </motion.div>
      </motion.div>
    </>
  );
}
