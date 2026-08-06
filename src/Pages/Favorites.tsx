import { HiBackward } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/useFavorites";
import CarCard from "../components/CarCard";
import "../Home.css";
import SEO from "../seo/SEO";

export default function Favorites() {
    const { favorites } = useFavorites();

    return (
        <>
            <SEO
                title="Sevimli Mashinalar — Hodiy Avto"
                description="Hodiy Avto sevimli mashinalar ro'yxati. Qiziqgan avtomobillarni saqlang va tez orada bog'laning."
                url="https://hodiyavto.uz/favorites"
                image="/logo.png"
                type="website"
                locale="uz_UZ"
            />

            <div className="container">

                <div className="fav-back">
                <Link to={'/'}>
                    <div className="back-btn">
                        <HiBackward /> Back
                    </div>
                </Link>
                </div>

                <div className="favorites-page">
                    <h1 className="favorites-title">Sevimli Mashinalar</h1>

                    {favorites.length === 0 ? (
                        <div className="empty-favorites">
                            <p>Hozircha sevimli mashinalar yo'q</p>
                            <Link to="/">
                                <button className="view">Mashinalarni ko'rish</button>
                            </Link>
                        </div>
                    ) : (
                        <div className="cars">
                            {favorites.map((car) => (
                                <CarCard key={car.id} car={car} />
                            ))}
                        </div>
                    )}
                </div>

            </div>

        </>
    )
}
