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

Backend API manzillari `VITE_API_URL` / `VITE_AUTH_API_URL` (brauzerga ko'rinadi, maxfiy emas).
Admin hisob ma'lumotlari **faqat serverda** saqlanadi: `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `SESSION_SECRET`
(`VITE_` prefiksi yo'q!). Vercel'da ham shu uchta o'zgaruvchini **Environment Variables** ga qo'shish shart.
`SESSION_SECRET` uchun tasodifiy satr hosil qiling:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Admin autentifikatsiyasi qanday ishlaydi

- `POST /api/admin/login` → parol serverda tekshiriladi, javobda **imzolangan HTTP-only Cookie** qaytariladi (token brauzerga qaytarilmaydi).
- `GET /api/admin/me` → sessiya holati; `POST /api/admin/logout` → cookie o'chiriladi.
- `/api/admin/proxy/*` va `/api/admin/auth-proxy/*` → barcha admin API so'rovlari shu proxy orqali boradi; backend uchun `Authorization` header **serverda** yig'iladi, parol hech qachon klientga yuborilmaydi.
- Session 8 soat yashaydi, `SameSite=Lax` + `Secure` (production) cookie ishlatiladi, login urinishlari cheklangan.

> `npm run dev` da `/api/admin/*` ni Vite ichidagi middleware bajaradi. Production'da esa Vercel serverless funksiyalari (`api/admin/`) ishga tushadi.

## Skriptlar

```bash
npm run dev      # lokal server
npm run build    # tsc + vite build
npm run lint     # eslint
npm run preview  # build natijasini ko'rsatish
npm test         # testlar
```

## Sahifalar

- `/` — bosh sahifa (Hero, avtomobillar katalogi, About, Contact)
- `/cars/:id` — avtomobil batafsil
- `/favorites` — sevimlilar
- `/compare` — avtomobillarni solishtirish
- `/contact`, `/about`, `/ai-chat`, `/login`
- `/admin` — admin panel (Dashboard, Cars, Add Car, Orders, Users, Settings)