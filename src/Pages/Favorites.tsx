import { Link } from "react-router-dom"
import { useFavorites } from "../context/useFavorites"
import CarCard from "../components/CarCard"
import BackButton from "../components/BackButton"
import SEO from "../seo/SEO"
import { useTranslation } from "react-i18next"

export default function Favorites() {
    const { t } = useTranslation()
    const { favorites } = useFavorites()

    return (
        <>
            <SEO
                title={t("favorites.title") + " — Hodiy Avto"}
                description={t("favorites.empty")}
                url="https://hodiyavto.uz/favorites"
                image="/logo.png"
                type="website"
                locale="uz_UZ"
            />
            <div className="container">
                <BackButton />
                <div className="favorites-page">
                    <h1 className="favorites-title">{t("favorites.title")}</h1>
                    {favorites.length === 0 ? (
                        <div className="empty-favorites">
                            <p>{t("favorites.empty")}</p>
                            <Link to="/cars">
                                <button className="view">{t("favorites.browseCars")}</button>
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