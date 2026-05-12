import jsonwebtoken from "jsonwebtoken"
import bcrypts from "bcryptjs"
import {config} from "../../config.js"
import {json} from "express"
import estudianteModel from "../models/estudiantes.js"

const loginEstudiantesController = {}

loginEstudiantesController.login = async ( req, res ) => {
    try {
        const {email, password} = req.body
        const EstudianteFound = await estudianteModel.findOne({email})

        if(!EstudianteFound){
            return res.status(400).json({message: "NOT FOUND"})
        }

        if(EstudianteFound.timeOut && EstudianteFound.timeOut > Date.now()){
            return res.status(403).json({message: "Cuenta bloqueada"})
        }

        const isMatch = await bcrypts.compare(password, EstudianteFound.password)

        if(!isMatch){
            EstudianteFound.loginAttemps = (EstudianteFound.loginAttemps || 0) + 1

            if(EstudianteFound.loginAttemps >= 5){
                EstudianteFound.timeOut = Date.now() + 5 * 60 * 1000
                EstudianteFound.loginAttemps = 0
                await EstudianteFound.save()
                return res.status(400).json({message: "Bloqueado"})
            }

            await EstudianteFound.save()
            return res.status(400).json({message: "Contraseña incorrecta"})
        }

        EstudianteFound.loginAttemps = 0
        EstudianteFound.timeOut = null
        const token = jsonwebtoken.sign({
            id: EstudianteFound._id, userType: "estudiante"},
            config.JWT.secret, {expiresIn: "30d"}
        )

        res.cookie("authcookie", token)
        return res.status(200).json({message: "exito"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export default loginEstudiantesController