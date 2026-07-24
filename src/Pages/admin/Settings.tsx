import { useState } from "react";
import { FaSave } from "react-icons/fa";

export default function Settings() {
  const [form, setForm] = useState({
    siteName: "Hodiy Avto",
    email: "info@hodiyavto.uz",
    phone: "+998 90 123 45 67",
    address: "Toshkent shahri, Amir Temur ko'chasi 108",
    description: "Hodiy Avto — O'zbekistondagi eng ishonchli avto savdo platformasi.",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Settings muvaffaqiyatli saqlandi!");
  };

  return (
    <div>
      <div className="admin-page-header">
        <h1>Settings</h1>
        <p>Sayt sozlamalarini boshqarish</p>
      </div>

      <div className="admin-form">
        <h2>Umumiy Sozlamalar</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Sayt Nomi</label>
              <input
                type="text"
                name="siteName"
                value={form.siteName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Telefon</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Manzil</label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full-width">
              <label>Tavsif</label>
              <textarea
                name="description"
                rows={4}
                value={form.description}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              <FaSave /> Saqlash
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
