import { useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  joined: string;
};

const initialUsers: User[] = [
  { id: 1, name: "Akmal Karimov", email: "akmal@gmail.com", role: "Admin", status: "active", joined: "2025-01-15" },
  { id: 2, name: "Sardor Raximov", email: "sardor@gmail.com", role: "User", status: "active", joined: "2025-03-22" },
  { id: 3, name: "Jasur Toshmatov", email: "jasur@gmail.com", role: "User", status: "active", joined: "2025-05-10" },
  { id: 4, name: "Nodir Abdullayev", email: "nodir@gmail.com", role: "Editor", status: "inactive", joined: "2025-06-01" },
  { id: 5, name: "Otabek Mirzayev", email: "otabek@gmail.com", role: "User", status: "active", joined: "2025-07-18" },
  { id: 6, name: "Dilshod Karimov", email: "dilshod@gmail.com", role: "User", status: "inactive", joined: "2025-08-05" },
  { id: 7, name: "Farhod Normatov", email: "farhod@gmail.com", role: "Editor", status: "active", joined: "2025-09-12" },
];

export default function Users() {
  const [users] = useState<User[]>(initialUsers);

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
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Ism</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Holat</th>
              <th>Qo'shilgan</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>#{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  {user.status === "active" ? (
                    <span className="badge badge-completed">Faol</span>
                  ) : (
                    <span className="badge badge-cancelled">Nofaol</span>
                  )}
                </td>
                <td>{user.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
