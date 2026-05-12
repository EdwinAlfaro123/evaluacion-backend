const maestroController = {}
import maestroModel from "../models/maestros.js"

maestroController.getAllMaestros = async ( req, res ) => {
    try {
        const maestros = await maestroModel.find()
        return res.status(200).json(maestros)
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

maestroController.putMaestro = async ( req, res ) => {
    try {
        let { name, lastname, email, password, phone, speciality, isActive, isVerified } = req.body
        name = name?.trim()
        email = email?.trim()

        if(!name){
            return res.status(400).json({message: "El nombre es requerido"})
        }

        const putMaestro = await maestroModel.findByIdAndUpdate(req.params.id, {name, lastname, email, password, phone, speciality, isActive, isVerified}, {new: true})
        if(!putMaestro){
            return res.status(404).json({message: "Maestro no encontrado"})
        }
        return res.status(200).json({message: "actualizado"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

maestroController.deleteMaestro = async ( req, res ) => {
    try {
        const deleteMaestro = await maestroModel.findByIdAndDelete(req.params.id)
        if(!deleteMaestro){
            return res.status(404).json({message: "Maestro no encontrado"})
        }
        return res.status(200).json({message: "El maestro ha sido eliminado"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export default maestroController