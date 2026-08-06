import { useState } from "react";
import SEO from "../seo/SEO";
import "./Contact.css";
import {
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
    FaClock,
} from "react-icons/fa";

export default function Contact() {
    const [form, setForm] = useState({ name: "", phone: "", model: "", question: "" });
    const [submitted, setSubmitted] = useState(false);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSubmitted(true);
        setForm({ name: "", phone: "", model: "", question: "" });
    }

    return (
        <section id="contact">

            <SEO
                title="Kontakt — Hodiy Avto"
                description="Hodiy Avto bilan bog'laning. Toshkentdagi avtomobil sotuv markazi. Manzil, telefon, email va murojaat formasi."
                url="https://hodiyavto.uz/contact"
                image="/logo.png"
                type="website"
                locale="uz_UZ"
            />

            <div className="contact-header">
                <div className="kontakt-title">
                    Kontakt
                </div>
                <h1>Biz bilan bog'laning</h1>
                <p>
                    Savollaringiz bormi yoki ko'rib chiqish uchun uchrashuv belgilamoqchimisiz? Quyidagi forma orqali yozing — tez orada bog'lanamiz.
                </p>
            </div>

            <div className="contact-wrapper">

                <div className="contact-info">

                    <h2>Bog'laning</h2>

                    <div className="contact-item">

                        <div className="icon-box">
                            <FaMapMarkerAlt />
                        </div>

                        <div>
                            <h4>Manzil</h4>
                            <p>Toshkent, O'zbekiston</p>
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
                        <span>Mon - Sat | 09:00 - 18:00</span>
                    </div>

                </div>

                <div className="contact-form">

                    {submitted && (
                        <div className="success-message">
                            ✓ Xabaringiz qabul qilindi. Tez orada siz bilan bog'lanamiz.
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Ismingizni kiriting"
                            value={form.name}
                            onChange={handleChange}
                        />

                        <input
                            type="tel"
                            name="phone"
                            placeholder="+998__ ___ __ __"
                            value={form.phone}
                            onChange={handleChange}
                        />

                        <label htmlFor="model">Qiziqtirgan model (ixtiyoriy)</label>

                        <input
                            type="text"
                            id="model"
                            name="model"
                            placeholder="Masalan: Chevrolet Malibu"
                            value={form.model}
                            onChange={handleChange}
                        />

                        <label htmlFor="question">Xabaringiz</label>
                        <textarea
                            id="question"
                            name="question"
                            rows={6}
                            placeholder="Savolingizni yozing..."
                            value={form.question}
                            onChange={handleChange}
                        ></textarea>

                        <button type="submit">Send Message</button>

                        <p>Formani yuborish orqali siz bizning menejerimiz siz bilan bog'lanishiga rozilik bildirasiz.</p>
                    </form>

                </div>



            </div>

        </section>
    );
}