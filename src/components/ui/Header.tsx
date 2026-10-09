"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useLenis } from "lenis/react";
import { contactLinks, nav, site } from "@/content/site";
import { easeCurtain, easeLuxe } from "@/lib/motion";
import { useScrollLock } from "@/lib/useScrollLock";
import { useIntro } from "@/components/providers/Providers";
import { Logo } from "./Logo";
import { ArrowUpRight, Instagram, WhatsApp } from "./Icons";

export function Header() {
  const { introDone } = useIntro();
  const { scrollY } = useScroll();
  const lenis = useLenis();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 60);
    setHidden(y > prev && y > 400 && !open);
  });

  useScrollLock(open);

  // Menü açıkken Lenis durdurulduğu için bağlantıya kaydırmayı burada elle yapıyoruz.
  const goTo = (target: string | number) => (e: MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    lenis?.start();
    lenis?.scrollTo(target);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: introDone ? (hidden ? -100 : 0) : -100, opacity: introDone ? 1 : 0 }}
        transition={{ duration: 0.8, ease: easeLuxe, delay: introDone && !solid ? 0.6 : 0 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={`mx-auto flex items-center justify-between px-5 transition-[background-color,padding,backdrop-filter] duration-500 sm:px-10 ${
            solid || open
              ? "bg-ink/75 py-3 text-ivory backdrop-blur-xl"
              : "bg-transparent py-6 text-ivory"
          }`}
        >
          <a href="#" aria-label={`${site.name} — Ana sayfa`} onClick={goTo(0)}>
            <Logo />
          </a>

          <nav aria-label="Ana menü" className="hidden lg:block">
            <ul className="flex items-center gap-6 xl:gap-9">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="group relative py-2 text-[13px] font-medium tracking-[0.08em] text-ivory/85 transition-colors hover:text-ivory"
                  >
                    {item.label}
                    <span className="absolute inset-x-0 -bottom-0.5 h-px origin-right scale-x-0 bg-brass transition-transform duration-500 ease-luxe group-hover:origin-left group-hover:scale-x-100" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#iletisim"
              className="group hidden items-center gap-2 rounded-full border border-brass/70 px-5 py-2.5 text-[12px] font-semibold tracking-[0.14em] text-ivory uppercase transition-colors duration-500 hover:bg-brass hover:text-ink sm:flex"
            >
              Randevu Al
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:rotate-45" />
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobil-menu"
              aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/25 lg:hidden"
            >
              <span className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 h-px w-5 bg-ivory transition-all duration-500 ease-luxe ${open ? "top-1.5 rotate-45" : "top-0"}`}
                />
                <span
                  className={`absolute left-0 h-px w-5 bg-ivory transition-all duration-500 ease-luxe ${open ? "top-1.5 -rotate-45" : "top-3"}`}
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobil-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.9, ease: easeCurtain }}
            className="fixed inset-0 z-40 flex flex-col bg-espresso px-5 pt-28 pb-8 text-ivory sm:px-10 lg:hidden"
          >
            <nav aria-label="Mobil menü" className="flex-1">
              <ul className="space-y-1">
                {nav.map((item, i) => (
                  <li key={item.href} className="overflow-hidden">
                    <motion.a
                      href={item.href}
                      onClick={goTo(item.href)}
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "100%" }}
                      transition={{ duration: 0.8, delay: 0.25 + i * 0.06, ease: easeLuxe }}
                      className="flex items-baseline gap-4 py-1 font-display text-5xl font-light sm:text-6xl"
                    >
                      <span className="font-sans text-xs text-brass">0{i + 1}</span>
                      {item.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-end justify-between border-t border-ivory/15 pt-6 text-sm text-ivory/70"
            >
              <div className="space-y-1">
                {contactLinks.phone && <a href={contactLinks.phone} className="block">{site.contact.phone}</a>}
                {contactLinks.email && <a href={contactLinks.email} className="block">{site.contact.email}</a>}
              </div>
              <div className="flex gap-3">
                {contactLinks.instagram && (
                  <a href={contactLinks.instagram} aria-label="Instagram" className="rounded-full border border-ivory/20 p-2.5">
                    <Instagram className="h-4 w-4" />
                  </a>
                )}
                {contactLinks.whatsapp && (
                  <a href={contactLinks.whatsapp} aria-label="WhatsApp" className="rounded-full border border-ivory/20 p-2.5">
                    <WhatsApp className="h-4 w-4" />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
