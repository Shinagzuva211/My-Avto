import { useEffect } from "react";

const SITE_URL = "https://hodiyavto.uz";

function toAbsoluteUrl(value: string): string {
  if (/^https?:\/\//i.test(value)) return value;
  return `${SITE_URL}${value.startsWith("/") ? value : `/${value}`}`;
}

type SEOProps = {
  title: string;
  description: string;
  url?: string;
  image?: string;
  type?: string;
  locale?: string;
};

export default function SEO({
  title,
  description,
  url = SITE_URL,
  image = `${SITE_URL}/logo.png`,
  type = "website",
  locale = "uz_UZ",
}: SEOProps) {
  useEffect(() => {
    const absoluteUrl = toAbsoluteUrl(url);
    const absoluteImage = toAbsoluteUrl(image);

    document.title = title;

    const existingMeta = document.querySelectorAll(
      'meta[name="description"], meta[property="og:title"], meta[property="og:description"], meta[property="og:url"], meta[property="og:type"], meta[property="og:image"], meta[property="og:locale"], link[rel="canonical"], link[rel="alternate"]'
    );
    existingMeta.forEach((el) => el.remove());

    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = description;
    document.head.appendChild(metaDescription);

    const metaOgTitle = document.createElement("meta");
    metaOgTitle.setAttribute("property", "og:title");
    metaOgTitle.content = title;
    document.head.appendChild(metaOgTitle);

    const metaOgDescription = document.createElement("meta");
    metaOgDescription.setAttribute("property", "og:description");
    metaOgDescription.content = description;
    document.head.appendChild(metaOgDescription);

    const metaOgUrl = document.createElement("meta");
    metaOgUrl.setAttribute("property", "og:url");
    metaOgUrl.content = absoluteUrl;
    document.head.appendChild(metaOgUrl);

    const metaOgType = document.createElement("meta");
    metaOgType.setAttribute("property", "og:type");
    metaOgType.content = type;
    document.head.appendChild(metaOgType);

    const metaOgImage = document.createElement("meta");
    metaOgImage.setAttribute("property", "og:image");
    metaOgImage.content = absoluteImage;
    document.head.appendChild(metaOgImage);

    const metaOgLocale = document.createElement("meta");
    metaOgLocale.setAttribute("property", "og:locale");
    metaOgLocale.content = locale;
    document.head.appendChild(metaOgLocale);

    const canonical = document.createElement("link");
    canonical.rel = "canonical";
    canonical.href = absoluteUrl;
    document.head.appendChild(canonical);

    const hreflangUz = document.createElement("link");
    hreflangUz.rel = "alternate";
    hreflangUz.hreflang = "uz-UZ";
    hreflangUz.href = absoluteUrl;
    document.head.appendChild(hreflangUz);

    const hreflangRu = document.createElement("link");
    hreflangRu.rel = "alternate";
    hreflangRu.hreflang = "ru-RU";
    hreflangRu.href = absoluteUrl.replace("hodiyavto.uz", "hodiyavto.ru");
    document.head.appendChild(hreflangRu);

    const hreflangXDefault = document.createElement("link");
    hreflangXDefault.rel = "alternate";
    hreflangXDefault.hreflang = "x-default";
    hreflangXDefault.href = absoluteUrl;
    document.head.appendChild(hreflangXDefault);
  }, [title, description, url, image, type, locale]);

  return null;
}