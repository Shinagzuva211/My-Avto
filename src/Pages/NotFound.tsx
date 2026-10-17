import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import {
    PiCarSimpleBold,
    PiHouseBold,
    PiArrowRightBold,
    PiHeartBold,
    PiScalesBold,
    PiChatCircleTextBold,
} from "react-icons/pi"
import SEO from "../seo/SEO"
import logo from "../../public/logo-dark.webp"
import "./NotFound.css"

export default function NotFound() {
    const { t } = useTranslation()

    const quickLinks = [
        { to: "/cars", label: t("nav.cars"), Icon: PiCarSimpleBold },
        { to: "/favorites", label: t("nav.favorites"), Icon: PiHeartBold },
        { to: "/compare", label: t("compare.title"), Icon: PiScalesBold },
        { to: "/ai-chat", label: t("nav.ai"), Icon: PiChatCircleTextBold },
    ]

    return (
        <>
            <SEO
                title={t("notFound.title") + " — Hodiy Avto"}
                description={t("notFound.description")}
                url="https://hodiyavto.uz/404"
                image="/logo.png"
                type="website"
                locale="uz_UZ"
            />
            <section className="notfound-page">
                <div className="notfound-bg" aria-hidden="true" />
                <div className="notfound-glow" aria-hidden="true" />

                <div className="notfound-card">
                    <Link to="/" className="notfound-brand">
                        <img src={logo} alt="Hodiy Avto logo" />
                        <span>Hodiy Avto</span>
                    </Link>

                    <div className="notfound-visual" aria-hidden="true">
                        <span className="notfound-ring" />
                        <PiCarSimpleBold className="notfound-car" />
                    </div>

                    <h1 className="notfound-code">404</h1>
                    <p className="notfound-title">{t("notFound.title")}</p>
                    <p className="notfound-description">{t("notFound.description")}</p>

                    <div className="notfound-actions">
                        <Link to="/" className="notfound-btn notfound-btn-primary">
                            <PiHouseBold />
                            {t("notFound.home")}
                        </Link>
                        <Link to="/cars" className="notfound-btn notfound-btn-secondary">
                            {t("notFound.browseCars")}
                            <PiArrowRightBold />
                        </Link>
                    </div>

                    <div className="notfound-divider">
                        <span>{t("notFound.popular")}</span>
                    </div>

                    <nav className="notfound-links">
                        {quickLinks.map(({ to, label, Icon }) => (
                            <Link key={to} to={to} className="notfound-link">
                                <Icon />
                                {label}
                            </Link>
                        ))}
                    </nav>

                    <p className="notfound-help">
                        {t("notFound.help")}
                        <Link to="/contact">{t("nav.contact")}</Link>
                    </p>
                </div>
            </section>
        </>
    )
}
