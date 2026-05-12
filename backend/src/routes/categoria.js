import express, {Router} from "express"
import categoriaController from "../controller/categoriaController.js"

const router = Router()

router.route("/")
.get(categoriaController.getAllCategorias)
.post(categoriaController.postCategoria)

router.route("/:id")
.put(categoriaController.putCategoria)
.delete(categoriaController.deleteCategoria)

export default router