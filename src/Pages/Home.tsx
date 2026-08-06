import { useEffect, useRef, useState } from "react"
import Hero from "../components/Hero"
import Sidebar from "../components/Sidebar"
import "../Home.css"
import type { Car } from "../Types/car"
import Contact from "../components/Contact"
import About from "../components/About"
import SEO from "../seo/SEO"
import { localBusinessSchema } from "../seo/schema"

export default function Home() {

  const [cars, setCars] = useState<Car[]>([])

  const carsRef = useRef<HTMLDivElement | null>(null)

  const heroRef = useRef<HTMLDivElement | null>(null)

  const contactRef = useRef<HTMLDivElement | null>(null)

  const aboutRef = useRef<HTMLDivElement | null>(null)

  const scrollToCars = () => {
    carsRef.current?.scrollIntoView({
      behavior: "smooth"
    })
  }

  const scrollToHero = () => {
    heroRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    fetch("https://my-avto-backend.onrender.com/")
      .then((res) => res.json())
      .then((data: unknown) => setCars((data as Car[]).map((item) => ({ ...item, id: item.id ?? item._id }))))
      .catch((err) => console.log(err));
  }, [])

  return (
    <>
      <SEO
        title="Hodiy Avto — Toshkent Avtomobil Sotuv Markazi"
        description="Hodiy Avto — Toshkentdagi professional avtomobil sotuv markazi. Sifatli tekshirilgan avtomobillarni eng yaxshi narxda toping. 500+ mashina, 5 yil tajriba."
        url="https://hodiyavto.uz/"
        image="/logo.png"
        type="website"
        locale="uz_UZ"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }}
      />

      <div ref={heroRef}>
        <Hero
          scrollToCars={scrollToCars}
          scrollToHero={scrollToHero}
          scrollToContact={scrollToContact}
          scrollToAbout={scrollToAbout}
        />
      </div>

      <div ref={carsRef}>
        <Sidebar cars={cars} />
      </div>

      <div ref={aboutRef}>
        <About />
      </div>

      <div ref={contactRef}>
        <Contact/>
      </div>
    </>

  )
}
