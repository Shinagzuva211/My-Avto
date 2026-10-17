import { HiBackward } from "react-icons/hi2"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import "./BackButton.css"

export default function BackButton() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <div className="fav-back">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <HiBackward /> {t("common.back")}
      </button>
    </div>
  )
}
