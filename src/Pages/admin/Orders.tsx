import { useEffect, useState } from "react";
import { fetchWithRetry } from "../../utils/api";

type OrderStatus = "pending" | "completed" | "cancelled";

type Order = {
  _id: string;
  orderNumber?: number;
  customer: string;
  car: string;
  price: number;
  status: OrderStatus;
  createdAt: string;
};

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = (await fetchWithRetry(
        `${import.meta.env.VITE_API_URL}/orders`
      )) as Order[];
      // buyurtmalar tartib raqami bo'yicha o'sish tartibida ko'rsatiladi (#1 eng tepada)
      setOrders(
        [...data].sort(
          (a, b) => (a.orderNumber ?? 0) - (b.orderNumber ?? 0)
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Buyurtmalarni yuklashda xatolik");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (id: string, newStatus: OrderStatus) => {
    const prev = orders;
    setOrders((current) =>
      current.map((order) =>
        order._id === id ? { ...order, status: newStatus } : order
      )
    );

    try {
      await fetchWithRetry(
        `${import.meta.env.VITE_API_URL}/orders/${id}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );
    } catch (err) {
      console.error("Order status update error:", err);
      setOrders(prev);
      alert("Holatni o'zgartirishda xatolik yuz berdi");
    }
  };

  const statusLabel = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return <span className="badge badge-pending">Kutilmoqda</span>;
      case "completed":
        return <span className="badge badge-completed">Tugallangan</span>;
      case "cancelled":
        return <span className="badge badge-cancelled">Bekor Qilingan</span>;
    }
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("ru-RU");

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

        {loading && <p className="admin-empty">Buyurtmalar yuklanmoqda...</p>}

        {error && (
          <div className="admin-empty">
            <p>Buyurtmalarni yuklashda xatolik: {error}</p>
            <button className="btn btn-edit" onClick={loadOrders}>
              Qayta urinish
            </button>
          </div>
        )}

        {!loading && !error && orders.length === 0 && (
          <p className="admin-empty">Hozircha buyurtmalar yo'q</p>
        )}

        {!loading && !error && orders.length > 0 && (
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
                <tr key={order._id}>
                  <td>#{order.orderNumber ?? order._id.slice(-6)}</td>
                  <td>{order.customer}</td>
                  <td>{order.car}</td>
                  <td>{formatDate(order.createdAt)}</td>
                  <td>${order.price.toLocaleString()}</td>
                  <td>{statusLabel(order.status)}</td>
                  <td>
                    <div style={{ display: "flex", gap: "6px" }}>
                      {order.status !== "completed" && (
                        <button
                          className="btn btn-edit"
                          onClick={() => handleStatusChange(order._id, "completed")}
                        >
                          Tugallash
                        </button>
                      )}
                      {order.status !== "cancelled" && (
                        <button
                          className="btn btn-delete"
                          onClick={() => handleStatusChange(order._id, "cancelled")}
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
        )}
      </div>
    </div>
  );
}
