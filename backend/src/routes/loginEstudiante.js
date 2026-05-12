import express from "express";
import loginEstudiantesController from "../controller/loginEstudiantesController.js";

const router = express.Router()

router.route("/")
.post(loginEstudiantesController.login)

export default router