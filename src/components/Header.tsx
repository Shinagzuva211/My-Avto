import { GoHeart, GoHeartFill } from "react-icons/go"
import logo from "../../public/logo2.png"
import logo2 from "../../public/logo.png"
import "../Home.css"
import { BiMenu } from "react-icons/bi"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

type HeroProps = {
    scrollToCars: () => void;
    scrollToHero: () => void;
    scrollToContact: () => void;
    scrollToAbout: () => void;
}

export default function Header({ scrollToCars, scrollToHero, scrollToContact, scrollToAbout }: HeroProps) {

    const [show, setShow] = useState<boolean>(false)

    const [scrolled, setScrolled] = useState<boolean>(false)

    useEffect(() => {

        const handleScroll = () => {

            setScrolled(window.scrollY > 50)

            console.log(window.scrollY);
        };

        handleScroll()
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const openMenu = () => {
        if (show === true) {
            setShow(false)
        } else {
            setShow(true)
        }
    }

    return (
        <>

            <header className={scrolled ? "scrolled" : ""}>

                <div className="container">

                    <div className="header-content">

                        <div className="logo">
                            <img className="dark" src={logo} alt="Hodiy Avto logo" />
                            <img className="light" src={logo2} alt="Hodiy Avto logo" />
                            <h1 className="logo-title">AVTO</h1>
                        </div>

                        <nav>
                            <a href="#" onClick={(e) => {
                                e.preventDefault();
                                scrollToHero();
                            }}>Bosh sahifa</a>
                            <a href="#" onClick={(e) => {
                                e.preventDefault();
                                scrollToCars();
                            }}
                            >Mashinalar</a>
                            <a href="#" onClick={(e) => {
                                e.preventDefault();
                                scrollToAbout();
                            }}>Biz haqimizda</a>
                            <a href="#" onClick={(e) => {
                                e.preventDefault();
                                scrollToContact();
                            }}>Kontakt</a>
                        </nav>

                        <div className="head-right">
                            <div className="menu" onClick={openMenu}>
                                <BiMenu />

                                {show && (
                                    <div className="menu-tab">
                                        <p className="menu-p">Bosh sahifa</p>
                                        <p className="menu-p" onClick={scrollToCars}>Mashinalar</p>
                                        <p className="menu-p" onClick={scrollToAbout}>Biz haqimizda</p>
                                        <p className="menu-p" onClick={scrollToContact}>Kontakt</p>
                                    </div>
                                )}
                            </div>

                            <Link to={'/favorites'}>
                                <div className="favorites">
                                    <GoHeart className="heart" />
                                    <GoHeartFill className="heart-fill" />
                                </div>
                            </Link>

                        </div>

                    </div>

                </div>

            </header>

        </>
    )
}
