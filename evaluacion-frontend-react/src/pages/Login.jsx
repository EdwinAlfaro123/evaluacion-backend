import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios";
import Alert from "../components/Alert";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api.post("/loginEstudiante", form);
      localStorage.setItem("isAuth", "true");
      navigate("/app/estudiantes");
    } catch (err) {
      setError(err.response?.data?.message || "No se pudo iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-950">Iniciar sesión</h1>
          <p className="text-sm text-slate-500">Acceso único para estudiantes</p>
        </div>

        <Alert type="error" message={error} />

        <label className="block space-y-1 text-sm font-medium text-slate-700">
          <span>Correo</span>
          <input name="email" type="email" value={form.email} onChange={handleChange} required className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900" />
        </label>

        <label className="block space-y-1 text-sm font-medium text-slate-700">
          <span>Contraseña</span>
          <input name="password" type="password" value={form.password} onChange={handleChange} required className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900" />
        </label>

        <button disabled={loading} className="w-full rounded-lg bg-slate-900 px-4 py-2 font-semibold text-white disabled:opacity-60">
          {loading ? "Entrando..." : "Entrar"}
        </button>

        <div className="flex justify-between text-sm">
          <Link to="/register" className="font-semibold text-slate-700 hover:underline">Crear cuenta</Link>
          <Link to="/recovery-password" className="font-semibold text-slate-700 hover:underline">Olvidé mi contraseña</Link>
        </div>
      </form>
    </main>
  );
}
