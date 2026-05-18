import Field from "./Field";

export default function Modal({ title, fields, form, onChange, onClose, onSubmit, loading }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
      <form onSubmit={onSubmit} className="w-full max-w-2xl rounded-xl bg-white p-5 shadow-xl">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-lg font-bold text-slate-900">{title}</h2>
          <button type="button" onClick={onClose} className="rounded-lg px-3 py-1 text-sm text-slate-500 hover:bg-slate-100">
            Cerrar
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {fields.map((field) => (
            <Field key={field.name} field={field} value={form[field.name]} onChange={onChange} />
          ))}
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">
            Cancelar
          </button>
          <button disabled={loading} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
}
