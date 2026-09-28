import { lazy, Suspense } from "react"
import Home from "./Pages/Home"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { UserAuthProvider } from "./context/UserAuthContext"

const CarDetails = lazy(() => import("./Pages/Details"))
const Favorites = lazy(() => import("./Pages/Favorites"))
const ContactPage = lazy(() => import("./Pages/Contact"))
const AboutPage = lazy(() => import("./Pages/About"))
const AiChat = lazy(() => import("./Pages/AiChat"))
const UserLogin = lazy(() => import("./Pages/UserLogin"))

const AdminLogin = lazy(() => import("./Pages/AdminLogin"))
const AdminLayout = lazy(() => import("./Pages/AdminLayout"))
const Dashboard = lazy(() => import("./Pages/admin/Dashboard"))
const Cars = lazy(() => import("./Pages/admin/Cars"))
const AddCar = lazy(() => import("./Pages/admin/AddCar"))
const Orders = lazy(() => import("./Pages/admin/Orders"))
const Users = lazy(() => import("./Pages/admin/Users"))
const Settings = lazy(() => import("./Pages/admin/Settings"))

function RouteFallback() {
  return <div className="loading-text" style={{ padding: "40px 0", textAlign: "center" }} />
}

export default function App() {

  return (
    <AuthProvider>
      <UserAuthProvider>
        <BrowserRouter>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cars/:id" element={<CarDetails />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/ai-chat" element={<AiChat />} />
              <Route path="/login" element={<UserLogin />} />

              <Route path="/admin/login" element={<AdminLogin />} />

              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="cars" element={<Cars />} />
                <Route path="add-car" element={<AddCar />} />
                <Route path="orders" element={<Orders />} />
                <Route path="users" element={<Users />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </UserAuthProvider>
    </AuthProvider>
  )
}
