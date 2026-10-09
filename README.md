# Dağlı Mobilya — Web Sitesi

Dağlı Mobilya'nın tanıtım sitesi: kişiye özel, el işçiliği A kalite mobilyalar ve çelik kapılar.
Animasyonlu, tek sayfalık, Türkçe bir site.

## Teknolojiler

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- TypeScript
- Tailwind CSS 4
- [Motion](https://motion.dev) — animasyonlar
- [Lenis](https://lenis.darkroom.engineering) — yumuşak kaydırma

## Çalıştırma

```bash
npm install
npm run dev
```

Ardından tarayıcıda [http://localhost:3000](http://localhost:3000) adresini açın.

| Komut           | Açıklama                          |
| --------------- | --------------------------------- |
| `npm run dev`   | Geliştirme sunucusunu başlatır    |
| `npm run build` | Yayın için derleme alır           |
| `npm run start` | Derlenmiş siteyi çalıştırır       |
| `npm run lint`  | Kod kontrolü (ESLint)             |

## İçeriği düzenleme

Sitedeki tüm metinler, iletişim bilgileri ve görsel bağlantıları tek dosyada:
[`src/content/site.ts`](src/content/site.ts)

Yayına almadan önce bu dosyada `TODO` ile işaretli alanlar doldurulmalı:

- Telefon, WhatsApp numarası, e-posta, atölye adresi, çalışma saatleri, Instagram
- Yıllık tecrübe sayısı

Görseller şimdilik [Unsplash](https://unsplash.com) üzerinden alınan örnek fotoğraflardır;
atölyenin kendi proje fotoğraflarıyla değiştirilmelidir.

## Klasör yapısı

```
src/
  app/                 Sayfa düzeni, genel stiller, favicon
  components/
    sections/          Sayfa bölümleri (Hero, Koleksiyonlar, Çelik Kapı, Süreç ...)
    ui/                Ortak bileşenler (menü, imleç, açılış ekranı, animasyonlar)
    providers/         Yumuşak kaydırma ve animasyon ayarları
  content/site.ts      Tüm site içeriği
  lib/                 Yardımcılar (görsel yükleyici, kaydırma kilidi)
```
