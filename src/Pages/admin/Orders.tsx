import { useState } from "react";

type Order = {
  id: number;
  customer: string;
  car: string;
  date: string;
  amount: number;
  status: "pending" | "completed" | "cancelled";
};

const initialOrders: Order[] = [
  { id: 1, customer: "Akmal Karimov", car: "BMW X5", date: "2026-07-20", amount: 45000, status: "completed" },
  { id: 2, customer: "Sardor Raximov", car: "Mercedes E-Class", date: "2026-07-19", amount: 52000, status: "pending" },
  { id: 3, customer: "Jasur Toshmatov", car: "Kia Sportage", date: "2026-07-18", amount: 28000, status: "completed" },
  { id: 4, customer: "Nodir Abdullayev", car: "Chevrolet Malibu", date: "2026-07-17", amount: 22000, status: "cancelled" },
  { id: 5, customer: "Otabek Mirzayev", car: "BMW 5 Series", date: "2026-07-16", amount: 58000, status: "pending" },
  { id: 6, customer: "Dilshod Karimov", car: "Mercedes C-Class", date: "2026-07-15", amount: 41000, status: "completed" },
  { id: 7, customer: "Farhod Normatov", car: "Kia Rio", date: "2026-07-14", amount: 16000, status: "pending" },
];

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const handleStatusChange = (id: number, newStatus: Order["status"]) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  const statusLabel = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return <span className="badge badge-pending">Kutilmoqda</span>;
      case "completed":
        return <span className="badge badge-completed">Tugallangan</span>;
      case "cancelled":
        return <span className="badge badge-cancelled">Bekor Qilingan</span>;
    }
  };

  return (
    <div>
      <div className="admin-page-header">
        <h1>Orders</h1>
        <p>Buyurtmalarni boshqarish</p>
      </div>

      <div className="admin-table-wrapper">
        <div className="admin-table-header">
          <h2>Buyurtmalar ro'yxati ({orders.length})</h2>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Mijoz</th>
              <th>Mashina</th>
              <th>Sana</th>
              <th>Summa</th>
              <th>Holat</th>
              <th>Amallar</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.car}</td>
                <td>{order.date}</td>
                <td>${order.amount.toLocaleString()}</td>
                <td>{statusLabel(order.status)}</td>
                <td>
                  <div style={{ display: "flex", gap: "6px" }}>
                    {order.status !== "completed" && (
                      <button
                        className="btn btn-edit"
                        onClick={() => handleStatusChange(order.id, "completed")}
                      >
                        Tugallash
                      </button>
                    )}
                    {order.status !== "cancelled" && (
                      <button
                        className="btn btn-delete"
                        onClick={() => handleStatusChange(order.id, "cancelled")}
                      >
                        Bekor
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
