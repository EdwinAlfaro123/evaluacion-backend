import express from "express"
import recoveryPasswordController from "../controller/recoveryPasswordController.js"

const router = express.Router()

router.route("/requestCode")
.post(recoveryPasswordController.requestCode)
router.route("/requestCodeMaestro")
.post(recoveryPasswordController.requestCodeMaestro)

router.route("/verifyCode")
.post(recoveryPasswordController.verifyCode)
router.route("/verifyCodeMaestro")
.post(recoveryPasswordController.verifyCodeMaestro)

router.route("/newPassword")
.post(recoveryPasswordController.newPassword)
router.route("/newPasswordMaestro")
.post(recoveryPasswordController.newPasswordMaestro)

export default router