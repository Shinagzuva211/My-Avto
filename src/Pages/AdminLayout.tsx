import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import ProtectedRoute from "../components/ProtectedRoute";
import "../Pages/Admin.css";

export default function AdminLayout() {
  return (
    <ProtectedRoute>
      <div className="admin-layout">
        <AdminSidebar />
        <main className="admin-main">
          <Outlet />
        </main>
      </div>
    </ProtectedRoute>
  );
}
