import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect, useCallback } from "react";
import "./LanguageSwitcher.css";
import uz from "../../public/UZ.webp"
import ru from "../../public/RU.jpg"
import gb from "../../public/GB.svg"

const LANGUAGES = [
  { code: "uz", flag: uz, name: "O'zbekcha", short: "UZ" },
  { code: "ru", flag: ru, name: "Русский", short: "Ру" },
  { code: "en", flag: gb, name: "English", short: "EN" },
] as const;

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const currentLang = LANGUAGES.find((l) => l.code === i18n.language) || LANGUAGES[0];

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
    setHighlightedIndex(0);
  }, []);

  const openDropdown = useCallback(() => {
    setIsOpen(true);
    const idx = LANGUAGES.findIndex((l) => l.code === i18n.language);
    setHighlightedIndex(idx >= 0 ? idx : 0);
  }, [i18n.language]);

  const toggleDropdown = useCallback(() => {
    if (isOpen) closeDropdown();
    else openDropdown();
  }, [isOpen, closeDropdown, openDropdown]);

  const selectLanguage = useCallback(
    (code: string) => {
      i18n.changeLanguage(code);
      localStorage.setItem("language", code);
      closeDropdown();
    },
    [i18n, closeDropdown]
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeDropdown]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightedIndex((prev) => (prev + 1) % LANGUAGES.length);
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightedIndex((prev) => (prev - 1 + LANGUAGES.length) % LANGUAGES.length);
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          selectLanguage(LANGUAGES[highlightedIndex].code);
          break;
        case "Escape":
          closeDropdown();
          triggerRef.current?.focus();
          break;
        case "Tab":
          closeDropdown();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, highlightedIndex, selectLanguage, closeDropdown]);

  return (
    <div className="language-switcher" ref={dropdownRef}>
      <button
        ref={triggerRef}
        type="button"
        className="lang-trigger"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={t("common.language")}
      >
        <span className="lang-flag" aria-hidden="true"><img className="flag" src={currentLang.flag} alt="" /></span>
        <span className="lang-code">{currentLang.short}</span>
        <span className="lang-chevron" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </button>

      {isOpen && (
        <div className="lang-dropdown" role="listbox" aria-label={t("common.language")}>
          {LANGUAGES.map((lang, index) => (
            <button
              key={lang.code}
              type="button"
              className={`lang-option ${lang.code === i18n.language ? "active" : ""} ${index === highlightedIndex ? "highlighted" : ""}`}
              role="option"
              aria-selected={lang.code === i18n.language}
              aria-label={`${lang.name} (${lang.short})`}
              onClick={() => selectLanguage(lang.code)}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              <span className="lang-option-flag" aria-hidden="true"><img className="flag" src={lang.flag} alt="" /></span>
              <span className="lang-option-name">{lang.name}</span>
              <span className="lang-option-code">{lang.short}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}