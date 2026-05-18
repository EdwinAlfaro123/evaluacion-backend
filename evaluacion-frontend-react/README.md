# Frontend React + Tailwind para evaluacion-backend

Este frontend está hecho con React, Vite, TailwindCSS, Axios y React Router.

## Qué incluye

- Un solo Login para estudiantes: `/login`
- Un solo Registro para estudiantes: `/register`
- Una sola Recuperación de contraseña para estudiantes: `/recovery-password`
- Panel protegido con acceso a:
  - Estudiantes
  - Maestros
  - Tareas
  - Materias
  - Categorías

## Comandos

```bash
npm install
npm run dev
```

El frontend usa por defecto:

```env
http://localhost:4000/api
```

Si tu backend corre en otra URL, crea un archivo `.env` en la raíz del frontend:

```env
VITE_API_URL=http://localhost:4000/api
```

## Importante del backend

Tu backend permite crear directamente por POST en:

- `/api/tareas`
- `/api/materias`
- `/api/categoria`

Pero en estos endpoints no tiene POST directo:

- `/api/estudiantes`
- `/api/maestros`

Por eso en el frontend Estudiantes y Maestros tienen listar, editar y eliminar, pero no botón de agregar. El estudiante se crea desde el registro con verificación por correo.

También revisa en tu backend que logout usa `authCookie`, pero login crea `authcookie`. Para que el backend borre bien la cookie, ambos nombres deben coincidir.
