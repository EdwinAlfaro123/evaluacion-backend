import express from "express"
import registerMaestroController from "../controller/registerMaestroController.js"

const router = express.Router()

router.route("/")
.post(registerMaestroController.register)

router.route("/verifyCodeEmail")
.post(registerMaestroController.verifyCode)

export default router