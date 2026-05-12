import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import registerEstudianteRoutes from "./src/routes/registerEstudinte.js";
import registerMaestroRoutes from "./src/routes/registerMaestro.js";
import loginEstudianteRoutes from "./src/routes/loginEstudiante.js";
import loginMaestroRoutes from "./src/routes/loginMaestro.js"
import recoveryPassword from "./src/routes/recoveryPassword.js"
import estudianteRoutes from "./src/routes/estudiante.js"
import maestroRoutes from "./src/routes/maestro.js"
import tareaRoutes from "./src/routes/tarea.js"
import materiaRoutes from "./src/routes/materia.js"
import categoriaRoutes from "./src/routes/categoria.js"
import logoutRoutes from "./src/routes/logout.js"

const app = express();

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());

app.use("/api/registerEstudiante", registerEstudianteRoutes)
app.use("/api/registerMaestro", registerMaestroRoutes)
app.use("/api/loginEstudiante", loginEstudianteRoutes)
app.use("/api/loginMaestro", loginMaestroRoutes)
app.use("/api/recoveryPassword", recoveryPassword)
app.use("/api/estudiantes", estudianteRoutes)
app.use("/api/maestros", maestroRoutes)
app.use("/api/tareas", tareaRoutes)
app.use("/api/materias", materiaRoutes)
app.use("/api/categoria", categoriaRoutes)
app.use ("/api/logout", logoutRoutes)

export default app;