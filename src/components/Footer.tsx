import { Link } from "react-router-dom"
import {
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
    FaClock,
    FaTelegram,
    FaInstagram,
    FaFacebookF,
} from "react-icons/fa"
import logo from "../../public/logo2.png"
import { useTranslation } from "react-i18next"
import "./Footer.css"

export default function Footer() {
    const { t } = useTranslation()

    return (
        <footer className="footer">
            <div className="container footer-grid">
                <div className="footer-col">
                    <div className="footer-logo">
                        <img src={logo} alt="Hodiy Avto logo" />
                        <span className="footer-logo-title">AVTO</span>
                    </div>
                    <p className="footer-about">{t("footer.about")}</p>
                    <div className="footer-socials">
                        <a href="#" aria-label="Telegram" className="social-link">
                            <FaTelegram />
                        </a>
                        <a href="#" aria-label="Instagram" className="social-link">
                            <FaInstagram />
                        </a>
                        <a href="#" aria-label="Facebook" className="social-link">
                            <FaFacebookF />
                        </a>
                    </div>
                </div>

                <div className="footer-col">
                    <h4 className="footer-title">{t("footer.quickLinks")}</h4>
                    <ul className="footer-links">
                        <li><a href="#home">{t("nav.home")}</a></li>
                        <li><a href="#cars">{t("nav.cars")}</a></li>
                        <li><a href="#about">{t("nav.about")}</a></li>
                        <li><a href="#contact">{t("nav.contact")}</a></li>
                        <li><Link to="/favorites">{t("nav.favorites")}</Link></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4 className="footer-title">{t("footer.contactTitle")}</h4>
                    <ul className="footer-contact">
                        <li>
                            <FaMapMarkerAlt className="footer-icon" />
                            <span>{t("contact.addressValue")}</span>
                        </li>
                        <li>
                            <FaPhoneAlt className="footer-icon" />
                            <a href="tel:+998901234567">+998 90 123 45 67</a>
                        </li>
                        <li>
                            <FaEnvelope className="footer-icon" />
                            <a href="mailto:info@hodiyavto.uz">info@hodiyavto.uz</a>
                        </li>
                        <li>
                            <FaClock className="footer-icon" />
                            <span>{t("contact.workingHoursValue")}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container">
                    <p>© {new Date().getFullYear()} Hodiy Avto. {t("footer.rights")}</p>
                </div>
            </div>
        </footer>
    )
}
