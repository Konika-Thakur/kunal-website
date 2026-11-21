import media from "./media.json";

export type Img = { src: string; w: number; h: number };
export const M = media as unknown as {
  wedding: Img[];
  property: Record<string, Img[]>;
  corporate: Img[];
  kunal: { portrait: Img; close: Img; full: Img; gallery: Img[] };
  posters: Record<string, Img & { title: string }>;
  video: Record<"showreel" | "wedding-loop" | "property-loop", Img & { poster: string }>;
};

export const studio = {
  name: "Odyra Studio",
  short: "ODYRA",
  tagline: "Cinematic films & photography — weddings, property, brands and events.",
  city: "Gurugram, India",
  reach: "Delhi-NCR · Pan India · International",
  phone: "+91 97706 89657",
  phoneRaw: "919770689657",
  email: "kunalnagiawork@gmail.com",
  instagram: "https://www.instagram.com/kunal_kussu",
  linkedin: "https://www.linkedin.com/in/kunalnagia",
  linktree: "https://linktr.ee/KUNALNAGIA",
};

export const whatsapp = (msg: string) =>
  `https://wa.me/${studio.phoneRaw}?text=${encodeURIComponent(msg)}`;

export const founder = {
  name: "Kunal Nagia",
  role: "Founder · Creative Director & Cinematographer",
  bio: [
    "Odyra Studio is led by Kunal Nagia — a cinematographer and creative director with 4+ years of crafting visually compelling content for luxury hotels, lifestyle brands, travel campaigns and weddings.",
    "He has directed 100+ projects across destination weddings, corporate shoots, fashion campaigns and brand films, collaborated with 50+ creators across India, and worked with hospitality names including ITC, Seclude Hotels and Eight Continents Hotels & Resorts.",
    "From concept and storyboard to drone work, lighting and the final grade, every frame is built end-to-end in-house.",
  ],
  experience: [
    {
      role: "Cinematographer & Content Creator",
      org: "Eight Continents Hotels & Resorts",
      when: "Oct 2024 — Present",
      where: "Gurugram / On-site",
      points: [
        "Leading content creation for a portfolio of luxury properties in India and Zanzibar.",
        "Cinematic property reels, guest-experience videos and festive campaign films.",
        "Drone cinematography, short-form social content and branded storytelling.",
      ],
    },
    {
      role: "Cinematographer & Photographer",
      org: "Seclude Hotels Home Style",
      when: "Apr 2023 — Sep 2024",
      where: "New Delhi / On-site",
      points: [
        "Property showcases and event coverage across boutique hotel locations.",
        "Camera, lighting, sound and edit for YouTube and Instagram content.",
      ],
    },
    {
      role: "Creative Director, Photographer & Cinematographer",
      org: "Freelance / Agency",
      when: "2020 — Present",
      where: "Delhi-NCR / Pan India",
      points: [
        "Directed 100+ projects — destination weddings, corporate shoots, fashion campaigns, brand films.",
        "Luxury lifestyle content with ITC Storii, Ahmedabad.",
        "50+ creator collaborations on influencer-driven projects and campaigns.",
      ],
    },
  ],
  skills: [
    "Cinematography", "Direction", "Drone Filming", "Storyboarding", "Lighting Design",
    "DaVinci Resolve", "Adobe Premiere Pro", "Adobe Lightroom", "Content Strategy", "Influencer Collaboration",
  ],
  gear: ["RED", "Blackmagic", "Sony FX line", "Canon", "Mirrorless & DSLR", "Drones"],
  education: "B.Com (Computer Application) · PIMR Gwalior · 2019 – 2022 · Grade A+",
};

export const stats = [
  { n: 100, s: "+", label: "Projects directed" },
  { n: 50, s: "+", label: "Creators collaborated" },
  { n: 4, s: "+", label: "Years behind the lens" },
  { n: 3, s: "", label: "Countries — India, Zanzibar & Scotland" },
];

export const brands = [
  "ITC Storii",
  "Eight Continents Hotels & Resorts",
  "Seclude Hotels",
  "Hyatt Regency Dehradun",
  "Lakmé Fashion Week",
  "TT Luxury Pret",
  "Sariska Astroport",
  "Kili Paul",
];

export type Category = {
  slug: string;
  href: string;
  title: string;
  kicker: string;
  blurb: string;
  cover: Img;
};

export const categories: Category[] = [
  {
    slug: "weddings",
    href: "/weddings",
    title: "Weddings",
    kicker: "01 — Love stories",
    blurb: "Cinematic wedding films and editorial photography — from haldi to pheras to the last dance.",
    cover: M.wedding[1],
  },
  {
    slug: "property",
    href: "/property",
    title: "Property & Hospitality",
    kicker: "02 — Spaces",
    blurb: "HDR interiors, aerials and walkthrough films for hotels, villas, homestays and real estate.",
    cover: M.property["sleepy-blue"][2],
  },
  {
    slug: "films",
    href: "/films",
    title: "Brand Films",
    kicker: "03 — Commercial",
    blurb: "Campaign films, social reels and music videos for fashion, hospitality and lifestyle brands.",
    cover: M.posters["1QHIfP2PRempgCgCoafq0531b-2RlhmpQ"],
  },
  {
    slug: "corporate",
    href: "/corporate",
    title: "Corporate & Events",
    kicker: "04 — Events",
    blurb: "Conferences, award nights, launches and leadership portraits — documented with a film eye.",
    cover: M.corporate[7],
  },
];

export type Film = {
  id: string; // stable key (original Drive id) or YouTube id
  title: string;
  sub: string;
  kind: "local" | "youtube";
  src?: string; // self-hosted web copy in public/media/films
  cover: Img;
  vertical?: boolean;
};

const p = (id: string) => M.posters[id];

/** Films are self-hosted: public/media/films/<slug>.mp4 (720p web copies). */
const slugify = (t: string) => t.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const local = (list: Film[]) => list.map((f) => (f.kind === "local" ? { ...f, src: `/media/films/${slugify(f.title)}.mp4` } : f));

export const weddingFilms: Film[] = local([
  { id: "1E9QKXtVwx0QsTOKRA9vRFwNKKB9UUNXx", title: "Lakhan & Neetu", sub: "Palace wedding film · Rajasthan", kind: "local", cover: p("1E9QKXtVwx0QsTOKRA9vRFwNKKB9UUNXx") },
  { id: "1s01wm6Vd4Idt4sz-D4cc4CHxt-uatVwd", title: "Najuka & Mohit", sub: "Beach-side wedding film", kind: "local", cover: p("1s01wm6Vd4Idt4sz-D4cc4CHxt-uatVwd") },
  { id: "1dIro7TpRscudG1PrzGBROkuz9pXsz0ry", title: "Thomas & Mandeep", sub: "Wedding film", kind: "local", cover: M.wedding[10] },
  { id: "1i2uP12UfFUKzpFUJCqNhcuuZ4YRyJIBV", title: "Ivory", sub: "Wedding reel", kind: "local", cover: p("1i2uP12UfFUKzpFUJCqNhcuuZ4YRyJIBV") },
  { id: "1KbJttGC1dBSdLwJXxHjfS2WqKPJ9y5wq", title: "Wedding Reel", sub: "Highlights", kind: "local", cover: M.wedding[22] },
]);

export const propertyFilms: Film[] = local([
  { id: "taychreggan-scotland", title: "Taychreggan Hotel, Scotland", sub: "Aerial property film · Scottish Highlands", kind: "local", cover: { src: "/media/films/taychreggan-poster.jpg", w: 1400, h: 788 } },
  { id: "1gMG7E6vUWlOdrgStRXRbmk3sY2Dj6JCg", title: "Hyatt Regency Dehradun", sub: "Resort & Spa — venue film", kind: "local", cover: p("1gMG7E6vUWlOdrgStRXRbmk3sY2Dj6JCg") },
  { id: "1uA-CCUgdcXoiMNsAgXwuceS4Hz3aWzw5", title: "Seclude Palampur", sub: "Property film", kind: "local", cover: p("1uA-CCUgdcXoiMNsAgXwuceS4Hz3aWzw5") },
  { id: "1LattIklym_OYDRnM3OZQM2zBVCMLCQsO", title: "Prelude II — Seclude Palampur", sub: "Brand teaser", kind: "local", cover: p("1LattIklym_OYDRnM3OZQM2zBVCMLCQsO") },
  { id: "1i5joCJ616VEFWZEhMatLpMhX99IdzGfQ", title: "Seclude Kasauli", sub: "Ad film · landscape", kind: "local", cover: p("1i5joCJ616VEFWZEhMatLpMhX99IdzGfQ") },
  { id: "1HoJ7ksEhhNBDhHQnhvWpHrP3tyIUC5kM", title: "Himachal Hillside", sub: "Aerial property film", kind: "local", cover: p("1HoJ7ksEhhNBDhHQnhvWpHrP3tyIUC5kM") },
  { id: "1mXvVLm2NCsC-CqzXH92-amEcx2rGROe5", title: "Seclude Shimla — Taraview", sub: "Homestay film", kind: "local", cover: M.property["sleepy-blue"][4] },
]);

export const brandFilms: Film[] = local([
  { id: "1QHIfP2PRempgCgCoafq0531b-2RlhmpQ", title: "Lakmé Fashion Week", sub: "Runway · Nexa", kind: "local", cover: p("1QHIfP2PRempgCgCoafq0531b-2RlhmpQ"), vertical: true },
  { id: "1q158TebMQJk5G_j8pZiQDy-mOPqk9FMv", title: "TT Luxury Pret", sub: "Autumn–Winter 2024", kind: "local", cover: p("1q158TebMQJk5G_j8pZiQDy-mOPqk9FMv"), vertical: true },
  { id: "1vbjcPjo-TARgVT2NHDU3ZT4AKADUzY6k", title: "Sariska Astroport", sub: "Wild meets luxury", kind: "local", cover: p("1vbjcPjo-TARgVT2NHDU3ZT4AKADUzY6k"), vertical: true },
  { id: "14PZCtnJ9rFYSN60pApjgsfi8CgQ_dpTd", title: "One Amiras, Udaipur", sub: "Luxury villa reel", kind: "local", cover: p("14PZCtnJ9rFYSN60pApjgsfi8CgQ_dpTd"), vertical: true },
  { id: "1CH_2F6lfF97hUm7aowBByKr58Ea_srBf", title: "Hanric Ikshana, Nainital", sub: "Hotel reel", kind: "local", cover: p("1CH_2F6lfF97hUm7aowBByKr58Ea_srBf"), vertical: true },
  { id: "1E_73QmuseJCmMYj3JpCBrpLDR_rkoXT3", title: "Bindi Yoga Retreat", sub: "Wellness reel", kind: "local", cover: p("1E_73QmuseJCmMYj3JpCBrpLDR_rkoXT3"), vertical: true },
  { id: "17yE6shHlim-0m7ymHCi_TpcOtjk2Z9Gk", title: "8C Café", sub: "F&B reel", kind: "local", cover: p("17yE6shHlim-0m7ymHCi_TpcOtjk2Z9Gk"), vertical: true },
  { id: "1p5nhUTo2FfcWfBzWwcnCup8kLxasalOg", title: "Satte — 32 Years", sub: "Brand anniversary reel", kind: "local", cover: p("1p5nhUTo2FfcWfBzWwcnCup8kLxasalOg"), vertical: true },
  { id: "1mJh5YOvCIapi_JCJVIy2kbl62jxWEo7J", title: "Seethal Group", sub: "Corporate brand reel", kind: "local", cover: p("1mJh5YOvCIapi_JCJVIy2kbl62jxWEo7J"), vertical: true },
]);

export const musicVideo: Film = {
  id: "irw-VWfudE0",
  title: "Kili Paul × Akil The Brain — Aja Aja",
  sub: "Official music video",
  kind: "youtube",
  cover: { src: "https://i.ytimg.com/vi/irw-VWfudE0/maxresdefault.jpg", w: 1280, h: 720 },
};

export const propertyProjects = [
  {
    key: "sleepy-blue",
    name: "Sleepy Blue",
    type: "Boutique stay · Hills",
    note: "A-frame suites, valley views and a bold blue-and-mustard palette — shot with HDR bracketing to hold both the interiors and the windows.",
    images: M.property["sleepy-blue"],
  },
  {
    key: "golden-lagoon",
    name: "Golden Lagoon",
    type: "Hotel · Rooms, rooftop & dining",
    note: "Full property coverage — room categories, rooftop terrace, lobby and the restaurant — for OTA listings and the brand website.",
    images: M.property["golden-lagoon"],
  },
  {
    key: "nahan",
    name: "Nahan Heritage",
    type: "Heritage property · Himachal",
    note: "Colonial verandahs, a garden gazebo at golden hour and suite-by-suite coverage of a heritage stay.",
    images: [...M.property["nahan-outdoor"], ...M.property["nahan-raanitaal"], ...M.property["nahan-shamsher"], ...M.property["hamilton-palace"]],
  },
  {
    key: "real-estate",
    name: "Residential Communities",
    type: "Real estate · Exteriors & interiors",
    note: "Pool decks, amenities and show-units edited to listing standard — bright, true-to-life and consistent across a full set.",
    images: M.property["real-estate"],
  },
];

export const nav = [
  { href: "/weddings", label: "Weddings" },
  { href: "/property", label: "Property" },
  { href: "/films", label: "Brand Films" },
  { href: "/corporate", label: "Corporate" },
  { href: "/about", label: "About" },
];
