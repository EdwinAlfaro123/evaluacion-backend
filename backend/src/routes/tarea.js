import express, {Router} from "express"
import tareaController from "../controller/tareaController.js"

const router = Router()

router.route("/")
.get(tareaController.getAllTareas)
.post(tareaController.postTarea)

router.route("/:id")
.put(tareaController.putTarea)
.delete(tareaController.deleteTarea)

export default router