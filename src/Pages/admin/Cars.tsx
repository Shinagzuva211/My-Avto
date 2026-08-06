import { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useFavorites } from "../../context/useFavorites";

type Car = {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  fuel: string;
  image: string;
  condition?: string;
};

export default function Cars() {
  const [cars, setCars] = useState<Car[]>([]);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const { removeFromFavorites } = useFavorites();
  const [form, setForm] = useState({
    brand: "",
    model: "",
    year: "",
    price: "",
    fuel: "Benzin",
    image: "",
  });

  useEffect(() => {
    fetch("http://localhost:3000/cars")
      .then((res) => res.json())
      .then((data) => setCars(data.map((item) => ({ ...item, id: item.id ?? item._id }))))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id: number) => {
    if (!confirm("Mashinani o'chirishni xohlaysizmi?")) return;

    fetch(`http://localhost:3000/cars/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setCars((prev) => prev.filter((car) => car.id !== id));
        removeFromFavorites(id);
      })
      .catch((err) => console.log(err));
  };

  const handleEditClick = (car: Car) => {
    setEditingCar(car);
    setForm({
      brand: car.brand,
      model: car.model,
      year: String(car.year),
      price: String(car.price),
      fuel: car.fuel,
      image: car.image,
    });
  };

  const handleCloseModal = () => {
    setEditingCar(null);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCar) return;

    const updatedCar = {
      brand: form.brand,
      model: form.model,
      year: Number(form.year),
      price: Number(form.price),
      fuel: form.fuel,
      image: form.image,
    };

    fetch(`http://localhost:3000/cars/${editingCar.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedCar),
    })
      .then((res) => res.json())
      .then((data) => {
        setCars((prev) => prev.map((car) => (car.id === editingCar.id ? data : car)));
        setEditingCar(null);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="admin-page-header">
        <h1>Cars</h1>
        <p>Barcha mashinalarni boshqarish</p>
      </div>

      <div className="admin-table-wrapper">
        <div className="admin-table-header">
          <h2>Mashinalar ro'yxati ({cars.length})</h2>
          <Link to="/admin/add-car">
            <button className="btn btn-primary">
              <FaPlus /> Yangi Qo'shish
            </button>
          </Link>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Rasm</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Yil</th>
              <th>Narx</th>
              <th>Yoqilg'i</th>
              <th>Amallar</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car.id}>
                <td>
                  <img
                    className="admin-table-img"
                    src={car.image}
                    alt={`${car.brand} ${car.model}`}
                  />
                </td>
                <td>{car.brand}</td>
                <td>{car.model}</td>
                <td>{car.year}</td>
                <td>${car.price.toLocaleString()}</td>
                <td>{car.fuel}</td>
                <td>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      className="btn btn-edit"
                      onClick={() => handleEditClick(car)}
                    >
                      <FaEdit /> Tahrirlash
                    </button>
                    <button
                      className="btn btn-delete"
                      onClick={() => handleDelete(car.id)}
                    >
                      <FaTrash /> O'chirish
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
              <h2>Mashinani Tahrirlash</h2>
              <button className="modal-close" onClick={handleCloseModal}>
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleUpdate}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Brand</label>
                  <input
                    type="text"
                    name="brand"
                    value={form.brand}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Model</label>
                  <input
                    type="text"
                    name="model"
                    value={form.model}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Yil</label>
                  <input
                    type="number"
                    name="year"
                    min="1990"
                    max="2030"
                    value={form.year}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Narx ($)</label>
                  <input
                    type="number"
                    name="price"
                    min="0"
                    value={form.price}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Yoqilg'i Turi</label>
                  <select name="fuel" value={form.fuel} onChange={handleChange}>
                    <option value="Benzin">Benzin</option>
                    <option value="Gibrid">Gibrid</option>
                    <option value="Elektra">Elektr</option>
                    <option value="Dizel">Dizel</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Rasm URL</label>
                  <input
                    type="url"
                    name="image"
                    value={form.image}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  <FaSave /> Saqlash
                </button>
                <button
                  type="button"
                  className="btn btn-edit"
                  onClick={handleCloseModal}
                >
                  Bekor Qilish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
