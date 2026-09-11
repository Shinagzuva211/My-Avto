const SITE = "https://hodiyavto.uz";
const SITE_RU = SITE.replace("hodiyavto.uz", "hodiyavto.ru");

type Car = {
  id?: string | number;
  _id?: string;
  brand: string;
  model: string;
};

type ResponseLike = {
  setHeader: (name: string, value: string) => void;
  status: (code: number) => { send: (body: string) => void };
};

function urlEntry(path: string, priority: string, changefreq: string) {
  return `  <url>
    <loc>${SITE}${path}</loc>
    <xhtml:link rel="alternate" hreflang="uz-UZ" href="${SITE}${path}" />
    <xhtml:link rel="alternate" hreflang="ru-RU" href="${SITE_RU}${path}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${path}" />
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

const STATIC_ENTRIES = [
  urlEntry("/", "1.0", "weekly"),
  urlEntry("/contact", "0.5", "monthly"),
  urlEntry("/about", "0.5", "monthly"),
];

export default async function handler(_req: unknown, res: ResponseLike) {
  let cars: Car[] = [];
  try {
    const apiUrl = process.env.VITE_API_URL ?? "http://localhost:5000";
    const response = await fetch(`${apiUrl}/cars`);
    const data = (await response.json()) as unknown;
    if (Array.isArray(data)) cars = data as Car[];
  } catch {
    cars = [];
  }

  const carEntries = cars.map((car) =>
    urlEntry(`/cars/${car.id ?? car._id}`, "0.8", "weekly")
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${[...STATIC_ENTRIES, ...carEntries].join("\n")}
</urlset>`;

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.status(200).send(xml);
}