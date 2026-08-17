import { useEffect, useRef, useState } from "react"
import Hero from "../components/Hero"
import Sidebar from "../components/Sidebar"
import "../Home.css"
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

  const carsRef = useRef<HTMLDivElement | null>(null)
  const heroRef = useRef<HTMLDivElement | null>(null)
  const contactRef = useRef<HTMLDivElement | null>(null)
  const aboutRef = useRef<HTMLDivElement | null>(null)

  const scrollToCars = () => {
    carsRef.current?.scrollIntoView({ behavior: "smooth" })
  }
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
          scrollToCars={scrollToCars}
          scrollToHero={scrollToHero}
          scrollToContact={scrollToContact}
          scrollToAbout={scrollToAbout}
        />
      </div>
      <div ref={carsRef} id="cars">
        {loading ? (
          <div className="loading-text">{t("home.loadingCars")}</div>
        ) : (
          <Sidebar cars={cars} />
        )}
      </div>
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