import { GoGitCompare, GoHeart, GoHeartFill } from "react-icons/go"
import logo from "../../public/logo-dark.webp"
import logo2 from "../../public/logo-light.webp"
import "./Header.css"
import {  BiMenu } from "react-icons/bi"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import LanguageSwitcher from "./LanguageSwitcher"
import { useUserAuth } from "../context/useUserAuth"
import { FaUserPlus, FaUser } from "react-icons/fa"

type HeroProps = {
    scrollToHero: () => void;
    scrollToContact: () => void;
    scrollToAbout: () => void;
}


export default function Header({ scrollToHero, scrollToContact, scrollToAbout }: HeroProps) {


    const [show, setShow] = useState<boolean>(false)
    const { t } = useTranslation()
    const navigate = useNavigate()
    const { user: userAccount, logout: userLogout } = useUserAuth()

    const [scrolled, setScrolled] = useState<boolean>(false)

    useEffect(() => {

        const handleScroll = () => {

            setScrolled(window.scrollY > 50)
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
                            <span className="logo-title">AVTO</span>
                        </div>
                        <nav>
                            <a href="#" onClick={(e) => {
                                e.preventDefault();
                                scrollToHero();
                            }}>{t("nav.home")}</a>
                            <Link to="/cars">{t("nav.cars")}</Link>
                            <a href="#" onClick={(e) => {
                                e.preventDefault();
                                scrollToAbout();
                            }}>{t("nav.about")}</a>
                            <a href="#" onClick={(e) => {
                                e.preventDefault();
                                scrollToContact();
                            }}>{t("nav.contact")}</a>
                            <Link to="/ai-chat">{t("nav.ai")}</Link>
                        </nav>

                        <div className="head-right">
                            <LanguageSwitcher />
                            {userAccount ? (
                                <div className="user-account">
                                    <FaUser className="user-icon" />
                                    <span className="user-name">{userAccount.name}</span>
                                    <button className="logout-btn" onClick={() => userLogout()}>
                                        {t("auth.logout")}
                                    </button>
                                </div>
                            ) : (
                                <button className="account-btn" onClick={() => navigate("/login")}>
                                    <FaUserPlus /> <span className="account-span">{t("nav.account")}</span>
                                </button>
                            )}
                            <div className="menu" onClick={openMenu}>
                                <BiMenu />
                                {show && (
                                    <div className="menu-tab">
                                        <p className="menu-p" onClick={scrollToHero}>{t("nav.home")}</p>
                                        <Link to="/cars" onClick={() => setShow(false)}>
                                            <p className="menu-p">{t("nav.cars")}</p>
                                        </Link>
                                        <p className="menu-p" onClick={scrollToAbout}>{t("nav.about")}</p>
                                        <p className="menu-p" onClick={scrollToContact}>{t("nav.contact")}</p>
                                        <Link to="/ai-chat" onClick={() => setShow(false)}>
                                            <p className="menu-p">{t("nav.ai")}</p>
                                        </Link>
                                    </div>
                                )}
                            </div>
                            <Link to={'/favorites'}>
                                <div className="favorites" title={t("nav.favorites")}>
                                    <GoHeart className="heart" />
                                    <GoHeartFill className="heart-fill" />
                                </div>
                            </Link>
                            <Link to={'/compare'}>
                                <div className="compare2" title="Taqqoslash" style={{ marginLeft: 12 }}>
                                    <span style={{ margin: 0 }}><GoGitCompare className="compare-icon"/></span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}
