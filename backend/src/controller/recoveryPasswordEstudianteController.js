import nodemailer from "nodemailer";
import cryto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import HTMLRecoveryPassword from "../utils/sendMailRecovery.js";
import { config } from "../../config.js";
import estudianteModel from "../models/estudiantes.js";
import {reverse} from "dns";
import {maxHeaderSize} from "http";

const recoveryPasswordEstudianteController = {}

recoveryPasswordEstudianteController.requestCode = async ( req, res ) => {
    try {
        const {email} = req.body
        const EstudianteFound = await estudianteModel.findOne({email})

        if(!EstudianteFound){
            return res.status(404).json({message: "NOT FOUND"})
        }

        const randomCode = cryto.randomBytes(3).toString("hex")
        const token = jsonwebtoken.sign({randomCode, email, userType: "estudiante", isVerified: false}, config.JWT.secret, {expiresIn: "15m"})
        res.cookie("recoveryCookie", token, {maxAge: 15 * 60 * 1000})
        const transpoter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.user_email,
                pass: config.email.user_password
            }
        })

        const mailOptions = {
            from: config.email.user_email,
            to: email,
            subject: "Recuperacion de contraseña",
            body: "El codigo vence en 15 minutos",
            html: HTMLRecoveryPassword(randomCode)
        }

        transpoter.sendMail(mailOptions, (error, info) => {
            if(error){
                console.log("error" + error)
                return res.status(500).json({message: "Error sending email"})
            }

            return res.status(200).json({message: "Revise su correo"})
        })
    } catch (error) {
        console.log("error" + error)
        return res.staus(500).json({message: "Internal Server Error"})
    }
}

recoveryPasswordEstudianteController.verifyCode = async ( req, res ) => {
    try {
        const {code} = req.body
        const token = req.cookies.recoveryCookie
        const decoded = jsonwebtoken.verify(token, config.JWT.secret)

        if(code !== decoded.randomCode){
            return ress.status(400).json({message: "Codigo Invalido"})
        }

        const newToken = jsonwebtoken.sign({email: decoded.email, userType: "Estudiante", isVerifies: true},
            config.JWT.secret, {expiresIn: "15m"}
        )
        res.cookie("recoveryCookie", newToken, {maxAge: 15 * 60 * 1000})
        return res.status(200).json({message: "Verificado"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

recoveryPasswordEstudianteController.newPassword = async(req, res) => {
    try {
        const {newPassword, confirmNewPassword} = req.body
        if(newPassword !== confirmNewPassword){
            return res.status(400).json({message: "No coincide"})
        }

        const token = req.cookies.recoveryCookie
        const decoded = jsonwebtoken.verify(token, config.JWT.secret)
        if(!decoded){
            return res.status(400).json({message: "no verificado"})
        }

        const passwordHashed = await bcryptjs.hash(newPassword, 10)
        await estudianteModel.findOneAndUpdate(
            {email: decoded.email},
            {password: passwordHashed},
            {new: true}
        )
        res.clearCookie("recoveryCookie")
        return res.status(200).json({message: "Actualizado"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export default recoveryPasswordEstudianteController