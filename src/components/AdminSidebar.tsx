import { NavLink } from "react-router-dom"
import { BsHouseCheckFill, BsCarFrontFill } from "react-icons/bs"
import { FaPlus } from "react-icons/fa"
import { BiBox } from "react-icons/bi"
import { GoPeople } from "react-icons/go"
import { SlSettings } from "react-icons/sl"
import { useTranslation } from "react-i18next"

export default function AdminSidebar() {
  const { t } = useTranslation()

  const menuItems = [
    { to: "/admin", icon: <BsHouseCheckFill />, label: t("admin.dashboard"), end: true },
    { to: "/admin/cars", icon: <BsCarFrontFill />, label: t("admin.cars") },
    { to: "/admin/add-car", icon: <FaPlus />, label: t("admin.addCar") },
    { to: "/admin/orders", icon: <BiBox />, label: t("admin.orders") },
    { to: "/admin/users", icon: <GoPeople />, label: t("admin.users") },
    { to: "/admin/settings", icon: <SlSettings />, label: t("admin.settings") },
  ]

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-brand">
        <BsHouseCheckFill className="sidebar-brand-icon" />
        <span>Hodiy Avto</span>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => `sidebar-link ${isActive ? "sidebar-link-active" : ""}`}
          >
            <span className="sidebar-link-icon">{item.icon}</span>
            <span className="sidebar-link-text">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-footer">
        <div className="sidebar-footer-text">{t("admin.dashboard")} Panel</div>
      </div>
    </aside>
  )
}