import { useEffect, useRef, useState } from "react"
import Hero from "../components/Hero"
import Sidebar from "../components/Sidebar"
import "../Home.css"
import type { Car } from "../Types/car"
import Contact from "../components/Contact"
import About from "../components/About"
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
    fetch("http://localhost:3000/cars")
      .then((res) => res.json())
      .then((data) => setCars(data))
      .catch((err) => console.log(err));
  }, [])

  return (
    <>
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
