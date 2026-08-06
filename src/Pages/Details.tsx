import { useEffect, useState } from "react";
import { HiBackward } from "react-icons/hi2";
import { Link, useParams } from "react-router-dom";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { useFavorites } from "../context/useFavorites";
import "./Details.css";
import SEO from "../seo/SEO";
import { carSchema } from "../seo/schema";

type CarData = {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  fuel: string;
  image: string;
  description?: string;
  transmission?: string;
  mileage?: number;
  color?: string;
  engine?: string;
  driveType?: string;
  features?: string[];
};

export default function CarDetails() {
  const { id } = useParams();
  const [data, setData] = useState<CarData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toggleFavorite, isFavorite } = useFavorites();
  const liked = data ? isFavorite(data.id) : false;

  useEffect(() => {
    const fetchCar = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`http://localhost:3000/cars/${id}`);
        if (!res.ok) throw new Error("Mashina topilmadi");
        const carData = await res.json();
        setData({ ...carData, id: carData.id ?? carData._id });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Xatolik yuz berdi");
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  if (loading) {
    return (
      <div className="details-page container">
        <div className="loading-container">
          <div className="loading-spinner" />
          <p className="loading-text">Mashina ma'lumotlari yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="details-page container">
        <div className="error-container">
          <p className="error-text">{error || "Mashina ma'lumotlari topilmadi"}</p>
          <button className="retry-btn" onClick={() => window.location.reload()}>
            Qayta urinish
          </button>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("uz-UZ", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(price);
  };

  const specs = [
    { label: "Yil", value: data.year.toString() },
    { label: "Yurish yo'li", value: data.fuel },
    { label: "Uzatma", value: data.transmission || "Avtomat" },
    { label: "Yurgan yo'li", value: data.mileage ? `${data.mileage.toLocaleString()} km` : "Noma'lum" },
    { label: "Rang", value: data.color || "Noma'lum" },
    { label: "Dvigatel", value: data.engine || "Noma'lum" },
    { label: "Yo'lga kuchlanish", value: data.driveType || "Noma'lum" },
    { label: "Kuzov", value: "Sedan" },
  ];

  const defaultFeatures = [
    "ABS tizimi",
    "Konditsioner",
    "O'rindiq isitish",
    "Parktronik",
    "Kamerali ko'rinish",
    "Bluetooth",
    "Kruzkontrol",
    "Yurish rejimlari",
    "Xavfsizlik podushkalari",
  ];

  return (
    <>
      <SEO
        title={`${data.brand} ${data.model} — ${formatPrice(data.price)} | Hodiy Avto`}
        description={data.description || `${data.brand} ${data.model} — ${data.year}-yil ${formatPrice(data.price)} narxda. ${data.fuel} yoqilg'i, ${data.transmission || 'Avtomat'} uzatma.`}
        url={`https://hodiyavto.uz/cars/${data.id}`}
        image={data.image}
        type="product"
        locale="uz_UZ"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(carSchema(data)) }}
      />

      <div className="details-page container">
        <Link to="/" className="back-btn">
          <HiBackward size={20} /> Ortga qaytish
        </Link>

        <div className="details-grid">
          <div className="image-section">
            <div className="car-image-wrapper">
              <img
                src={data.image}
                alt={`${data.brand} ${data.model} ${data.year}-yil`}
                className="main-image"
              />
              <button
                className={`favorite-btn ${liked ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleFavorite(data);
                }}
                aria-label={liked ? "Remove from favorites" : "Add to favorites"}
              >
                <GoHeartFill className="heart-fill" />
                <GoHeart className="heart" />
              </button>
            </div>
          </div>

          <div className="info-section">
            <div className="car-header">
              <span className="car-brand">{data.brand}</span>
              <h1 className="car-model">{data.model}</h1>
              <div className="car-price">{formatPrice(data.price)}</div>
            </div>

            <div className="specs-grid">
              {specs.map((spec, index) => (
                <div key={index} className="spec-card">
                  <div className="spec-label">{spec.label}</div>
                  <div className="spec-value">{spec.value}</div>
                </div>
              ))}
            </div>

            {data.description && (
              <div className="description-section">
                <h2 className="section-title">Tavsif</h2>
                <p className="description-text">{data.description}</p>
              </div>
            )}

            <div className="features-section">
              <h2 className="section-title">Asosiy xususiyatlar</h2>
              <div className="features-grid">
                {(data.features || defaultFeatures).map((feature, index) => (
                  <div key={index} className="feature-item">
                    <span className="feature-icon">✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}