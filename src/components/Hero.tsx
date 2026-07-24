import "../Home.css"
import Header from "./Header";
import { BiCar } from "react-icons/bi";
import { BsCarFrontFill } from "react-icons/bs";
import { MdCall } from "react-icons/md";
import { GoPeople, GoShieldCheck } from "react-icons/go";

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
                            SIZNING ORZUYINGIZDAGI MASHINA
                        </div>

                        <div className="hero-title">
                            Find Your Dream <span>Car</span>
                        </div>

                        <div className="hero-text">
                            Eng yaxshi narxlarda premium avtomobillarni toping va orzuyingizdagi mashinaga ega bo'ling.
                        </div>

                        <div className="hero-btns">

                            <div className="browse-btn">
                                <button onClick={scrollToCars}> <span><BsCarFrontFill /></span> Mashinalarni ko'rish </button>
                            </div>

                            <div className="contact-btn">
                                <button onClick={scrollToContact}> <span><MdCall /></span> Biz bilan aloqa </button>
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

                                <p>Mashinalar</p>
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

                                <p>Mamnun mijozlar</p>
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

                                <p>Tajriba</p>
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

                                <p> Ishonchilik </p>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>
    )
}
