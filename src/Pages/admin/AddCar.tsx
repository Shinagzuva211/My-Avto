import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaSave } from "react-icons/fa"
import { useTranslation } from "react-i18next"
import { fetchWithRetry } from "../../utils/api"

export default function AddCar() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    brand: "",
    model: "",
    year: "",
    price: "",
    fuel: "Benzin",
    image: "",
    condition: "new",
    color: "",
    transmission: "Avtomat",
    mileage: "",
    engine: "",
    driveType: "FWD",
    description: "",
    features: "",
  })

  const [preview, setPreview] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    if (type === "number") {
      setForm({ ...form, [name]: value === "" ? "" : Number(value) })
    } else {
      setForm({ ...form, [name]: value })
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      alert(t("common.imageOnly"))
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert(t("common.maxSize"))
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      const base64 = reader.result as string
      setForm({ ...form, image: base64 })
      setPreview(base64)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const featuresArray = form.features
      .split(",")
      .map((f: string) => f.trim())
      .filter((f: string) => f.length > 0)

    const newCar = {
      brand: form.brand,
      model: form.model,
      year: Number(form.year),
      price: Number(form.price),
      fuel: form.fuel,
      image: form.image,
      condition: form.condition,
      color: form.color || undefined,
      transmission: form.transmission || undefined,
      mileage: form.mileage ? Number(form.mileage) : undefined,
      engine: form.engine || undefined,
      driveType: form.driveType || undefined,
      description: form.description || undefined,
      features: featuresArray.length > 0 ? featuresArray : undefined,
    }

    try {
      await fetchWithRetry(`${import.meta.env.VITE_API_URL}/cars`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCar),
      })

      alert(t("admin.carAdded"))
      navigate("/admin/cars")
    } catch (err) {
      console.error(err)
      alert(err instanceof Error ? err.message : t("admin.addCarError"))
    }
  }

  return (
    <div>
      <div className="admin-page-header">
        <h1>{t("admin.addCar")}</h1>
        <p>{t("admin.addCarDesc")}</p>
      </div>
      <div className="admin-form">
        <h2>{t("admin.newCarInfo")}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>{t("car.brand")}</label>
              <input type="text" name="brand" placeholder={t("car.brandPlaceholder")} value={form.brand} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>{t("car.model")}</label>
              <input type="text" name="model" placeholder={t("car.modelPlaceholder")} value={form.model} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>{t("car.year")}</label>
              <input type="number" name="year" placeholder={t("car.yearPlaceholder")} min="1990" max="2030" value={form.year} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>{t("car.price")} ($)</label>
              <input type="number" name="price" placeholder={t("car.pricePlaceholder")} min="0" value={form.price} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>{t("car.fuel")}</label>
              <select name="fuel" value={form.fuel} onChange={handleChange}>
                <option value="Benzin">{t("car.fuelBenzin")}</option>
                <option value="Gibrid">{t("car.fuelGibrid")}</option>
                <option value="Elektra">{t("car.fuelElektra")}</option>
                <option value="Dizel">{t("car.fuelDizel")}</option>
              </select>
            </div>
            <div className="form-group">
              <label>{t("car.condition")}</label>
              <select name="condition" value={form.condition} onChange={handleChange}>
                <option value="new">{t("car.conditionNew")}</option>
                <option value="used">{t("car.conditionUsed")}</option>
              </select>
            </div>
            <div className="form-group">
              <label>{t("car.color")}</label>
              <input type="text" name="color" placeholder={t("car.colorPlaceholder")} value={form.color} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>{t("car.transmission")}</label>
              <select name="transmission" value={form.transmission} onChange={handleChange}>
                <option value="Avtomat">{t("car.transmissionAuto")}</option>
                <option value="Mexanika">{t("car.transmissionManual")}</option>
                <option value="Variator">{t("car.transmissionCvt")}</option>
                <option value="Robot">{t("car.transmissionRobot")}</option>
              </select>
            </div>
            <div className="form-group">
              <label>{t("car.mileage")} (km)</label>
              <input type="number" name="mileage" placeholder={t("car.mileagePlaceholder")} min="0" value={form.mileage} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>{t("car.engine")}</label>
              <input type="text" name="engine" placeholder={t("car.enginePlaceholder")} value={form.engine} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>{t("car.driveType")}</label>
              <select name="driveType" value={form.driveType} onChange={handleChange}>
                <option value="FWD">{t("car.driveFwd")}</option>
                <option value="RWD">{t("car.driveRwd")}</option>
                <option value="AWD">{t("car.driveAwd")}</option>
              </select>
            </div>
            <div className="form-group">
              <label>{t("car.image")} File</label>
              <input type="file" name="image" accept="image/*" onChange={handleImageChange} required />
              {preview && (
                <div style={{ marginTop: "10px" }}>
                  <img src={preview} alt="Preview" style={{ maxWidth: "200px", maxHeight: "150px", borderRadius: "8px", border: "1px solid #ddd" }} />
                </div>
              )}
            </div>
            <div className="form-group" style={{ gridColumn: "1 / -1" }}>
              <label>{t("car.description")}</label>
              <textarea name="description" placeholder={t("car.descriptionPlaceholder")} value={form.description} onChange={handleChange} rows={4} style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ddd", fontFamily: "inherit" }} />
            </div>
            <div className="form-group" style={{ gridColumn: "1 / -1" }}>
              <label>{t("car.features")} ({t("common.commaSeparated")})</label>
              <input type="text" name="features" placeholder={t("car.featuresPlaceholder")} value={form.features} onChange={handleChange} />
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              <FaSave /> {t("common.save")}
            </button>
            <button type="button" className="btn btn-edit" onClick={() => navigate("/admin/cars")}>
              {t("common.cancel")}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}