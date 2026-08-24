import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { HiBackward } from "react-icons/hi2"
import { IoSend } from "react-icons/io5"
import { Link } from "react-router-dom"
import { fetchWithRetry } from "../utils/api"
import SEO from "../seo/SEO"
import "../Home.css"
import "./AiChat.css"

type Message = {
    role: "user" | "ai"
    text: string
}

type AiResponse = {
    response?: string
}

export default function AiChat() {
    const { t } = useTranslation()
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)
    const [pageLoading, setPageLoading] = useState(true)
    const bottomRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages, loading])

    useEffect(() => {
        const timer = setTimeout(() => setPageLoading(false), 500)
        return () => clearTimeout(timer)
    }, [])

    async function sendMessage() {
        const prompt = input.trim()
        if (!prompt || loading) return

        setInput("")
        setMessages((prev) => [...prev, { role: "user", text: prompt }])
        setLoading(true)

        try {
            const data = await fetchWithRetry(`${import.meta.env.VITE_API_URL}/ai`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt }),
            }) as AiResponse

            setMessages((prev) => [
                ...prev,
                { role: "ai", text: data.response ?? t("aiChat.error") },
            ])
        } catch (err) {
            setMessages((prev) => [...prev, { role: "ai", text: t("aiChat.error") }])
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <SEO
                title={t("aiChat.title") + " — Hodiy Avto"}
                description={t("aiChat.subtitle")}
                url="https://hodiyavto.uz/ai-chat"
                image="/logo.png"
                type="website"
                locale="uz_UZ"
            />
            <div className="container">
                <div className="fav-back">
                    <Link to={'/'}>
                        <div className="back-btn">
                            <HiBackward /> {t("favorites.back")}
                        </div>
                    </Link>
                </div>
                <div className="ai-chat-page">
                    {pageLoading ? (
                        <div className="ai-chat-skeleton" aria-hidden="true">
                            <div className="ai-skel ai-skel-title" />
                            <div className="ai-skel ai-skel-subtitle" />
                            <div className="ai-skel-window">
                                <div className="ai-skel-messages">
                                    <div className="ai-skel ai-skel-msg left w-60" />
                                    <div className="ai-skel ai-skel-msg right w-45" />
                                    <div className="ai-skel ai-skel-msg left w-70" />
                                    <div className="ai-skel ai-skel-msg right w-50" />
                                </div>
                                <div className="ai-skel-input-row">
                                    <div className="ai-skel ai-skel-input" />
                                    <div className="ai-skel ai-skel-btn" />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <h1 className="ai-chat-title">{t("aiChat.title")}</h1>
                            <p className="ai-chat-subtitle">{t("aiChat.subtitle")}</p>

                            <div className="ai-chat-window">
                                <div className="ai-messages">
                            {messages.map((msg, i) => (
                                <div key={i} className={`ai-message ${msg.role === "user" ? "user" : "bot"}`}>
                                    {msg.text}
                                </div>
                            ))}
                            {loading && (
                                <div className="ai-message bot ai-typing">
                                    <span></span><span></span><span></span>
                                </div>
                            )}
                            <div ref={bottomRef} />
                            </div>

                            <div className="ai-input-row">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                                    placeholder={t("aiChat.placeholder")}
                                    disabled={loading}
                                />
                                <button
                                    className="ai-send-btn"
                                    onClick={sendMessage}
                                    disabled={loading || !input.trim()}
                                >
                                    <IoSend />
                                </button>
                            </div>
                        </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}
