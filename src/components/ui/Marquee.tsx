"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "motion/react";

type Props = {
  items: string[];
  /** Saniyede kayılan yüzde (negatif: sola) */
  speed?: number;
  className?: string;
};

/** Sonsuz kayan yazı şeridi; sayfa kaydırma hızına göre hızlanır ve yön değiştirir. */
export function Marquee({ items, speed = -2.5, className }: Props) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(velocity, [-1000, 0, 1000], [-4, 0, 4], { clamp: false });
  const direction = useRef(1);
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    let move = direction.current * speed * (delta / 1000);
    const f = factor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    move += move * Math.abs(f);
    baseX.set(baseX.get() + move);
  });

  const row = (
    <span className="flex shrink-0 items-center">
      {items.map((item) => (
        <span key={item} className="flex items-center">
          <span className="px-6 sm:px-10">{item}</span>
          <svg viewBox="0 0 24 24" className="h-[0.35em] w-[0.35em] fill-brass" aria-hidden>
            <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" />
          </svg>
        </span>
      ))}
    </span>
  );

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className ?? ""}`} aria-label={items.join(", ")}>
      <motion.div className="flex w-max" style={{ x }} aria-hidden>
        {row}
        {row}
        {row}
        {row}
      </motion.div>
    </div>
  );
}
