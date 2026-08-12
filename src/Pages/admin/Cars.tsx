import { useEffect, useState } from "react"
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa"
import { Link } from "react-router-dom"
import { useFavorites } from "../../context/useFavorites"
import { useTranslation } from "react-i18next"
import { getAuthHeader } from "../../context/AuthContext"

type Car = {
  id: number
  _id?: string
  brand: string
  model: string
  year: number
  price: number
  fuel: string
  image: string
  condition?: string
}

export default function Cars() {
  const { t } = useTranslation()
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)
  const [editingCar, setEditingCar] = useState<Car | null>(null)
  const { removeFromFavorites } = useFavorites()
  const [form, setForm] = useState({
    brand: "",
    model: "",
    year: "",
    price: "",
    fuel: "Benzin",
    image: "",
  })

  const apiUrl = import.meta.env.VITE_API_URL
  const authHeader = getAuthHeader()

  useEffect(() => {
    fetch(`${apiUrl}/cars`, { headers: authHeader })
      .then((res) => {
        if (!res.ok) {
          return res.text().then(text => {
            throw new Error(text || "Failed to fetch cars");
          });
        }
        return res.json();
      })
      .then((data: unknown) => {
        setCars((data as Car[]).map((item) => ({ ...item, id: item.id ?? item._id })))
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }, [])

  const handleDelete = (id: number) => {
    if (!confirm(t("common_confirm"))) return
    fetch(`${apiUrl}/cars/${id}`, { method: "DELETE", headers: authHeader })
      .then((res) => {
        if (!res.ok) {
          return res.text().then(text => {
            throw new Error(text || "Failed to delete car");
          });
        }
      })
      .then(() => {
        setCars((prev) => prev.filter((car) => car.id !== id))
        removeFromFavorites(id)
      })
      .catch((err) => console.log(err))
  }

  const handleEditClick = (car: Car) => {
    setEditingCar(car)
    setForm({
      brand: car.brand,
      model: car.model,
      year: String(car.year),
      price: String(car.price),
      fuel: car.fuel,
      image: car.image,
    })
  }

  const handleCloseModal = () => {
    setEditingCar(null)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingCar) return

    const updatedCar = {
      brand: form.brand,
      model: form.model,
      year: Number(form.year),
      price: Number(form.price),
      fuel: form.fuel,
      image: form.image,
    }

    fetch(`${apiUrl}/cars/${editingCar.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...authHeader },
      body: JSON.stringify(updatedCar),
    })
      .then((res) => {
        if (!res.ok) {
          return res.text().then(text => {
            throw new Error(text || "Failed to update car");
          });
        }
        return res.json();
      })
      .then((data) => {
        setCars((prev) => prev.map((car) => (car.id === editingCar.id ? data : car)))
        setEditingCar(null)
      })
      .catch((err) => console.log(err))
  }

  return (
    <div>
      <div className="admin-page-header">
        <h1>{t("admin.cars")}</h1>
        <p>{t("admin.manageCars")}</p>
      </div>
      <div className="admin-table-wrapper">
        <div className="admin-table-header">
          <h2>{t("admin.carsList")} ({cars.length})</h2>
          <Link to="/admin/add-car">
            <button className="btn btn-primary">
              <FaPlus /> {t("admin.addCar")}
            </button>
          </Link>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>{t("car.image")}</th>
              <th>{t("car.brand")}</th>
              <th>{t("car.model")}</th>
              <th>{t("car.year")}</th>
              <th>{t("car.price")}</th>
              <th>{t("car.fuel")}</th>
              <th>{t("common.actions")}</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="loading-text">{t("home.loadingCars")}</td>
              </tr>
            ) : cars.map((car) => (
              <tr key={car.id}>
                <td>
                  <img className="admin-table-img" src={car.image} alt={`${car.brand} ${car.model}`} />
                </td>
                <td>{car.brand}</td>
                <td>{car.model}</td>
                <td>{car.year}</td>
                <td>${car.price.toLocaleString()}</td>
                <td>{car.fuel}</td>
                <td>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button className="btn btn-edit" onClick={() => handleEditClick(car)}>
                      <FaEdit /> {t("common.edit")}
                    </button>
                    <button className="btn btn-delete" onClick={() => handleDelete(car.id)}>
                      <FaTrash /> {t("common.delete")}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editingCar && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{t("common.edit")} {t("admin.cars").slice(0, -1)}</h2>
              <button className="modal-close" onClick={handleCloseModal}>
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleUpdate}>
              <div className="form-grid">
                <div className="form-group">
                  <label>{t("car.brand")}</label>
                  <input type="text" name="brand" value={form.brand} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>{t("car.model")}</label>
                  <input type="text" name="model" value={form.model} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>{t("car.year")}</label>
                  <input type="number" name="year" min="1990" max="2030" value={form.year} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>{t("car.price")} ($)</label>
                  <input type="number" name="price" min="0" value={form.price} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>{t("car.fuel")}</label>
                  <select name="fuel" value={form.fuel} onChange={handleChange}>
                    <option value="Benzin">Benzin</option>
                    <option value="Gibrid">Gibrid</option>
                    <option value="Elektra">Elektr</option>
                    <option value="Dizel">Dizel</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>{t("car.image")} URL</label>
                  <input type="url" name="image" value={form.image} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  <FaSave /> {t("common.save")}
                </button>
                <button type="button" className="btn btn-edit" onClick={handleCloseModal}>
                  {t("common.cancel")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}