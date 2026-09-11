import "../Home.css"
import { useEffect, useState } from "react";
import Header from "./Header";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { BiCar } from "react-icons/bi";
import { BsCarFrontFill } from "react-icons/bs";
import { MdCall } from "react-icons/md";
import { GoPeople, GoShieldCheck } from "react-icons/go";
import { useTranslation } from "react-i18next";

function useIsMobile() {
    const [isMobile, setIsMobile] = useState(() =>
        typeof window !== "undefined" && window.matchMedia("(max-width: 700px)").matches
    );

    useEffect(() => {
        const mql = window.matchMedia("(max-width: 700px)");
        const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mql.addEventListener("change", onChange);
        return () => mql.removeEventListener("change", onChange);
    }, []);

    return isMobile;
}

type HeroProps = {
    scrollToCars: () => void;
    scrollToHero: () => void;
    scrollToContact: () => void;
    scrollToAbout: () => void;
}

export default function Hero({
    scrollToCars,
    scrollToHero,
    scrollToContact,
    scrollToAbout
}: HeroProps) {

    const { t } = useTranslation();
    const isMobile = useIsMobile();

    const leftSide = (
        <div className="left-side">
            <p className="dream-title">
                {t("home.heroTitle")}
            </p>

            <h1 className="hero-title">
                {t("home.heroSubtitle")}
            </h1>

            <p className="hero-text">
                {t("home.heroText")}
            </p>

            <div className="hero-btns">

                <div className="browse-btn">
                    <button onClick={scrollToCars}> <span><BsCarFrontFill /></span> {t("home.browseCars")} </button>
                </div>

                <div className="contact-btn">
                    <button onClick={scrollToContact}> <span><MdCall /></span> {t("home.contactUs")} </button>
                </div>

            </div>
        </div>
    );

    const statsPanel = (
        <div className="static-panel">

            <div className="static-card">

                <div className="icon">
                    <BiCar />
                </div>

                <div className="card-right">
                    <div className="card-num">
                        500+
                    </div>

                    <p>{t("home.carsCount")}</p>
                </div>

            </div>

            <div className="line"></div>

            <div className="static-card">

                <div className="icon">
                    <GoPeople />
                </div>

                <div className="card-right">
                    <div className="card-num">
                        1200+
                    </div>

                    <p>{t("home.happyClients")}</p>
                </div>

            </div>

            <div className="line"></div>

            <div className="static-card">

                <div className="icon">
                    <BiCar />
                </div>

                <div className="card-right">
                    <div className="card-num">
                        5 Yil+
                    </div>

                    <p>{t("home.experience")}</p>
                </div>

            </div>

            <div className="line"></div>

            <div className="static-card">

                <div className="icon">
                    <GoShieldCheck />
                </div>

                <div className="card-right">
                    <div className="card-num">
                        100%
                    </div>

                    <p>{t("home.reliability")}</p>
                </div>

            </div>

        </div>
    );

    return (
        <>
            <div className="background">
                <Header
                    scrollToCars={scrollToCars}
                    scrollToHero={scrollToHero}
                    scrollToContact={scrollToContact}
                    scrollToAbout={scrollToAbout}
                />

                <div className="container">

                    {isMobile ? (
                        <div className="hero-swiper-wrap">
                            <Swiper
                                className="hero-swiper"
                                modules={[Pagination]}
                                pagination={{ clickable: true }}
                                slidesPerView={1}
                                spaceBetween={0}
                                grabCursor
                            >
                                    <SwiperSlide className="hero-slide">{leftSide}</SwiperSlide>
                                    <SwiperSlide className="hero-slide">{statsPanel}</SwiperSlide>
                            </Swiper>
                        </div>
                    ) : (
                        <>
                            {leftSide}
                            {statsPanel}
                        </>
                    )}

                </div>

            </div>

        </>
    )
}