import { useEffect, useState } from "react"
import Sidebar from "../components/Sidebar"
import BackButton from "../components/BackButton"
import "./Cars.css"
import type { Car } from "../Types/car"
import SEO from "../seo/SEO"
import { useTranslation } from "react-i18next"
import { fetchWithRetry } from "../utils/api"

export default function Cars() {
  const { t } = useTranslation()
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchWithRetry(`${import.meta.env.VITE_API_URL}/cars`)
      .then((data: unknown) => {
        setCars((data as Car[]).map((item) => ({ ...item, id: item.id ?? item._id })))
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }, [])

  return (
    <>
      <SEO
        title={t("cars.title") + " — Hodiy Avto"}
        description={t("cars.description")}
        url="https://hodiyavto.uz/cars"
        image="/logo.png"
        type="website"
        locale="uz_UZ"
      />
      <div className="container">
        <BackButton />
      </div>
      <div className="cars-page">
        {loading ? (
          <div className="cars">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="car-card" style={{ height: 320, background: "#eee", borderRadius: 12, animation: "pulse 1.5s infinite" }} />
            ))}
          </div>
        ) : (
          <Sidebar cars={cars} />
          
        )}
      </div>
    </>
  )
}
