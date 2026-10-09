import { marquee } from "@/content/site";
import { Header } from "@/components/ui/Header";
import { Marquee } from "@/components/ui/Marquee";
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { Collections } from "@/components/sections/Collections";
import { SteelDoors } from "@/components/sections/SteelDoors";
import { Process } from "@/components/sections/Process";
import { Materials } from "@/components/sections/Materials";
import { Gallery } from "@/components/sections/Gallery";
import { Founders } from "@/components/sections/Founders";
import { CallToAction } from "@/components/sections/CallToAction";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee
          items={marquee}
          className="border-y border-ivory/10 bg-ink py-6 font-display text-4xl font-light text-ivory italic sm:py-8 sm:text-6xl"
        />
        <Manifesto />
        <Collections />
        <SteelDoors />
        <Process />
        <Materials />
        <Gallery />
        <Founders />
        <CallToAction />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
