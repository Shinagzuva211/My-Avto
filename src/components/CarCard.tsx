import type { Car } from "../Types/car"
import { useFavorites } from "../context/useFavorites"
import { GoHeart, GoHeartFill } from "react-icons/go"
import "../Home.css"
import { BiDollar } from "react-icons/bi"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

interface CarCardProps {
    car: Car
}

export default function CarCard({ car }: CarCardProps) {
    const { t } = useTranslation()
    const { toggleFavorite, isFavorite } = useFavorites()
    const liked = isFavorite(car.id)

    return (
        <div className="car-card">
            <div className="car-image-wrapper">
                <img
                    src={car.image}
                    alt={car.model}
                    className="car-image"
                />
                <button
                    className={`favorite-btn ${liked ? "active" : ""}`}
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        toggleFavorite(car)
                    }}
                    aria-label={liked ? t("car.removeFromFavorites") : t("car.addToFavorites")}
                >
                    <GoHeartFill className="heart-fill" />
                    <GoHeart className="heart" />
                </button>
            </div>
            <div className="car-info">
                <div className="car-name">
                    {car.brand} {car.model}
                </div>
                <div className="car-year">
                    {t("car.year")}: {car.year}
                </div>
                <div className="car-price2">
                     <BiDollar/>{car.price}
                </div>
                <Link to={`/cars/${car.id}`}>
                    <button className="view">{t("car.details")}</button>
                </Link>
            </div>
        </div>
    )
}