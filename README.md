# Hodiy Avto

Avtosalon veb-sayti — avtomobillar katalogi, batafsil sahifalar, sevimlilar, kontakt, AI chat va admin panel.

## Tech Stack

- React 19 + TypeScript + Vite
- React Router
- react-i18next (uz / ru / en)
- Swiper (Hero slayder)
- Vercel deploy (SPA rewrite + `/sitemap.xml` via `api/sitemap.ts`)

## Sozlash

```bash
npm install
npm run dev
```

Backend API URL va admin hisob `VITE_API_URL`, `VITE_ADMIN_EMAIL`, `VITE_ADMIN_PASSWORD`
o'zgaruvchilari bilan beriladi (qarang: `.env.example`).

## Skriptlar

```bash
npm run dev      # lokal server
npm run build    # tsc + vite build
npm run lint     # eslint
npm run preview  # build natijasini ko'rsatish
```

## Sahifalar

- `/` — bosh sahifa (Hero, avtomobillar katalogi, About, Contact)
- `/cars/:id` — avtomobil batafsil
- `/favorites` — sevimlilar
- `/contact`, `/about`, `/ai-chat`, `/login`
- `/admin` — admin panel (Dashboard, Cars, Add Car, Orders, Users, Settings)