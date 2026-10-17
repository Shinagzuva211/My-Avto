import { useState, type CSSProperties } from "react"
import { useTranslation } from "react-i18next"

interface CreditCalculatorProps {
  price: number
  carType?: "new" | "used"
}

type PaymentType = "annuity" | "differentiated"

export default function CreditCalculator({ price, carType = "new" }: CreditCalculatorProps) {
  const { t } = useTranslation()

  const [downPaymentPercent, setDownPaymentPercent] = useState(carType === "new" ? 20 : 30)
  const [interestRate, setInterestRate] = useState(carType === "new" ? 18 : 25)
  const [termMonths, setTermMonths] = useState(36)
  const [paymentType, setPaymentType] = useState<PaymentType>("annuity")

  const downPayment = (price * downPaymentPercent) / 100
  const loanAmount = price - downPayment

  const monthlyRate = interestRate / 100 / 12

  // Annuitet to'lov
  const annuityPayment =
    monthlyRate > 0 && loanAmount > 0
      ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
        (Math.pow(1 + monthlyRate, termMonths) - 1)
      : loanAmount / termMonths

  // Differensial to'lov
  const differentiatedFirstPayment =
    loanAmount > 0
      ? loanAmount / termMonths + loanAmount * monthlyRate
      : 0

  const monthlyPayment = paymentType === "annuity" ? annuityPayment : differentiatedFirstPayment

  const totalPayment = paymentType === "annuity" ? monthlyPayment * termMonths : 0
  const totalInterest =
    paymentType === "annuity"
      ? totalPayment - loanAmount
      : differentiatedFirstPayment * termMonths - loanAmount

  const formatMoney = (value: number) =>
    new Intl.NumberFormat("uz-UZ", { maximumFractionDigits: 0 }).format(Math.round(value))

  const getRecommendation = () => {
    if (interestRate <= 15 && downPaymentPercent >= 30) {
      return t("calculator.recommendations.excellent")
    }
    if (interestRate <= 20 && downPaymentPercent >= 20) {
      return t("calculator.recommendations.good")
    }
    return t("calculator.recommendations.average")
  }

  return (
    <div className="credit-calculator">
      <div className="calc-header">
        <h2 className="section-title">{t("calculator.title")}</h2>
        <div className="car-type-badge">
          {carType === "new" ? t("calculator.carTypeNew") : t("calculator.carTypeUsed")}
        </div>
      </div>

      <div className="calc-inputs">
        {/* Kredit turi */}
        <div className="calc-field payment-type-field">
          <label>{t("calculator.paymentType")}</label>
          <div className="payment-type-toggle">
            <button
              className={`payment-type-btn ${paymentType === "annuity" ? "active" : ""}`}
              onClick={() => setPaymentType("annuity")}
            >
              {t("calculator.annuity")}
            </button>
            <button
              className={`payment-type-btn ${paymentType === "differentiated" ? "active" : ""}`}
              onClick={() => setPaymentType("differentiated")}
            >
              {t("calculator.differentiated")}
            </button>
          </div>
        </div>

        {/* Avans to'lov */}
        <div className="calc-field">
          <label>
            {t("calculator.downPayment")} — {downPaymentPercent}%
          </label>
          <input
            type="range"
            min={carType === "new" ? 10 : 20}
            max={80}
            step={5}
            value={downPaymentPercent}
            onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
            style={{ "--progress": `${(((downPaymentPercent - (carType === "new" ? 10 : 20)) / (80 - (carType === "new" ? 10 : 20))) * 100).toFixed(1)}%` } as CSSProperties}
          />
          <div className="calc-field-value">${formatMoney(downPayment)}</div>
        </div>

        {/* Foiz stavkasi */}
        <div className="calc-field">
          <label>
            {t("calculator.rate")} — {interestRate}%
          </label>
          <input
            type="range"
            min={carType === "new" ? 10 : 15}
            max={50}
            step={1}
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            style={{ "--progress": `${(((interestRate - (carType === "new" ? 10 : 15)) / (50 - (carType === "new" ? 10 : 15))) * 100).toFixed(1)}%` } as CSSProperties}
          />
          <div className="calc-rate-info">
            {interestRate <= 15
              ? t("calculator.rateLow")
              : interestRate <= 25
                ? t("calculator.rateMedium")
                : t("calculator.rateHigh")}
          </div>
        </div>

        {/* Muddat */}
        <div className="calc-field">
          <label>
            {t("calculator.term")} — {termMonths} {t("calculator.months")}
          </label>
          <input
            type="range"
            min={6}
            max={84}
            step={6}
            value={termMonths}
            onChange={(e) => setTermMonths(Number(e.target.value))}
            style={{ "--progress": `${(((termMonths - 6) / (84 - 6)) * 100).toFixed(1)}%` } as CSSProperties}
          />
        </div>
      </div>

      <div className="calc-results">
        <div className="calc-result-card highlight">
          <div className="calc-result-label">{t("calculator.monthlyPayment")}</div>
          <div className="calc-result-value">${formatMoney(monthlyPayment)}</div>
          {paymentType === "differentiated" && (
            <div className="calc-result-note">{t("calculator.differentiatedNote")}</div>
          )}
        </div>
        <div className="calc-result-card">
          <div className="calc-result-label">{t("calculator.loanAmount")}</div>
          <div className="calc-result-value">${formatMoney(loanAmount)}</div>
        </div>
        <div className="calc-result-card">
          <div className="calc-result-label">{t("calculator.totalInterest")}</div>
          <div className="calc-result-value">${formatMoney(totalInterest)}</div>
        </div>
        <div className="calc-result-card">
          <div className="calc-result-label">{t("calculator.totalPayment")}</div>
          <div className="calc-result-value">
            ${formatMoney(totalPayment + downPayment)}
          </div>
        </div>
      </div>

      <div className="calc-recommendation">
        <span className="recommendation-icon">💡</span>
        <span>{getRecommendation()}</span>
      </div>
    </div>
  )
}
