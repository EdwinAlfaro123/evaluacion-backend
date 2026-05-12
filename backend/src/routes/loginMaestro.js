import express from "express";
import loginMaestrosController from "../controller/loginMaestroController.js";

const router = express.Router()

router.route("/")
.post(loginMaestrosController.login)

export default router