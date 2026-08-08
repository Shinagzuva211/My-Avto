import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
  };

  return (
    <div className="language-switcher">
      <select
        value={i18n.language}
        onChange={(e) => changeLanguage(e.target.value)}
        className="language-select"
      >
        <option value="uz">{t("common.uzbek")}</option>
        <option value="ru">{t("common.russian")}</option>
        <option value="en">{t("common.english")}</option>
      </select>
    </div>
  );
}