import categoriaModel from "../models/categorias.js";

const categoriaController = {}

categoriaController.getAllCategorias = async (req, res) => {
    try {
        const categorias = await categoriaModel.find()
        return res.status(200).json(categorias)
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

categoriaController.postCategoria = async (req, res) => {
    try {
        const {categoryName, description, color, isActive} = req.body
        const nuevaCategoria = new categoriaModel({categoryName, description, color, isActive})
        await nuevaCategoria.save()
        return res.status(201).json(nuevaCategoria)
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

categoriaController.putCategoria = async (req, res) => {
    try {
        const {categoryName, description, color, isActive} = req.body
        const categoriaActualizada = await categoriaModel.findByIdAndUpdate(req.params.id, {categoryName, description, color, isActive}, {new: true})
        if (!categoriaActualizada) {
            return res.status(404).json({message: "Categoria not found"})
        }
        return res.status(200).json(categoriaActualizada)
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

categoriaController.deleteCategoria = async (req, res) => {
    try {
        const categoriaEliminada = await categoriaModel.findByIdAndDelete(req.params.id)
        if (!categoriaEliminada) {
            return res.status(404).json({message: "Categoria not found"})
        }
        return res.status(200).json({message: "Categoria deleted successfully"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export default categoriaController