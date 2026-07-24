import type { Car } from "../Types/car"

interface CarCardProps {
    car: Car;
}

import "../Home.css"
import { BiDollar } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function CarCard({ car }: CarCardProps) {

    return (
        <div className="car-card">
            <img
             src={car.image}
             alt={car.model} 
             className="car-image"
             width={'400px'}
            />

            <div className="car-info">

                <div className="car-name">
                    {car.brand} {car.model}
                </div>

                <div className="car-year">
                    Year: {car.year}
                </div>

                <div className="car-price">
                     <BiDollar/>{car.price}
                </div>

                <Link to={`cars/${car.id}`}>
                    <button className="view">View Details</button>
                </Link>

            </div>

        </div>
    )
}
