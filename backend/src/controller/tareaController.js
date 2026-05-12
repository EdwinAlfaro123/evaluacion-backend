import tareaModel from "../models/tareas.js";

const tareaController = {}

tareaController.getAllTareas = async (req, res) => {
    try {
        const tareas = await tareaModel.find()
        return res.status(200).json(tareas)
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

tareaController.postTarea = async (req, res) => {
    try {
        const {title, description, dueDate, priority, status} = req.body
        const nuevaTarea = new tareaModel({title, description, dueDate, priority, status})
        await nuevaTarea.save()
        return res.status(201).json(nuevaTarea)
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

tareaController.putTarea = async (req, res) => {
    try {
        const {title, description, dueDate, priority, status} = req.body
        const tareaActualizada = await tareaModel.findByIdAndUpdate(req.params.id, {title, description, dueDate, priority, status}, {new: true})
        if (!tareaActualizada) {
            return res.status(404).json({message: "Tarea not found"})
        }
        return res.status(200).json(tareaActualizada)
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

tareaController.deleteTarea = async (req, res) => {
    try {
        const tareaEliminada = await tareaModel.findByIdAndDelete(req.params.id)
        if (!tareaEliminada) {
            return res.status(404).json({message: "Tarea not found"})
        }
        return res.status(200).json({message: "Tarea deleted successfully"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export default tareaController