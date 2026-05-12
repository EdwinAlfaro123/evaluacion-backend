import materiaModel from "../models/materias.js";

const materiaController = {}

materiaController.getAllMaterias = async (req, res) => {
    try {
        const materias = await materiaModel.find()
        return res.status(200).json(materias)
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

materiaController.postMateria = async (req, res) => {
    try {
        const {subjectName, teacher_id, isAvailable} = req.body
        const nuevaMateria = new materiaModel({subjectName, teacher_id, isAvailable})
        await nuevaMateria.save()
        return res.status(201).json(nuevaMateria)
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

materiaController.putMateria = async (req, res) => {
    try {
        const {subjectName, teacher_id, isAvailable} = req.body
        const materiaActualizada = await materiaModel.findByIdAndUpdate(req.params.id, {subjectName, teacher_id, isAvailable}, {new: true})
        if (!materiaActualizada) {
            return res.status(404).json({message: "Materia not found"})
        }
        return res.status(200).json(materiaActualizada)
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

materiaController.deleteMateria = async (req, res) => {
    try {
        const materiaEliminada = await materiaModel.findByIdAndDelete(req.params.id)
        if (!materiaEliminada) {
            return res.status(404).json({message: "Materia not found"})
        }
        return res.status(200).json({message: "Materia deleted successfully"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export default materiaController