import { FaCheck, FaHryvnia, FaPhoneAlt } from "react-icons/fa";
import { FaBolt } from "react-icons/fa6";
import "./About.css";
import SEO from "../seo/SEO";

export default function About() {
  return (
    <>
      <SEO
        title="Biz haqimizda — Hodiy Avto"
        description="Hodiy Avto — 2024-yildan buyon Toshkent bozorida sifatli va tekshirilgan avtomobillarni taklif qiluvchi avtosalon. 98% qayta murojaat."
        url="https://hodiyavto.uz/about"
        image="/logo.png"
        type="website"
        locale="uz_UZ"
      />

      <section className="about-section">
      <div className="about-container">

        <div className="about-content">
          <div className="kontakt-title">Biz haqimizda</div>
          <h2 className="about-title">Ishonchdan tug'ilgan avtosalon</h2>
          <p className="about-text">
            2024-yildan buyon Hodiy Avto Toshkent bozorida sifatli va
            tekshirilgan avtomobillarni taklif qilib kelmoqda. Bizning
            maqsadimiz — har bir mijoz uchun mashina sotib olishni oddiy,
            shaffof va tashvishsiz jarayonga aylantirish.
          </p>

          <div className="about-features">
            <div className="feature-card">
              <div className="feature-icon">
                <FaCheck />
              </div>
              <div>
                <h4>Sifat kafolati</h4>
                <p>Har bir avtomobil 120 nuqtali tekshiruvdan o'tadi.</p>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <FaHryvnia />
              </div>
              <div>
                <h4>Shaffof narxlar</h4>
                <p>Yashirin to'lovlarsiz, aniq va halol narxlash.</p>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <FaBolt />
              </div>
              <div>
                <h4>Tezkor rasmiylashtirish</h4>
                <p>Hujjatlar bir kun ichida to'liq tayyor bo'ladi.</p>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <FaPhoneAlt />
              </div>
              <div>
                <h4>Doimiy aloqa</h4>
                <p>Sotuvdan keyin ham savollaringizga javob beramiz.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="about-stat">
          <div className="stat-label">HODIY AVTO · SHOWROOM</div>
          <div className="stat-percent">98%</div>
          <div className="stat-desc">Qayta murojaat qiluvchi mijozlar</div>
        </div>

      </div>
    </section>
    </>
  );
}
