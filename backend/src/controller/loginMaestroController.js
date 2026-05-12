import jsonwebtoken from "jsonwebtoken"
import bcrypts from "bcryptjs"
import {config} from "../../config.js"
import {json} from "express"
import maestroModel from "../models/maestros.js"

const loginMaestrosController = {}

loginMaestrosController.login = async ( req, res ) => {
    try {
        const {email, password} = req.body
        const MaestroFound = await maestroModel.findOne({email})

        if(!MaestroFound){
            return res.status(400).json({message: "NOT FOUND"})
        }

        if(MaestroFound.timeOut && MaestroFound.timeOut > Date.now()){
            return res.status(403).json({message: "Cuenta bloqueada"})
        }

        const isMatch = await bcrypts.compare(password, MaestroFound.password)

        if(!isMatch){
            MaestroFound.loginAttemps = (MaestroFound.loginAttemps || 0) + 1

            if(MaestroFound.loginAttemps >= 5){
                MaestroFound.timeOut = Date.now() + 5 * 60 * 1000
                MaestroFound.loginAttemps = 0
                await MaestroFound.save()
                return res.status(400).json({message: "Bloqueado"})
            }

            await MaestroFound.save()
            return res.status(400).json({message: "Contraseña incorrecta"})
        }

        MaestroFound.loginAttemps = 0
        MaestroFound.timeOut = null
        const token = jsonwebtoken.sign({
            id: MaestroFound._id, userType: "maestro"},
            config.JWT.secret, {expiresIn: "30d"}
        )

        res.cookie("authcookie", token)
        return res.status(200).json({message: "exito"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export default loginMaestrosController