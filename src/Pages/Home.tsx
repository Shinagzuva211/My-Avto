import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import Hero from "../components/Hero"
import CarCard from "../components/CarCard"
import "./Home.css"
import type { Car } from "../Types/car"
import Contact from "../components/Contact"
import About from "../components/About"
import Footer from "../components/Footer"
import SEO from "../seo/SEO"
import { localBusinessSchema } from "../seo/schema"
import { useTranslation } from "react-i18next"
import { fetchWithRetry } from "../utils/api"

export default function Home() {
  const { t } = useTranslation()

  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)

  const heroRef = useRef<HTMLDivElement | null>(null)
  const contactRef = useRef<HTMLDivElement | null>(null)
  const aboutRef = useRef<HTMLDivElement | null>(null)

  const scrollToHero = () => {
    heroRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    fetchWithRetry(`${import.meta.env.VITE_API_URL}/cars`)
      .then((data: unknown) => {
        setCars((data as Car[]).map((item) => ({ ...item, id: item.id ?? item._id })))
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }, [])

  const featuredCars = [
    ...cars.filter((car) => car.status !== "sold"),
  ].sort((a, b) => b.price - a.price).slice(0, 4)



  return (
    <>
      <SEO
        title={t("home.heroTitle") + " — Hodiy Avto"}
        description={t("home.heroText")}
        url="https://hodiyavto.uz/"
        image="/logo.png"
        type="website"
        locale="uz_UZ"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }}
      />
      <div ref={heroRef} id="home">
        <Hero
          scrollToHero={scrollToHero}
          scrollToContact={scrollToContact}
          scrollToAbout={scrollToAbout}
        />
      </div>
      <section className="featured-section" id="featured-cars">
        <div className="featured-header">
          <h2>{t("home.featuredCars")}</h2>
          <div className="featured-count">{t("home.carsCount", { count: cars.length })}</div>
          <Link to="/cars" className="view-all-btn">
            {t("home.viewAll")}
          </Link>
        </div>
        {loading ? (
          <div className="featured-grid">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="featured-skeleton" />
            ))}
          </div>
        ) : (
          <div className="featured-grid">
            {featuredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </section>
      <div ref={aboutRef} id="about">
        <About />
      </div>
      <div ref={contactRef} id="contact">
        <Contact />
      </div>
      <Footer />
    </>
  )
}
