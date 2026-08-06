import AdminLayout from "./Pages/AdminLayout"
import Dashboard from "./Pages/admin/Dashboard"
import Cars from "./Pages/admin/Cars"
import AddCar from "./Pages/admin/AddCar"
import Orders from "./Pages/admin/Orders"
import Users from "./Pages/admin/Users"
import Settings from "./Pages/admin/Settings"
import CarDetails from "./Pages/Details"
import Favorites from "./Pages/Favorites"
import Home from "./Pages/Home"
import ContactPage from "./Pages/Contact"
import AboutPage from "./Pages/About"
import { BrowserRouter, Routes, Route } from "react-router-dom"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/cars/:id" element={<CarDetails />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="cars" element={<Cars />} />
          <Route path="add-car" element={<AddCar />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}
