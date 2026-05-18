import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios";
import Alert from "../components/Alert";

export default function RecoveryPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [passwords, setPasswords] = useState({ newPassword: "", confirmNewPassword: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const requestCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    try {
      await api.post("/recoveryPassword/requestCode", { email });
      setMessage("Código enviado al correo");
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "No se pudo enviar el código");
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
      await api.post("/recoveryPassword/verifyCode", { code });
      setMessage("Código verificado");
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || "Código inválido");
    } finally {
      setLoading(false);
    }
  };

  const newPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    try {
      await api.post("/recoveryPassword/newPassword", passwords);
      setMessage("Contraseña actualizada");
      setTimeout(() => navigate("/login"), 700);
    } catch (err) {
      setError(err.response?.data?.message || "No se pudo actualizar la contraseña");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-950">Recuperar contraseña</h1>
        <p className="mb-4 text-sm text-slate-500">Recuperación únicamente para estudiantes</p>

        <Alert type="success" message={message} />
        <Alert type="error" message={error} />

        {step === 1 && (
          <form onSubmit={requestCode} className="mt-4 space-y-4">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo" required className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900" />
            <button disabled={loading} className="w-full rounded-lg bg-slate-900 px-4 py-2 font-semibold text-white disabled:opacity-60">
              {loading ? "Enviando..." : "Enviar código"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={verifyCode} className="mt-4 space-y-4">
            <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Código" required className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900" />
            <button disabled={loading} className="w-full rounded-lg bg-slate-900 px-4 py-2 font-semibold text-white disabled:opacity-60">
              {loading ? "Verificando..." : "Verificar código"}
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={newPassword} className="mt-4 space-y-4">
            <input type="password" value={passwords.newPassword} onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })} placeholder="Nueva contraseña" required className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900" />
            <input type="password" value={passwords.confirmNewPassword} onChange={(e) => setPasswords({ ...passwords, confirmNewPassword: e.target.value })} placeholder="Confirmar contraseña" required className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-900" />
            <button disabled={loading} className="w-full rounded-lg bg-slate-900 px-4 py-2 font-semibold text-white disabled:opacity-60">
              {loading ? "Guardando..." : "Cambiar contraseña"}
            </button>
          </form>
        )}

        <Link to="/login" className="mt-4 block text-sm font-semibold text-slate-700 hover:underline">Volver al login</Link>
      </div>
    </main>
  );
}
