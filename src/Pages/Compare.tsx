import { Link } from "react-router-dom"
import { HiBackward } from "react-icons/hi2"
import { useCompare } from "../context/useCompare"
import SEO from "../seo/SEO"
import { useTranslation } from "react-i18next"
import "./Compare.css"

const fields: { key: string; labelKey: string }[] = [
  { key: "brand", labelKey: "compare.brand" },
  { key: "model", labelKey: "compare.model" },
  { key: "year", labelKey: "compare.year" },
  { key: "price", labelKey: "compare.price" },
  { key: "fuel", labelKey: "compare.fuel" },
  { key: "transmissio", labelKey: "compare.transmissio" },
  { key: "mileage", labelKey: "compare.mileage" },
  { key: "color", labelKey: "compare.color" },
  { key: "engine", labelKey: "compare.engine" },
  { key: "driveType", labelKey: "compare.driveType" },
  { key: "condition", labelKey: "compare.condition" },
]

function formatValue(t: (key: string) => string, key: string, value: unknown): string {
  if (value === null || value === undefined || value === "") return "—"

  if (key === "price") return `${Number(value).toLocaleString("ru-RU")} $`
  if (key === "mileage") return Number(value).toLocaleString("ru-RU")
  if (key === "condition") return value === "new" ? t("car.conditionNew") : t("car.conditionUsed")

  return String(value)
}

export default function Compare() {
  const { t } = useTranslation()
  const { compareList, removeFromCompare, clearCompare } = useCompare()

  return (
    <>
      <SEO
        title="Taqqoslash — Hodiy Avto"
        description="Avtomobillarni taqqoslang"
        url="https://hodiyavto.uz/compare"
        image="/logo.png"
        type="website"
        locale="uz_UZ"
      />
      <div className="container">
        <div className="fav-back">
          <Link to={"/"}>
            <div className="back-btn">
              <HiBackward /> {t("favorites.back")}
            </div>
          </Link>
        </div>
        <div className="favorites-page">
          <div className="compare-head">
            <div>
              <h1 className="favorites-title">{t("compare.title")}</h1>
              <p className="compare-subtitle">{t("compare.subtitle")}</p>
            </div>
            {compareList.length > 0 && (
              <button className="view compare-clear-btn" onClick={clearCompare}>
                {t("compare.clear")}
              </button>
            )}
          </div>

          {compareList.length === 0 ? (
            <div className="empty-favorites">
              <p>{t("compare.empty")}</p>
              <Link to="/cars">
                <button className="view">{t("favorites.browseCars")}</button>
              </Link>
            </div>
          ) : (
            <div className="compare-cards">
              {compareList.map((car) => (
                <article key={car.id} className="compare-card">
                  <div className="compare-card-head">
                    <button
                      className="compare-remove"
                      onClick={() => removeFromCompare(car.id)}
                      aria-label={t("compare.remove")}
                    >
                      &times;
                    </button>
                    <img src={car.image} alt={car.model} className="compare-card-image" loading="lazy" />
                    <h3 className="compare-card-name">
                      {car.brand} {car.model}
                    </h3>
                  </div>
                  <div className="compare-card-specs">
                    {fields.map((f) => (
                      <div className="compare-spec" key={f.key}>
                        <span className="compare-spec-label">{t(f.labelKey)}</span>
                        <span className={`compare-spec-value ${f.key === "price" ? "compare-spec-price" : ""}`}>
                          {formatValue(t, f.key, car[f.key as keyof typeof car])}
                        </span>
                      </div>
                    ))}
                  </div>
                  <Link to={`/cars/${car.id}`} className="compare-details-btn">
                    {t("compare.details")}
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
