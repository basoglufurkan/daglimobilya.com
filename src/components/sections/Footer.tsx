"use client";

import { motion } from "motion/react";
import { useLenis } from "lenis/react";
import { nav, site } from "@/content/site";
import { easeLuxe } from "@/lib/motion";
import { Logo } from "@/components/ui/Logo";
import { ArrowUp, Instagram, WhatsApp } from "@/components/ui/Icons";

const letters = "DAĞLI".split("");

export function Footer() {
  const lenis = useLenis();

  return (
    <footer className="relative overflow-hidden bg-ink px-5 pt-24 text-ivory sm:px-10 sm:pt-32">
      <div className="grid gap-12 border-b border-ivory/10 pb-16 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-ivory/55">{site.tagline}. Lüks yaşam alanları için ölçüye özel üretim.</p>
        </div>

        <div className="lg:col-span-3 lg:col-start-5">
          <p className="text-[10px] font-semibold tracking-[0.3em] text-brass-light uppercase">Menü</p>
          <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-ivory/75">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="transition-colors hover:text-brass-light">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <p className="text-[10px] font-semibold tracking-[0.3em] text-brass-light uppercase">İletişim</p>
          <ul className="mt-5 space-y-3 text-sm text-ivory/75">
            <li>
              <a href={site.contact.phoneHref} className="transition-colors hover:text-brass-light">{site.contact.phone}</a>
            </li>
            <li>
              <a href={`mailto:${site.contact.email}`} className="transition-colors hover:text-brass-light">{site.contact.email}</a>
            </li>
            <li>{site.contact.address}</li>
          </ul>
        </div>

        <div className="flex gap-3 lg:col-span-2 lg:justify-end">
          <a href={site.contact.instagram} aria-label="Instagram" className="h-fit rounded-full border border-ivory/20 p-3 transition-colors hover:border-brass hover:bg-brass hover:text-ink">
            <Instagram className="h-5 w-5" />
          </a>
          <a href={`https://wa.me/${site.contact.whatsapp}`} aria-label="WhatsApp" className="h-fit rounded-full border border-ivory/20 p-3 transition-colors hover:border-brass hover:bg-brass hover:text-ink">
            <WhatsApp className="h-5 w-5" />
          </a>
        </div>
      </div>

      <div aria-hidden className="flex justify-between overflow-hidden pt-6 font-display text-[27vw] leading-[0.8] font-light select-none">
        {letters.map((l, i) => (
          <motion.span
            key={i}
            initial={{ y: "100%" }}
            whileInView={{ y: "8%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: i * 0.08, ease: easeLuxe }}
            className="inline-block bg-gradient-to-b from-brass-light to-walnut bg-clip-text text-transparent"
          >
            {l}
          </motion.span>
        ))}
      </div>

      <div className="flex flex-col items-start justify-between gap-4 border-t border-ivory/10 py-6 text-xs text-ivory/50 sm:flex-row sm:items-center">
        <p>© {site.year} {site.name}. Tüm hakları saklıdır.</p>
        <p className="font-display text-sm italic">Atölyede, elle üretilir.</p>
        <button
          type="button"
          onClick={() => lenis?.scrollTo(0, { duration: 2 })}
          className="flex items-center gap-2 tracking-[0.2em] uppercase transition-colors hover:text-brass-light"
        >
          Yukarı Çık <ArrowUp className="h-4 w-4" />
        </button>
      </div>
    </footer>
  );
}
