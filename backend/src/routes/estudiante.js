import express, {Router} from "express"
import estudianteController from "../controller/estudianteController.js"

const router = Router()

router.route("/")
.get(estudianteController.getAllEstudiantes)


router.route("/:id")
.put(estudianteController.putEstudiante)
.delete(estudianteController.deleteEstudiante)

export default router