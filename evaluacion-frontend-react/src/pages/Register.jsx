import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios";
import Alert from "../components/Alert";

const initialForm = {
  name: "",
  lastname: "",
  email: "",
  password: "",
  birthdate: "",
  phone: "",
  grade: ""
};

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [verificationCodeRequest, setVerificationCodeRequest] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const requestRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    try {
      await api.post("/registerEstudiante", { ...form, isVerified: false, timeOut: null });
      setMessage("Código enviado. Revisa tu correo.");
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "No se pudo registrar");
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    try {
      await api.post("/registerEstudiante/verifyCodeEmail", { verificationCodeRequest });
      setMessage("Cuenta verificada correctamente");
      setTimeout(() => navigate("/login"), 700);
    } catch (err) {
      setError(err.response?.data?.message || "Código inválido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-2xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-slate-950">Registro de estudiante</h1>
          <p className="text-sm text-slate-500">Solo se usa el flujo de estudiantes</p>
        </div>

        <Alert type="success" message={message} />
        <Alert type="error" message={error} />

        {step === 1 ? (
          <form onSubmit={requestRegister} className="mt-4 grid gap-4 md:grid-cols-2">
            <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} required className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900" />
            <input name="lastname" placeholder="Apellido" value={form.lastname} onChange={handleChange} className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900" />
            <input name="email" type="email" placeholder="Correo" value={form.email} onChange={handleChange} required className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900" />
            <input name="password" type="password" placeholder="Contraseña" value={form.password} onChange={handleChange} required className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900" />
            <input name="birthdate" type="date" value={form.birthdate} onChange={handleChange} className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900" />
            <input name="phone" placeholder="Teléfono" value={form.phone} onChange={handleChange} className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900" />
            <input name="grade" placeholder="Grado" value={form.grade} onChange={handleChange} className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900 md:col-span-2" />
            <button disabled={loading} className="rounded-lg bg-slate-900 px-4 py-2 font-semibold text-white disabled:opacity-60 md:col-span-2">
              {loading ? "Enviando..." : "Enviar código"}
            </button>
          </form>
        ) : (
          <form onSubmit={verifyCode} className="mt-4 space-y-4">
            <input value={verificationCodeRequest} onChange={(e) => setVerificationCodeRequest(e.target.value)} placeholder="Código de verificación" required className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900" />
            <button disabled={loading} className="w-full rounded-lg bg-slate-900 px-4 py-2 font-semibold text-white disabled:opacity-60">
              {loading ? "Verificando..." : "Verificar cuenta"}
            </button>
          </form>
        )}

        <Link to="/login" className="mt-4 block text-sm font-semibold text-slate-700 hover:underline">Ya tengo cuenta</Link>
      </div>
    </main>
  );
}
