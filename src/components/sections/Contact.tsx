"use client";

import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { collections, site } from "@/content/site";
import { easeLuxe } from "@/lib/motion";
import { INTEREST_EVENT } from "./Collections";
import { Clock, Instagram, Mail, Phone, Pin, WhatsApp } from "@/components/ui/Icons";
import { FadeIn, RevealWords, SectionLabel } from "@/components/ui/Reveal";

const interestOptions = [...collections.map((c) => c.title), "Çelik Kapı", "Özel Tasarım"];

function Field({ id, label, type = "text", required, autoComplete }: { id: string; label: string; type?: string; required?: boolean; autoComplete?: string }) {
  return (
    <div className="relative">
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder=" "
        className="peer w-full border-b border-walnut/30 bg-transparent pt-6 pb-3 text-lg text-ink outline-none transition-colors focus:border-brass"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute top-6 left-0 origin-left text-walnut/70 transition-all duration-300 ease-luxe peer-focus:top-0 peer-focus:text-[11px] peer-focus:tracking-[0.2em] peer-focus:text-brass peer-focus:uppercase peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:tracking-[0.2em] peer-[:not(:placeholder-shown)]:uppercase"
      >
        {label}
        {required && " *"}
      </label>
    </div>
  );
}

export function Contact() {
  const [interests, setInterests] = useState<string[]>([]);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const onInterest = (e: Event) => {
      const title = (e as CustomEvent<string>).detail;
      setInterests((prev) => (prev.includes(title) ? prev : [...prev, title]));
    };
    window.addEventListener(INTEREST_EVENT, onInterest);
    return () => window.removeEventListener(INTEREST_EVENT, onInterest);
  }, []);

  const toggle = (title: string) =>
    setInterests((prev) => (prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]));

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const lines = [
      `Merhaba ${site.name},`,
      "",
      `Ad Soyad: ${data.get("ad")}`,
      `Telefon: ${data.get("telefon")}`,
      data.get("eposta") ? `E-posta: ${data.get("eposta")}` : null,
      interests.length ? `İlgilendiğim alanlar: ${interests.join(", ")}` : null,
      "",
      String(data.get("mesaj") || ""),
    ].filter((l) => l !== null);
    window.open(`https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener");
    setSent(true);
  };

  const info = [
    { icon: Phone, label: "Telefon", value: site.contact.phone, href: site.contact.phoneHref },
    { icon: Mail, label: "E-posta", value: site.contact.email, href: `mailto:${site.contact.email}` },
    { icon: Pin, label: "Atölye", value: site.contact.address },
    { icon: Clock, label: "Çalışma Saatleri", value: site.contact.hours },
  ];

  return (
    <section id="iletisim" className="relative bg-ivory px-5 py-28 sm:px-10 sm:py-40">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionLabel index="08">İletişim</SectionLabel>
          <h2 className="mt-6 font-display text-5xl leading-[0.95] font-light text-ink sm:text-6xl lg:text-7xl">
            <RevealWords text="Projenizi" />
            <br />
            <RevealWords text="konuşalım." className="text-walnut italic" delay={0.1} />
          </h2>
          <FadeIn className="mt-8 max-w-md text-[15px] leading-relaxed text-walnut/85">
            <p>
              Aklınızdaki mobilyayı, mekânınızı ve beklentilerinizi anlatın; size en kısa sürede
              dönüş yapalım.
            </p>
          </FadeIn>

          <ul className="mt-12 space-y-6">
            {info.map(({ icon: Icon, label, value, href }, i) => (
              <li key={label}>
                <FadeIn delay={i * 0.08} y={20} className="flex items-start gap-5 border-t border-walnut/15 pt-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-walnut/20 text-walnut">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-[10px] font-semibold tracking-[0.25em] text-walnut/60 uppercase">{label}</p>
                    {href ? (
                      <a href={href} className="mt-1 block text-lg text-ink transition-colors hover:text-brass">
                        {value}
                      </a>
                    ) : (
                      <p className="mt-1 text-lg text-ink">{value}</p>
                    )}
                  </div>
                </FadeIn>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex gap-3">
            <a href={site.contact.instagram} aria-label="Instagram" className="rounded-full border border-walnut/25 p-3 text-walnut transition-colors hover:border-brass hover:bg-brass hover:text-ink">
              <Instagram className="h-5 w-5" />
            </a>
            <a href={`https://wa.me/${site.contact.whatsapp}`} aria-label="WhatsApp" className="rounded-full border border-walnut/25 p-3 text-walnut transition-colors hover:border-brass hover:bg-brass hover:text-ink">
              <WhatsApp className="h-5 w-5" />
            </a>
          </div>
        </div>

        <FadeIn delay={0.15} className="lg:col-span-6 lg:col-start-7">
          <form onSubmit={onSubmit} className="bg-sand/60 p-6 sm:p-12">
            <div className="grid gap-8 sm:grid-cols-2">
              <Field id="ad" label="Ad Soyad" required autoComplete="name" />
              <Field id="telefon" label="Telefon" type="tel" required autoComplete="tel" />
              <div className="sm:col-span-2">
                <Field id="eposta" label="E-posta" type="email" autoComplete="email" />
              </div>
            </div>

            <fieldset className="mt-10">
              <legend className="text-[11px] font-semibold tracking-[0.2em] text-walnut/70 uppercase">İlgilendiğiniz alanlar</legend>
              <div className="mt-4 flex flex-wrap gap-2">
                {interestOptions.map((title) => {
                  const on = interests.includes(title);
                  return (
                    <button
                      key={title}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggle(title)}
                      className={`rounded-full border px-4 py-2 text-sm transition-all duration-300 ${
                        on ? "border-ink bg-ink text-ivory" : "border-walnut/25 text-walnut hover:border-walnut"
                      }`}
                    >
                      {title}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="relative mt-10">
              <textarea
                id="mesaj"
                name="mesaj"
                rows={4}
                placeholder=" "
                className="peer w-full resize-none border-b border-walnut/30 bg-transparent pt-6 pb-3 text-lg text-ink outline-none transition-colors focus:border-brass"
              />
              <label
                htmlFor="mesaj"
                className="pointer-events-none absolute top-6 left-0 text-walnut/70 transition-all duration-300 ease-luxe peer-focus:top-0 peer-focus:text-[11px] peer-focus:tracking-[0.2em] peer-focus:text-brass peer-focus:uppercase peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:tracking-[0.2em] peer-[:not(:placeholder-shown)]:uppercase"
              >
                Mesajınız
              </label>
            </div>

            <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                className="group flex items-center justify-center gap-3 rounded-full bg-ink px-8 py-4 text-[12px] font-bold tracking-[0.16em] text-ivory uppercase transition-colors duration-500 hover:bg-brass hover:text-ink"
              >
                <WhatsApp className="h-5 w-5" />
                WhatsApp ile Gönder
              </button>
              <p className="max-w-[16rem] text-xs leading-relaxed text-walnut/70">
                Gönder&apos;e bastığınızda mesajınız WhatsApp&apos;ta hazır olarak açılır.
              </p>
            </div>

            <AnimatePresence>
              {sent && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: easeLuxe }}
                  role="status"
                  className="mt-6 border-l-2 border-brass pl-4 text-sm text-walnut"
                >
                  Teşekkürler! WhatsApp penceresinde mesajınızı göndermeyi unutmayın.
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </FadeIn>
      </div>
    </section>
  );
}
