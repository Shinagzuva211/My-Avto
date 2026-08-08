import "../Home.css"
import Header from "./Header";
import { BiCar } from "react-icons/bi";
import { BsCarFrontFill } from "react-icons/bs";
import { MdCall } from "react-icons/md";
import { GoPeople, GoShieldCheck } from "react-icons/go";
import { useTranslation } from "react-i18next";

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

                    <div className="left-side">
                        <div className="dream-title">
                            {t("home.heroTitle")}
                        </div>

                        <div className="hero-title">
                            {t("home.heroSubtitle")}
                        </div>

                        <div className="hero-text">
                            {t("home.heroText")}
                        </div>

                        <div className="hero-btns">

                            <div className="browse-btn">
                                <button onClick={scrollToCars}> <span><BsCarFrontFill /></span> {t("home.browseCars")} </button>
                            </div>

                            <div className="contact-btn">
                                <button onClick={scrollToContact}> <span><MdCall /></span> {t("home.contactUs")} </button>
                            </div>

                        </div>
                    </div>

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

                </div>

            </div>

        </>
    )
}