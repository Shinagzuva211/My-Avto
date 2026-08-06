export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Hodiy Avto",
    description:
      "Toshkentdagi professional avtomobil sotuv markazi. Sifatli tekshirilgan avtomobillarni eng yaxshi narxda taklif qilamiz.",
    url: "https://hodiyavto.uz",
    telephone: "+998 90 123 45 67",
    email: "info@hodiyavto.uz",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Toshkent, O'zbekiston",
      addressLocality: "Toshkent",
      addressCountry: "UZ",
    },
    openingHours: "Mo-Sa 09:00-18:00",
    image: "https://hodiyavto.uz/logo.png",
    priceRange: "$5000 - $150000",
  };
}

export function carSchema(car: {
  name?: string;
  model?: string;
  brand: string;
  price: number;
  year: number;
  description?: string;
  image?: string;
  condition?: string;
  mileage?: number;
  color?: string;
  engine?: string;
  transmission?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Car",
    name: `${car.brand} ${car.model}`,
    model: car.model,
    manufacturer: car.brand,
    year: car.year,
    description: car.description,
    image: car.image,
    offers: {
      "@type": "Offer",
      price: car.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    ...(car.condition && { vehicleCondition: car.condition }),
    ...(car.mileage && { mileageFromOdometer: { "@type": "QuantitativeValue", value: car.mileage, unitCode: "KMT" } }),
    ...(car.color && { color: car.color }),
    ...(car.engine && { engine: { "@type": "EngineSpecification", name: car.engine } }),
    ...(car.transmission && { transmission: car.transmission }),
  };
}