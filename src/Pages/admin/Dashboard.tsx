import { useEffect, useState } from "react"
import { BsCarFrontFill } from "react-icons/bs"
import { MdElectricBolt, MdAttachMoney } from "react-icons/md"
import { FaStar } from "react-icons/fa"
import { useTranslation } from "react-i18next"
import { fetchWithRetry } from "../../utils/api"

type Car = {
  id: number
  _id?: string
  brand: string
  model: string
  year: number
  price: number
  fuel: string
  image: string
}

export default function Dashboard() {
  const { t } = useTranslation()
  const [cars, setCars] = useState<Car[]>([])

  useEffect(() => {
    fetchWithRetry(`${import.meta.env.VITE_API_URL}/cars`)
      .then((data: unknown) => setCars((data as Car[]).map((item) => ({ ...item, id: item.id ?? item._id }))))
      .catch((err) => console.log(err))
  }, [])

  const totalCars = cars.length
  const averagePrice = totalCars > 0 ? Math.round(cars.reduce((sum, car) => sum + car.price, 0) / totalCars) : 0
  const electricCars = cars.filter((car) => car.fuel === "Elektra").length

  const brandCount: Record<string, number> = {}
  cars.forEach((car) => {
    brandCount[car.brand] = (brandCount[car.brand] || 0) + 1
  })

  const topBrand = Object.entries(brandCount).sort((a, b) => b[1] - a[1])[0]?.[0] || t("common.error")

  return (
    <div>
      <div className="admin-page-header">
        <h1>{t("admin.dashboard")}</h1>
        <p>{t("admin.welcome")}</p>
      </div>
      <div className="stat-cards">
        <div className="stat-card">
          <div className="stat-card-icon red">
            <BsCarFrontFill />
          </div>
          <div className="stat-card-info">
            <h3>{t("admin.totalCars")}</h3>
            <h2>{totalCars}</h2>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon blue">
            <MdAttachMoney />
          </div>
          <div className="stat-card-info">
            <h3>{t("admin.averagePrice")}</h3>
            <h2>${averagePrice.toLocaleString()}</h2>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon green">
            <MdElectricBolt />
          </div>
          <div className="stat-card-info">
            <h3>{t("admin.electricCars")}</h3>
            <h2>{electricCars}</h2>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon purple">
            <FaStar />
          </div>
          <div className="stat-card-info">
            <h3>{t("admin.topBrand")}</h3>
            <h2>{topBrand}</h2>
          </div>
        </div>
      </div>
      <div className="admin-table-wrapper">
        <div className="admin-table-header">
          <h2>{t("admin.recentCars")}</h2>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>{t("car.image")}</th>
              <th>{t("car.brand")}</th>
              <th>{t("car.model")}</th>
              <th>{t("car.year")}</th>
              <th>{t("car.price")}</th>
              <th>{t("car.fuel")}</th>
            </tr>
          </thead>
          <tbody>
            {cars.slice(0, 7).map((car) => (
              <tr key={car.id}>
                <td>
                  <img className="admin-table-img" src={car.image} alt={`${car.brand} ${car.model}`} />
                </td>
                <td>{car.brand}</td>
                <td>{car.model}</td>
                <td>{car.year}</td>
                <td>${car.price.toLocaleString()}</td>
                <td>{car.fuel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}