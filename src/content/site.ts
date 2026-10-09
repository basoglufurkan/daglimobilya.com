// Sitedeki tüm metinler, iletişim bilgileri ve görseller bu dosyada toplanır.
// "TODO" ile işaretli alanlar yer tutucudur; yayına almadan önce gerçek bilgilerle değiştirin.
// Görseller şimdilik Unsplash'ten (ücretsiz lisans) alınmıştır; atölyenin kendi proje
// fotoğraflarıyla değiştirilmeleri önerilir.

const unsplash = (id: string) => `https://images.unsplash.com/${id}`;

export const site = {
  name: "Dağlı Mobilya",
  tagline: "Kişiye özel, el işçiliği A kalite mobilya",
  description:
    "Dağlı Mobilya; lüks yaşam alanları için ölçüye özel, masif ahşaptan ve el işçiliğiyle A kalite mobilyalar ve çelik kapılar üretir.",
  year: 2026,
  founders: [
    { name: "Mustafa Kemal Dağlı", role: "Kurucu Ortak", initials: "MK" },
    { name: "Bülent Dağlı", role: "Kurucu Ortak", initials: "B" },
  ],
  nextGeneration: { name: "Mehmet Dağlı", role: "Yeni Nesil", initials: "M" },
  contact: {
    phone: "+90 5XX XXX XX XX", // TODO: gerçek telefon numarası
    phoneHref: "tel:+905000000000", // TODO
    whatsapp: "905000000000", // TODO: başında + olmadan, ülke koduyla (örn. 905321234567)
    email: "info@daglimobilya.com", // TODO: gerçek e-posta adresi
    address: "Atölye adresi buraya gelecek", // TODO
    hours: "Pazartesi – Cumartesi · 09:00 – 19:00", // TODO
    instagram: "#", // TODO: Instagram profil bağlantısı
  },
};

export const nav = [
  { label: "Koleksiyonlar", href: "#koleksiyonlar" },
  { label: "Çelik Kapı", href: "#celik-kapi" },
  { label: "Atölye", href: "#atolye" },
  { label: "Süreç", href: "#surec" },
  { label: "Malzemeler", href: "#malzemeler" },
  { label: "Hakkımızda", href: "#hakkimizda" },
  { label: "İletişim", href: "#iletisim" },
];

export const hero = {
  eyebrow: "Kişiye özel · El işçiliği · A kalite",
  description:
    "Lüks yaşam alanları için ölçüye özel, masif ahşaptan, tek tek elde üretilen mobilyalar. Atölyemizden çıkan her parça ustalarımızın imzasını taşır.",
  image: unsplash("photo-1618582383736-ed9080511254"),
};

export const marquee = [
  "Masif Ceviz",
  "El Oyması Detaylar",
  "Ölçüye Özel Üretim",
  "Çelik Kapı",
  "A Kalite İşçilik",
  "Kök Ceviz Kaplama",
  "Usta Marangozluk",
  "Lüks Yaşam Alanları",
];

export const manifesto = {
  text: "Biz bir fabrika değiliz. Dağlı Mobilya; ahşabın damarını okuyan, ölçüyü milimetresine kadar alan ve her birleşimi elle işleyen bir marangoz atölyesidir. Seri üretimin hızına değil, bir ömür kullanılacak mobilyanın sabrına inanıyoruz.",
  image: unsplash("photo-1705760058049-b58119c416a9"),
  stats: [
    { value: 2, label: "Kurucu usta, tek imza" },
    { value: 100, prefix: "%", label: "Ölçüye özel üretim" },
    { text: "A", label: "Kalite malzeme ve işçilik" },
    { value: 25, suffix: "+", label: "Yıllık tecrübe" }, // TODO: gerçek tecrübe yılı
  ] as { value?: number; text?: string; prefix?: string; suffix?: string; label: string }[],
};

export const collections = [
  {
    title: "Yatak Odası",
    subtitle: "Dinginliğin ustalıkla işlenmiş hali.",
    description:
      "Masif başlıklar, gömme dolaplar ve komodinler; odanızın ölçüsüne, ışığına ve ruhuna göre tasarlanır.",
    image: unsplash("photo-1566665797739-1674de7a421a"),
  },
  {
    title: "Yemek Odası",
    subtitle: "Sofranın etrafında bir ömür.",
    description:
      "Tek parça masif tablalı masalar, el işçiliği sandalyeler, konsollar ve vitrinler.",
    image: unsplash("photo-1683668612535-3a28bd898fa6"),
  },
  {
    title: "Salon & Oturma",
    subtitle: "Karakteri olan yaşam alanları.",
    description:
      "TV üniteleri, lambri duvarlar, kitaplıklar ve özel ölçü oturma grupları.",
    image: unsplash("photo-1599696848652-f0ff23bc911f"),
  },
  {
    title: "Mutfak",
    subtitle: "Her gün kullanılan bir sanat eseri.",
    description:
      "Ceviz ve meşe kapaklı, detaylarına kadar ölçüye özel üretilen mutfaklar.",
    image: unsplash("photo-1610733374054-59454fe657cd"),
  },
  {
    title: "Çalışma Odası",
    subtitle: "Odaklanmak için tasarlandı.",
    description:
      "Çalışma masaları, kütüphaneler ve mekâna özel depolama çözümleri.",
    image: unsplash("photo-1679309981674-cef0e23a7864"),
  },
  {
    title: "Giyinme Odası",
    subtitle: "Düzenin en zarif hali.",
    description:
      "Ölçüye özel giyinme odaları, gardıroplar ve vestiyerler.",
    image: unsplash("photo-1611048268330-53de574cae3b"),
  },
  {
    title: "Boiserie & Kapı",
    subtitle: "Mekâna kimlik kazandıran ahşap.",
    description:
      "El oyması lambriler, iç kapılar ve dekoratif ahşap duvar kaplamaları.",
    image: unsplash("photo-1775144657351-1708d0ea060d"),
  },
];

export const steelDoors = {
  text: "Evinizin girişini ilk bakışta tanımlayan çelik kapılar üretiyoruz. Güvenliği, mobilyalarımızdaki ahşap işçiliğiyle aynı özenle giydiriyor; kapınızın iç mekânla aynı dili konuşmasını sağlıyoruz.",
  features: [
    { title: "Ölçüye özel üretim", text: "Kapı boşluğunuza milimetrik ölçüyle üretilir." },
    { title: "Ahşap kaplama & panel seçenekleri", text: "Ceviz, meşe ve özel tasarım panellerle mekânınıza uyum sağlar." },
    { title: "Yerinde ölçü ve montaj", text: "Keşiften montaja kadar tüm süreç ekibimizle yürütülür." },
  ],
  image: unsplash("photo-1759646855074-7ddfafe29009"),
  detailImage: unsplash("photo-1616769619855-9e642faaa706"),
};

export const process = [
  {
    title: "Keşif & Ölçü",
    text: "Mekânınızı yerinde görür, ihtiyaçlarınızı dinler ve milimetrik ölçü alırız.",
    image: unsplash("photo-1659930087003-2d64e33181f7"),
  },
  {
    title: "Tasarım",
    text: "Fikirlerinizi çizime dökeriz; form, oran ve detaylar sizinle birlikte netleşir.",
    image: unsplash("photo-1590880795696-20c7dfadacde"),
  },
  {
    title: "Ahşap Seçimi",
    text: "Projeye en uygun masif ahşabı, damar ve renk uyumuna bakarak tek tek seçeriz.",
    image: unsplash("photo-1678184095759-db539ff697a2"),
  },
  {
    title: "El İşçiliği",
    text: "Kesimden birleşime, oymadan cilaya kadar her aşama ustalarımızın elinden geçer.",
    image: unsplash("photo-1497219055242-93359eeed651"),
  },
  {
    title: "Teslim & Montaj",
    text: "Mobilyalarınızı özenle taşır, yerinde kurar ve son kontrolü sizinle birlikte yaparız.",
    image: unsplash("photo-1703565426315-4209c2e88eea"),
  },
];

export const materials = [
  {
    name: "Ceviz",
    text: "Derin kahve tonları ve zarif damarlarıyla lüksün klasik ifadesi.",
    tone: "Koyu kahve",
    character: "Sıcak, asil",
    use: "Salon, yemek odası",
    image: unsplash("photo-1736506159776-22ca388780fa"),
  },
  {
    name: "Meşe",
    text: "Sağlam yapısı ve belirgin damarlarıyla nesiller boyu kullanım.",
    tone: "Bal – açık kahve",
    character: "Güçlü, doğal",
    use: "Mutfak, yatak odası",
    image: unsplash("photo-1736506159824-cb81cfd650db"),
  },
  {
    name: "Maun",
    text: "Kızıl tonlu, ince dokulu; klasik ve görkemli mekânların vazgeçilmezi.",
    tone: "Kızıl kahve",
    character: "Görkemli",
    use: "Kütüphane, çalışma odası",
    image: unsplash("photo-1621295693450-080546d2ec8e"),
  },
  {
    name: "Kök Ceviz",
    text: "Her levhası eşsiz desenlere sahip; imza parçalar için.",
    tone: "Desenli kahve",
    character: "Eşsiz",
    use: "Kaplama, özel parçalar",
    image: unsplash("photo-1697507695420-04623ccff2af"),
  },
];

export const gallery = [
  { src: unsplash("photo-1640357897497-599b4fc84f51"), alt: "Lambri duvarlı modern salon" },
  { src: unsplash("photo-1776090147407-f2308b4092cb"), alt: "El oyması ahşap lambri" },
  { src: unsplash("photo-1587985064135-0366536eab42"), alt: "Sıcak ışıklı yatak odası" },
  { src: unsplash("photo-1614066537969-7ae2fae81ace"), alt: "Ahşap sandalye detayı" },
  { src: unsplash("photo-1644057501622-dfa7dd26dbfb"), alt: "Koyu tonlu yatak odası" },
  { src: unsplash("photo-1785441513440-4426d4860ea1"), alt: "Ahşap kaplamalı şömine duvarı" },
  { src: unsplash("photo-1511189975737-b5939ef6a944"), alt: "Ceviz raf detayı" },
  { src: unsplash("photo-1656403002413-2ac6137237d6"), alt: "Ahşap duvarlı yemek alanı" },
  { src: unsplash("photo-1784254175578-e34c7d673db1"), alt: "Antika mobilyada oyma detay" },
  { src: unsplash("photo-1708397016786-8916880649b8"), alt: "Ölçüye özel giyinme odası" },
  { src: unsplash("photo-1705320678447-78c5fe2615a7"), alt: "Ceviz sandalye" },
  { src: unsplash("photo-1578683010236-d716f9a3f461"), alt: "Manzaralı yaşam alanı" },
];

export const founders = {
  text: "Dağlı Mobilya, abi kardeş Mustafa Kemal Dağlı ve Bülent Dağlı'nın ortaklığıyla kuruldu. Bugün bu ustalık, ailenin yeni nesli Mehmet Dağlı ile geleceğe taşınıyor. Marangozluğu bir zanaat olarak görüyor, atölyeden çıkan her parçanın arkasında duruyorlar.",
  image: unsplash("photo-1683115099191-51e617fc5ff1"),
};

export const cta = {
  image: unsplash("photo-1774803685883-6767138dd892"),
};
