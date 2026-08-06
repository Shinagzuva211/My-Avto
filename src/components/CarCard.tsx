import type { Car } from "../Types/car"
import { useFavorites } from "../context/useFavorites";
import { GoHeart, GoHeartFill } from "react-icons/go";

interface CarCardProps {
    car: Car;
}

import "../Home.css"
import { BiDollar } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function CarCard({ car }: CarCardProps) {
    const { toggleFavorite, isFavorite } = useFavorites();
    const liked = isFavorite(car.id);

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
                        e.preventDefault();
                        e.stopPropagation();
                        toggleFavorite(car);
                    }}
                    aria-label={liked ? "Remove from favorites" : "Add to favorites"}
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
                    Year: {car.year}
                </div>

                <div className="car-price2">
                     <BiDollar/>{car.price}
                </div>

                <Link to={`/cars/${car.id}`}>
                    <button className="view">View Details</button>
                </Link>

            </div>

        </div>
    )
}
