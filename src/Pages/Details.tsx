import { useEffect, useState } from "react";
import { HiBackward } from "react-icons/hi2";
import { Link, useParams } from "react-router-dom"

type CarData = {
    id: number
    brand: string
    model: string
    year: number
    price: number
    fuel: string
    image: string
}

export default function CarDetails() {

    const { id } = useParams()

    const [data, setData] = useState<CarData | null>(null)

    useEffect(() => {
        fetch(`http://localhost:3000/cars/${id}`)
            .then(res => res.json())
            .then(data => setData(data));

    }, [id]);

    if (!data) {
        return <h2>Loading...</h2>;
    }

    return (
        <>

            <div className="container">

                <Link to={'/'}>
                    <div className="back-btn">
                        <HiBackward /> Back
                    </div>
                </Link>

                <h1>{data.brand}</h1>

                <img src={data.image} alt={data.brand} />

                <p>{data.model}</p>

                <p>{data.year}</p>

                <p>${data.price}</p>

                <p>{data.fuel}</p>

            </div>


        </>
    )
}
