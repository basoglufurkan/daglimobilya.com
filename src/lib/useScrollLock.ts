"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";

// Birden fazla bileşen (açılış ekranı, menü, galeri) aynı anda kilit isteyebilir;
// kaydırma ancak hepsi kilidi bıraktığında yeniden başlar.
const locks = new Set<symbol>();

export function useScrollLock(locked: boolean) {
  const lenis = useLenis();
  const id = useRef(Symbol("scroll-lock"));

  useEffect(() => {
    if (!lenis) return;
    const key = id.current;
    if (locked) locks.add(key);
    if (locks.size) lenis.stop();
    else lenis.start();
    return () => {
      locks.delete(key);
      if (!locks.size) lenis.start();
    };
  }, [locked, lenis]);
}
