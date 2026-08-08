import { FaCheck, FaHryvnia, FaPhoneAlt } from "react-icons/fa"
import { FaBolt } from "react-icons/fa6"
import "./About.css"
import SEO from "../seo/SEO"
import { useTranslation } from "react-i18next"

export default function About() {
  const { t } = useTranslation()

  return (
    <>
      <SEO
        title={t("about.title") + " — Hodiy Avto"}
        description={t("about.description")}
        url="https://hodiyavto.uz/about"
        image="/logo.png"
        type="website"
        locale="uz_UZ"
      />
      <section className="about-section">
      <div className="about-container">
        <div className="about-content">
          <div className="kontakt-title">{t("about.title")}</div>
          <h2 className="about-title">{t("about.subtitle")}</h2>
          <p className="about-text">
            {t("about.description")}
          </p>
          <div className="about-features">
            <div className="feature-card">
              <div className="feature-icon">
                <FaCheck />
              </div>
              <div>
                <h4>{t("about.features.quality.title")}</h4>
                <p>{t("about.features.quality.desc")}</p>
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FaHryvnia />
              </div>
              <div>
                <h4>{t("about.features.price.title")}</h4>
                <p>{t("about.features.price.desc")}</p>
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FaBolt />
              </div>
              <div>
                <h4>{t("about.features.speed.title")}</h4>
                <p>{t("about.features.speed.desc")}</p>
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FaPhoneAlt />
              </div>
              <div>
                <h4>{t("about.features.support.title")}</h4>
                <p>{t("about.features.support.desc")}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="about-stat">
          <div className="stat-label">{t("about.statLabel")}</div>
          <div className="stat-percent">{t("about.statPercent")}</div>
          <div className="stat-desc">{t("about.statDesc")}</div>
        </div>
      </div>
    </section>
    </>
  )
}