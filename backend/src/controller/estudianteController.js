const estudianteController = {}
import estudianteModel from "../models/estudiantes.js"

estudianteController.getAllEstudiantes = async ( req, res ) => {
    try {
        const estudiantes = await estudianteModel.find()
        return res.status(200).json(estudiantes)
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

estudianteController.putEstudiante = async ( req, res ) => {
    try {
        let { name, lastname, email, password, birthdate, phone, grade, isVerified } = req.body
        name = name?.trim()
        email = email?.trim()

        if(!name){
            return res.status(400).json({message: "El nombre es requerido"})
        }

        const putEstudiante = await estudianteModel.findByIdAndUpdate(req.params.id, {name, lastname, email, password, birthdate, phone, grade, isVerified}, {new: true})
        if(!putEstudiante){
            return res.status(404).json({message: "Estudiante no encontrado"})
        }
        return res.status(200).json({message: "actualizado"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

estudianteController.deleteEstudiante = async ( req, res ) => {
    try {
        const deleteEstudiante = await estudianteModel.findByIdAndDelete(req.params.id)
        if(!deleteEstudiante){
            return res.status(404).json({message: "Estudiante no encontrado"})
        }
        return res.status(200).json({message: "El estudiante ha sido eliminado"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export default estudianteController