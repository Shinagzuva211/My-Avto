import { useEffect, useState } from "react";
import { AUTH_API_URL } from "../../utils/api";

type User = {
  _id?: string;
  id?: string;
  name?: string;
  email?: string;
  createdAt?: string;
  joined?: string;
};

function getUserKey(u: User): string {
  return u._id ?? u.id ?? u.email ?? Math.random().toString(36);
}

const API_URL = AUTH_API_URL;

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const token = localStorage.getItem("admin_token");
        const res = await fetch(`${API_URL}/api/users`, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setUsers(Array.isArray(data) ? data : (data.users ?? []));
      } catch (e) {
        setError(e instanceof Error ? e.message : "Xatolik yuz berdi");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div>
      <div className="admin-page-header">
        <h1>Users</h1>
        <p>Foydalanuvchilarni boshqarish</p>
      </div>

      <div className="admin-table-wrapper">
        <div className="admin-table-header">
          <h2>Foydalanuvchilar ro'yxati ({users.length})</h2>
        </div>

        {loading ? (
          <p style={{ padding: "16px" }}>Yuklanmoqda...</p>
        ) : error ? (
          <p style={{ padding: "16px", color: "#dc3545" }}>
            Foydalanuvchilarni yuklashda xatolik: {error}
          </p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Ism</th>
                <th>Email</th>
                <th>Qo'shilgan</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr key={getUserKey(user)}>
                  <td>{i + 1}</td>
                  <td>{user.name ?? "-"}</td>
                  <td>{user.email ?? "-"}</td>
                  <td>{user.createdAt || user.joined ? new Date(user.createdAt || user.joined!).toLocaleDateString() : "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
