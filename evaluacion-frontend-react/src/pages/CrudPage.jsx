import { useEffect, useMemo, useState } from "react";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import api from "../api/axios";
import Alert from "../components/Alert";
import Modal from "../components/Modal";

const readable = {
  name: "Nombre",
  lastname: "Apellido",
  email: "Correo",
  phone: "Teléfono",
  grade: "Grado",
  isVerified: "Verificado",
  isActive: "Activo",
  title: "Título",
  description: "Descripción",
  dueDate: "Fecha",
  priority: "Prioridad",
  status: "Estado",
  subjectName: "Materia",
  teacher_id: "Maestro",
  isAvailable: "Disponible",
  categoryName: "Categoría",
  color: "Color",
  speciality: "Especialidad"
};

function formatValue(value) {
  if (typeof value === "boolean") return value ? "Sí" : "No";
  if (!value) return "—";
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T/.test(value)) return value.slice(0, 10);
  return value;
}

function emptyForm(fields) {
  return fields.reduce((acc, field) => {
    acc[field.name] = field.type === "checkbox" ? false : "";
    return acc;
  }, {});
}

export default function CrudPage({ config }) {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [form, setForm] = useState(emptyForm(config.fields));
  const [editing, setEditing] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadData = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.get(config.endpoint);
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.response?.data?.message || "No se pudieron cargar los datos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setItems([]);
    setQuery("");
    setModalOpen(false);
    setEditing(null);
    setForm(emptyForm(config.fields));
    loadData();
  }, [config.key]);

  const filtered = useMemo(() => {
    const text = query.toLowerCase().trim();
    if (!text) return items;
    return items.filter((item) => JSON.stringify(item).toLowerCase().includes(text));
  }, [items, query]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm(config.fields));
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    const nextForm = emptyForm(config.fields);
    config.fields.forEach((field) => {
      nextForm[field.name] = item[field.name] ?? nextForm[field.name];
    });
    setForm(nextForm);
    setModalOpen(true);
  };

  const changeForm = (name, value) => {
    setForm((current) => ({ ...current, [name]: value }));
  };

  const saveItem = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    try {
      if (editing) {
        await api.put(`${config.endpoint}/${editing._id}`, form);
        setMessage("Registro actualizado correctamente");
      } else {
        await api.post(config.endpoint, form);
        setMessage("Registro creado correctamente");
      }
      setModalOpen(false);
      await loadData();
    } catch (err) {
      setError(err.response?.data?.message || "No se pudo guardar el registro");
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (item) => {
    const ok = window.confirm("¿Seguro que deseas eliminar este registro?");
    if (!ok) return;
    setLoading(true);
    setMessage("");
    setError("");
    try {
      await api.delete(`${config.endpoint}/${item._id}`);
      setMessage("Registro eliminado correctamente");
      await loadData();
    } catch (err) {
      setError(err.response?.data?.message || "No se pudo eliminar el registro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-5">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-950">{config.title}</h1>
          <p className="text-sm text-slate-500">Total de registros: {items.length}</p>
        </div>
        {config.canCreate && (
          <button onClick={openCreate} className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
            <Plus size={18} />
            Agregar
          </button>
        )}
      </div>

      <Alert type="success" message={message} />
      <Alert type="error" message={error} />

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2">
          <Search size={18} className="text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Buscar en ${config.title.toLowerCase()}...`}
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                {config.columns.map((column) => (
                  <th key={column} className="px-3 py-3 font-semibold">{readable[column] || column}</th>
                ))}
                <th className="px-3 py-3 text-right font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading && filtered.length === 0 ? (
                <tr><td colSpan={config.columns.length + 1} className="px-3 py-8 text-center text-slate-500">Cargando...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={config.columns.length + 1} className="px-3 py-8 text-center text-slate-500">No hay registros</td></tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item._id} className="border-b border-slate-100 hover:bg-slate-50">
                    {config.columns.map((column) => (
                      <td key={column} className="max-w-64 truncate px-3 py-3 text-slate-700">{formatValue(item[column])}</td>
                    ))}
                    <td className="px-3 py-3">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => openEdit(item)} className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-100" title="Editar">
                          <Pencil size={16} />
                        </button>
                        <button onClick={() => deleteItem(item)} className="rounded-lg border border-red-100 p-2 text-red-600 hover:bg-red-50" title="Eliminar">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <Modal
          title={editing ? `Editar ${config.title}` : `Agregar ${config.title}`}
          fields={config.fields}
          form={form}
          onChange={changeForm}
          onClose={() => setModalOpen(false)}
          onSubmit={saveItem}
          loading={loading}
        />
      )}
    </section>
  );
}
