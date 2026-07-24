import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSave } from "react-icons/fa";

export default function AddCar() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    brand: "",
    model: "",
    year: "",
    price: "",
    fuel: "Benzin",
    image: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newCar = {
      brand: form.brand,
      model: form.model,
      year: Number(form.year),
      price: Number(form.price),
      fuel: form.fuel,
      image: form.image,
    };

    fetch("http://localhost:3000/cars", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCar),
    })
      .then(() => {
        alert("Mashina muvaffaqiyatli qo'shildi!");
        navigate("/admin/cars");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="admin-page-header">
        <h1>Add Car</h1>
        <p>Yangi mashina qo'shish</p>
      </div>

      <div className="admin-form">
        <h2>Yangi Mashina Ma'lumotlari</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Brand</label>
              <input
                type="text"
                name="brand"
                placeholder="Masalan: BMW"
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
                placeholder="Masalan: X5"
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
                placeholder="Masalan: 2024"
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
                placeholder="Masalan: 45000"
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
                placeholder="https://example.com/car.jpg"
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
              onClick={() => navigate("/admin/cars")}
            >
              Bekor Qilish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
