import { useEffect, useState } from "react"
import { HiBackward } from "react-icons/hi2"
import { Link, useParams } from "react-router-dom"
import { GoHeart, GoHeartFill } from "react-icons/go"
import { useFavorites } from "../context/useFavorites"
import "./Details.css"
import SEO from "../seo/SEO"
import { carSchema } from "../seo/schema"
import type { Car } from "../Types/car"
import { useTranslation } from "react-i18next"
import { fetchWithRetry } from "../utils/api"

type CarData = {
  id: number
  brand: string
  model: string
  year: number
  price: number
  fuel: string
  image: string
  description?: string
  transmission?: string
  mileage?: number
  color?: string
  engine?: string
  driveType?: string
  features?: string[]
}

export default function CarDetails() {
  const { t } = useTranslation()
  const { id } = useParams()
  const [data, setData] = useState<CarData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toggleFavorite, isFavorite } = useFavorites()
  const liked = data ? isFavorite(data.id) : false

  useEffect(() => {
    const fetchCar = async () => {
      setLoading(true)
      setError(null)
      try {
        const carData = await fetchWithRetry(`${import.meta.env.VITE_API_URL}/cars/${id}`) as CarData & { _id?: string }
        setData({ ...carData, id: carData.id ?? carData._id })
      } catch (err) {
        setError(err instanceof Error ? err.message : "car.notFound")
      } finally {
        setLoading(false)
      }
    }
    fetchCar()
  }, [id])

  if (loading) {
    return (
      <div className="details-page container">
        <div className="loading-container">
          <div className="loading-spinner" />
          <p className="loading-text">{t("car.loading")}</p>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="details-page container">
        <div className="error-container">
          <p className="error-text">{error || t("car.notFound")}</p>
          <button className="retry-btn" onClick={() => window.location.reload()}>
            {t("car.retry")}
          </button>
        </div>
      </div>
    )
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("uz-UZ", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(price)
  }

  const specs = [
    { label: t("car.specs.year"), value: data.year.toString() },
    { label: t("car.specs.fuel"), value: data.fuel },
    { label: t("car.specs.transmission"), value: data.transmission || t("car.transmission") },
    { label: t("car.specs.mileage"), value: data.mileage ? `${data.mileage.toLocaleString()} km` : t("common.error") },
    { label: t("car.specs.color"), value: data.color || t("common.error") },
    { label: t("car.specs.engine"), value: data.engine || t("common.error") },
    { label: t("car.specs.driveType"), value: data.driveType || t("common.error") },
    { label: t("car.specs.bodyType"), value: "Sedan" },
  ]

  const defaultFeatures = t("car.defaultFeatures", { returnObjects: true }) as string[]

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
          <HiBackward size={20} /> {t("car.back")}
        </Link>
        <div className="details-grid">
          <div className="image-section">
            <img
              src={data.image}
              alt={`${data.brand} ${data.model} ${data.year}-yil`}
              className="main-image"
            />
            <button
              className={`favorite-btn ${liked ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                toggleFavorite(data as Car)
              }}
              aria-label={liked ? t("car.removeFromFavorites") : t("car.addToFavorites")}
            >
              <GoHeartFill className="heart-fill" />
              <GoHeart className="heart" />
            </button>
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
                <h2 className="section-title">{t("car.description")}</h2>
                <p className="description-text">{data.description}</p>
              </div>
            )}
            <div className="features-section">
              <h2 className="section-title">{t("car.features")}</h2>
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
  )
}