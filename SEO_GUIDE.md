# Hodiy Avto — SEO Implementation Guide

## What Was Implemented

### 1. Dynamic Meta Tags (`src/seo/SEO.tsx`)
- Automatically sets `document.title` per page
- Manages `meta description`, Open Graph tags, Twitter Card tags
- Adds `canonical` URL and `hreflang` alternates (uz-UZ, ru-RU, x-default)
- Used on: Home, Details, Contact, About, Favorites pages

### 2. Structured Data (`src/seo/schema.ts`)
- **LocalBusiness schema** — for the homepage (company info, address, hours, price range)
- **Car schema** — for each car detail page (brand, model, year, price, condition, mileage, etc.)
- Injected as `<script type="application/ld+json">` in each page

### 3. Sitemap (`public/sitemap.xml`)
- Lists all public pages with hreflang alternates
- Includes priority and changefreq for each URL
- Update `lastmod` when content changes

### 4. Robots.txt (`public/robots.txt`)
- Allows all user agents to crawl public pages
- Blocks `/admin/`, `/admin`, `/favorites`, `/api/`
- Points to sitemap.xml

### 5. Index.html Meta Tags
- Full Open Graph and Twitter Card meta tags
- hreflang links for multilingual support
- Canonical URL
- Keywords meta tag

### 6. Image Alt Texts
- Header logo images now have descriptive alt text
- Car card images use `car.model` as alt text
- Car detail images use `${brand} ${model} ${year}` as alt text

### 7. Clean URL Structure
- `/` — Home page
- `/cars/:id` — Car detail pages (e.g., `/cars/1`)
- `/favorites` — Favorites page
- `/contact` — Contact page
- `/about` — About page

## Pre-rendering for SPA SEO

Since this is a React SPA (Single Page Application), search engine crawlers may not fully execute JavaScript to index content. To solve this:

### Option 1: Prerender.io (Recommended)
1. Sign up at https://prerender.io/
2. Add middleware to your server:
```
npm install prerender-node --save
```
3. In your server setup:
```js
const prerender = require('prerender-node');
prerender.set('prerenderToken', 'YOUR_TOKEN');
app.use(prerender);
```

### Option 2: Vite Pre-rendering
Use `vite-plugin-prerender` or `vite-sitemap` plugins:
```bash
npm install vite-plugin-prerender --save-dev
```

### Option 3: Static Generation
Convert to Next.js for SSR/SSG:
- `npm install next react react-dom`
- Move pages to `app/` directory
- Use `generateStaticParams` for car pages

### Option 4: Ping Services
After deploying, ping search engines:
- Google: `https://www.google.com/ping?sitemap=https://hodiyavto.uz/sitemap.xml`
- Yandex: `https://yandex.com/ping?sitemap=https://hodiyavto.uz/sitemap.xml`

## GEO (Geotargeting) Setup

### Google Search Console
1. Go to https://search.google.com/search-console/
2. Add property: `https://hodiyavto.uz/`
3. Submit sitemap.xml
4. Set geographic target to Uzbekistan > Toshkent

### Google Business Profile
1. Go to https://business.google.com/
2. Create profile for "Hodiy Avto"
3. Add: Toshkent address, phone, hours, photos
4. Verify via postcard or phone

### Yandex.Webmaster
1. Go to https://webmaster.yandex.com/
2. Add site and verify ownership
3. Submit sitemap
4. Set geotargeting to Uzbekistan

### hreflang Implementation
- `uz-UZ` — Uzbek version (primary)
- `ru-RU` — Russian version (for CIS audience)
- `x-default` — Default fallback

## Ongoing SEO Tasks

- [ ] Add unique meta descriptions for each car detail page
- [ ] Create blog/articles section for SEO content
- [ ] Add internal linking between car listings
- [ ] Monitor Google Search Console for indexing issues
- [ ] Optimize images (compress, WebP format)
- [ ] Add structured data for reviews/ratings
- [ ] Set up Google Analytics 4 and Yandex.Metrika
- [ ] Add FAQ schema for common questions
- [ ] Create robots.txt disallow for dev/staging environments
- [ ] Monitor Core Web Vitals and fix performance issues