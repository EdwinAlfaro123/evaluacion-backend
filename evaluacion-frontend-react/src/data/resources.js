export const resources = [
  {
    key: "estudiantes",
    title: "Estudiantes",
    endpoint: "/estudiantes",
    canCreate: false,
    fields: [
      { name: "name", label: "Nombre", type: "text", required: true },
      { name: "lastname", label: "Apellido", type: "text" },
      { name: "email", label: "Correo", type: "email" },
      { name: "birthdate", label: "Fecha de nacimiento", type: "date" },
      { name: "phone", label: "Teléfono", type: "text" },
      { name: "grade", label: "Grado", type: "text" },
      { name: "isVerified", label: "Verificado", type: "checkbox" }
    ],
    columns: ["name", "lastname", "email", "phone", "grade", "isVerified"]
  },
  {
    key: "maestros",
    title: "Maestros",
    endpoint: "/maestros",
    canCreate: false,
    fields: [
      { name: "name", label: "Nombre", type: "text", required: true },
      { name: "lastname", label: "Apellido", type: "text" },
      { name: "email", label: "Correo", type: "email" },
      { name: "phone", label: "Teléfono", type: "text" },
      { name: "speciality", label: "Especialidad", type: "text" },
      { name: "isActive", label: "Activo", type: "checkbox" },
      { name: "isVerified", label: "Verificado", type: "checkbox" }
    ],
    columns: ["name", "lastname", "email", "phone", "speciality", "isActive"]
  },
  {
    key: "tareas",
    title: "Tareas",
    endpoint: "/tareas",
    canCreate: true,
    fields: [
      { name: "title", label: "Título", type: "text", required: true },
      { name: "description", label: "Descripción", type: "textarea" },
      { name: "dueDate", label: "Fecha límite", type: "date" },
      { name: "priority", label: "Prioridad", type: "select", options: ["Baja", "Media", "Alta"] },
      { name: "status", label: "Estado", type: "select", options: ["Pendiente", "En proceso", "Completada"] }
    ],
    columns: ["title", "description", "dueDate", "priority", "status"]
  },
  {
    key: "materias",
    title: "Materias",
    endpoint: "/materias",
    canCreate: true,
    fields: [
      { name: "subjectName", label: "Materia", type: "text", required: true },
      { name: "teacher_id", label: "ID del maestro", type: "text" },
      { name: "isAvailable", label: "Disponible", type: "checkbox" }
    ],
    columns: ["subjectName", "teacher_id", "isAvailable"]
  },
  {
    key: "categorias",
    title: "Categorías",
    endpoint: "/categoria",
    canCreate: true,
    fields: [
      { name: "categoryName", label: "Categoría", type: "text", required: true },
      { name: "description", label: "Descripción", type: "textarea" },
      { name: "color", label: "Color", type: "color" },
      { name: "isActive", label: "Activa", type: "checkbox" }
    ],
    columns: ["categoryName", "description", "color", "isActive"]
  }
];
