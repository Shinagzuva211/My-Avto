import "./Contact.css";
import {
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
    FaClock,
} from "react-icons/fa";

export default function Contact() {
    return (
        <section id="contact">

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

                    <h2>Get In Touch</h2>

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

                    <input type="text" placeholder="Ismingizni kiriting" />

                    <input type="tel" placeholder="+998__ ___ __ __" />

                    <label htmlFor="model">Qiziqtirgan model (ixtiyoriy)</label>

                    <input type="text" id="model" placeholder="Masalan: Chevrolet Malibu" />

                    <label htmlFor="question">Xabaringiz</label>
                    <textarea
                        id="question"
                        rows={6}
                        placeholder="Savolingizni yozing..."
                    ></textarea>

                    <button>Send Message</button>

                    <p>Formani yuborish orqali siz bizning menejerimiz siz bilan bog'lanishiga rozilik bildirasiz.</p>

                </div>



            </div>

        </section>
    );
}