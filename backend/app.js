import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import registerEstudianteRoutes from "./src/routes/registerEstudinte.js";
import loginEstudianteRoutes from "./src/routes/loginEstudiante.js";

const app = express();

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());

app.use("/api/registerEstudiante", registerEstudianteRoutes)
app.use("/api/loginEstudiante", loginEstudianteRoutes)

export default app;