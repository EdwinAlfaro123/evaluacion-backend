import express, {Router} from "express"
import materiaController from "../controller/materiaController.js"

const router = Router()

router.route("/")
.get(materiaController.getAllMaterias)
.post(materiaController.postMateria)

router.route("/:id")
.put(materiaController.putMateria)
.delete(materiaController.deleteMateria)

export default router