import { NavLink } from "react-router-dom";
import { BsHouseCheckFill, BsCarFrontFill } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { BiBox } from "react-icons/bi";
import { GoPeople } from "react-icons/go";
import { SlSettings } from "react-icons/sl";

const menuItems = [
  { to: "/admin", icon: <BsHouseCheckFill />, label: "Dashboard", end: true },
  { to: "/admin/cars", icon: <BsCarFrontFill />, label: "Cars" },
  { to: "/admin/add-car", icon: <FaPlus />, label: "Add Car" },
  { to: "/admin/orders", icon: <BiBox />, label: "Orders" },
  { to: "/admin/users", icon: <GoPeople />, label: "Users" },
  { to: "/admin/settings", icon: <SlSettings />, label: "Settings" },
];

export default function AdminSidebar() {
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
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "sidebar-link-active" : ""}`
            }
          >
            <span className="sidebar-link-icon">{item.icon}</span>
            <span className="sidebar-link-text">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-footer-text">Hodiy Avto Admin Panel</div>
      </div>
    </aside>
  );
}
