import express, {Router} from "express"
import maestroController from "../controller/maestroController.js"

const router = Router()

router.route("/")
.get(maestroController.getAllMaestros)


router.route("/:id")
.put(maestroController.putMaestro)
.delete(maestroController.deleteMaestro)

export default router