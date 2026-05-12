import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../../config.js";
import maestroModal from "../models/maestros.js";
import { maxHeaderSize } from "http";
import { error } from "console";
import bcryptjs from "bcryptjs";

const registerMaestroController = {}

registerMaestroController.register = async ( req, res ) => {
    try {
        const{name, lastname, email, password, phone, speciality, isActive, isVerified, timeOut} = req.body
        const ExisteMaestro = await maestroModal.findOne({email})

        if(ExisteMaestro){
            return res.status(400).json({message: "El maestro ya existe"})
        }

        const passwordHashed = await bcryptjs.hash(password, 10)
        const randomCode= crypto.randomBytes(3).toString("hex")
        const token = jsonwebtoken.sign({
            randomCode, name, lastname, email, password: passwordHashed, phone, speciality, isActive, isVerified, timeOut
        }, config.JWT.secret, {expiresIn: "15m"})

        res.cookie("registrationCookie", token, {maxAge: 15 * 60 * 1000})

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.user_email,
                pass: config.email.user_password
            }
        })

        const mailOptions = {
            from: config.email.user_email,
            to: email,
            subject: "Verificacion",
            text: "Utiliza este codigo para verificar tu cuenta: " + randomCode + "Expira en 15 minutos"
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if(error){
                console.log("error" + error)
                return res.status(500).json({message: "Error sending email"})
            }

            return res.status(200).json({message: "Revise su correo"})
        })
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

registerMaestroController.verifyCode = async ( req, res ) => {
    try {
        const {verificationCodeRequest} = req.body
        const token = req.cookies.registrationCookie
        const decoded = jsonwebtoken.verify(token, config.JWT.secret)
        const {randomCode: storedCode, name, lastname, email, password, phone, speciality, isActive, isVerified, loginAttemps, timeOut} = decoded

        if(verificationCodeRequest !== storedCode){
            return res.status(400).json({message: "Invalido"})
        }

        const newMaestro = maestroModal({name, lastname, email, password, phone, speciality, isActive, isVerified: true})
        await newMaestro.save()
        res.clearCookie("registrationCookie")
        return res.status(200).json({message: "registrado"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export default registerMaestroController