# Kunal Nagia — Odyra Studio website

Next.js 15 + Tailwind + Framer Motion portfolio site for Kunal Nagia (Odyra Studio).

## What's in this repo

| Content | Location |
|---|---|
| Code | `src/app` (pages), `src/components`, config files in the root |
| Site data (text, films, contact, experience) | `src/data/site.ts`, `src/data/media.json` |
| **Data as a spreadsheet** | [`data/kunal-website-data.xlsx`](data/kunal-website-data.xlsx) — Studio, Founder, Experience, Stats, Brands, Navigation, Categories, Films, Property Projects, Media Library, All Assets |
| Logo / favicon | `src/app/icon.svg` |
| Images | `public/media/wedding`, `property`, `corporate`, `kunal`, `films` (posters) |
| Videos | `public/media/video` (hero loops, testimonial), `public/media/films` (wedding, property and brand films) |

The site has no database; all content lives in `src/data`. After editing it, regenerate the sheet:

```bash
node scripts/export-data.mjs
python scripts/build-data-sheet.py   # needs openpyxl
```

## Run locally

```bash
npm install
npm run dev
```
