import { useState } from "react"
import SEO from "../seo/SEO"
import "./Contact.css"
import {
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
    FaClock,
} from "react-icons/fa"
import { useTranslation } from "react-i18next"

export default function Contact() {
    const { t } = useTranslation()
    const [form, setForm] = useState({ name: "", phone: "", model: "", question: "" })
    const [submitted, setSubmitted] = useState(false)

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setSubmitted(true)
        setForm({ name: "", phone: "", model: "", question: "" })
    }

    return (
        <section id="contact">
            <SEO
                title={t("contact.title") + " — Hodiy Avto"}
                description={t("contact.description")}
                url="https://hodiyavto.uz/contact"
                image="/logo.png"
                type="website"
                locale="uz_UZ"
            />
            <div className="contact-header">
                <div className="kontakt-title">
                    {t("contact.title")}
                </div>
                <h1>{t("contact.subtitle")}</h1>
                <p>
                    {t("contact.description")}
                </p>
            </div>
            <div className="contact-wrapper">
                <div className="contact-info">
                    <h2>{t("contact.getInTouch")}</h2>
                    <div className="contact-item">
                        <div className="icon-box">
                            <FaMapMarkerAlt />
                        </div>
                        <div>
                            <h4>{t("contact.address")}</h4>
                            <p>{t("contact.addressValue")}</p>
                        </div>
                    </div>
                    <div className="meeting">
                        <FaPhoneAlt />
                        <span>+998 90 123 45 67</span>
                    </div>
                    <div className="meeting">
                        <FaEnvelope />
                        <span>info@hodiyavto.uz</span>
                    </div>
                    <div className="meeting">
                        <FaClock />
                        <span>{t("contact.workingHoursValue")}</span>
                    </div>
                </div>
                <div className="contact-form">
                    {submitted && (
                        <div className="success-message">
                            {t("contact.success")}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder={t("contact.form.namePlaceholder")}
                            value={form.name}
                            onChange={handleChange}
                        />
                        <input
                            type="tel"
                            name="phone"
                            placeholder={t("contact.form.phonePlaceholder")}
                            value={form.phone}
                            onChange={handleChange}
                        />
                        <label htmlFor="model">{t("contact.form.model")}</label>
                        <input
                            type="text"
                            id="model"
                            name="model"
                            placeholder={t("contact.form.modelPlaceholder")}
                            value={form.model}
                            onChange={handleChange}
                        />
                        <label htmlFor="question">{t("contact.form.message")}</label>
                        <textarea
                            id="question"
                            name="question"
                            rows={6}
                            placeholder={t("contact.form.messagePlaceholder")}
                            value={form.question}
                            onChange={handleChange}
                        ></textarea>
                        <button type="submit">{t("contact.form.submit")}</button>
                        <p>{t("contact.form.consent")}</p>
                    </form>
                </div>
            </div>
        </section>
    )
}