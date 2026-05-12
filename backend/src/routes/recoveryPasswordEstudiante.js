import express from "express"
import recoveryPasswordEstudianteController from "../controller/recoveryPasswordEstudianteController.js"

const router = express.Router()

router.route("/requestCode")
.post(recoveryPasswordEstudianteController.requestCode)

router.route("/verifyCode")
.post(recoveryPasswordEstudianteController.verifyCode)

router.route("/newPassword")
.post(recoveryPasswordEstudianteController.newPassword)

export default router