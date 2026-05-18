import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { BookOpen, ClipboardList, Folder, GraduationCap, LogOut, Menu, Users } from "lucide-react";
import { useState } from "react";
import api from "../api/axios";

const links = [
  { to: "/app/estudiantes", label: "Estudiantes", icon: GraduationCap },
  { to: "/app/maestros", label: "Maestros", icon: Users },
  { to: "/app/tareas", label: "Tareas", icon: ClipboardList },
  { to: "/app/materias", label: "Materias", icon: BookOpen },
  { to: "/app/categorias", label: "Categorías", icon: Folder }
];

export default function Layout() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const logout = async () => {
    try {
      await api.post("/logout");
    } finally {
      localStorage.removeItem("isAuth");
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 lg:flex">
      <aside className={`${open ? "block" : "hidden"} border-r border-slate-200 bg-white p-4 lg:block lg:w-64`}>
        <div className="mb-6">
          <h1 className="text-xl font-bold">Panel escolar</h1>
          <p className="text-sm text-slate-500">Acceso de estudiantes</p>
        </div>

        <nav className="space-y-1">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold ${
                  isActive ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
                }`
              }
              onClick={() => setOpen(false)}
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <button onClick={logout} className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-100">
          <LogOut size={17} />
          Cerrar sesión
        </button>
      </aside>

      <main className="min-w-0 flex-1">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
          <strong>Panel escolar</strong>
          <button onClick={() => setOpen(!open)} className="rounded-lg border border-slate-200 p-2">
            <Menu size={20} />
          </button>
        </header>
        <div className="p-4 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
