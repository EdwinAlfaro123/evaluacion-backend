export default function Field({ field, value, onChange }) {
  const base = "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-700";

  if (field.type === "textarea") {
    return (
      <label className="space-y-1 text-sm font-medium text-slate-700">
        <span>{field.label}</span>
        <textarea
          className={`${base} min-h-24 resize-none`}
          value={value || ""}
          required={field.required}
          onChange={(e) => onChange(field.name, e.target.value)}
        />
      </label>
    );
  }

  if (field.type === "select") {
    return (
      <label className="space-y-1 text-sm font-medium text-slate-700">
        <span>{field.label}</span>
        <select
          className={base}
          value={value || ""}
          required={field.required}
          onChange={(e) => onChange(field.name, e.target.value)}
        >
          <option value="">Seleccionar</option>
          {field.options?.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </label>
    );
  }

  if (field.type === "checkbox") {
    return (
      <label className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700">
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange(field.name, e.target.checked)}
        />
        <span>{field.label}</span>
      </label>
    );
  }

  return (
    <label className="space-y-1 text-sm font-medium text-slate-700">
      <span>{field.label}</span>
      <input
        className={base}
        type={field.type || "text"}
        value={field.type === "date" && value ? String(value).slice(0, 10) : value || ""}
        required={field.required}
        onChange={(e) => onChange(field.name, e.target.value)}
      />
    </label>
  );
}
