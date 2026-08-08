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
    condition: "new",
    color: "",
    transmission: "Avtomat",
    mileage: "",
    engine: "",
    driveType: "FWD",
    description: "",
    features: "",
  });

  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "number") {
      setForm({ ...form, [name]: value === "" ? "" : Number(value) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Faqat rasm fayllarini tanlang");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Rasm hajmi 5MB dan katta bo'lmasligi kerak");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setForm({ ...form, image: base64 });
      setPreview(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const featuresArray = form.features
      .split(",")
      .map((f: string) => f.trim())
      .filter((f: string) => f.length > 0);

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
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/cars`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCar),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `Server xatosi: ${res.status}`);
      }

      alert("Mashina muvaffaqiyatli qo'shildi!");
      navigate("/admin/cars");
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : "Mashina qo'shishda xatolik yuz berdi");
    }
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
              <label>Holati</label>
              <select name="condition" value={form.condition} onChange={handleChange}>
                <option value="new">Yangi</option>
                <option value="used">Ishlatilgan</option>
              </select>
            </div>

            <div className="form-group">
              <label>Rang</label>
              <input
                type="text"
                name="color"
                placeholder="Masalan: Qora, Oq, Metallik"
                value={form.color}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Uzatma</label>
              <select name="transmission" value={form.transmission} onChange={handleChange}>
                <option value="Avtomat">Avtomat</option>
                <option value="Mexanika">Mexanika</option>
                <option value="Variator">Variator (CVT)</option>
                <option value="Robot">Robotizlangan</option>
              </select>
            </div>

            <div className="form-group">
              <label>Yurgan yo'li (km)</label>
              <input
                type="number"
                name="mileage"
                placeholder="Masalan: 15000"
                min="0"
                value={form.mileage}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Dvigatel</label>
              <input
                type="text"
                name="engine"
                placeholder="Masalan: 2.0T, 3.0 V6, 1.5 Hybrid"
                value={form.engine}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Yo'lga kuchlanish</label>
              <select name="driveType" value={form.driveType} onChange={handleChange}>
                <option value="FWD">Oldin burish (FWD)</option>
                <option value="RWD">Orqa burish (RWD)</option>
                <option value="AWD">To'liq burish (AWD/4WD)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Rasm File</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
              {preview && (
                <div style={{ marginTop: "10px" }}>
                  <img src={preview} alt="Preview" style={{ maxWidth: "200px", maxHeight: "150px", borderRadius: "8px", border: "1px solid #ddd" }} />
                </div>
              )}
            </div>

            <div className="form-group" style={{ gridColumn: "1 / -1" }}>
              <label>Tavsif</label>
              <textarea
                name="description"
                placeholder="Mashina haqida batafsil ma'lumot..."
                value={form.description}
                onChange={handleChange}
                rows={4}
                style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ddd", fontFamily: "inherit" }}
              />
            </div>

            <div className="form-group" style={{ gridColumn: "1 / -1" }}>
              <label>Xususiyatlar (vergul bilan ajratib yozing)</label>
              <input
                type="text"
                name="features"
                placeholder="Masalan: ABS, Konditsioner, O'rindiq isitish, Parktronik, Kamerali ko'rinish"
                value={form.features}
                onChange={handleChange}
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