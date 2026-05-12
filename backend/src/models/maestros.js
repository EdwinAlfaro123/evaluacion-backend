import { Schema, model } from "mongoose";

const maestroSchema = new Schema({
    name: {type: String},
    lastname: {type: String},
    email: {type: String},
    password: {type: String},
    phone: {type: String},
    speciality: {type: String},
    isActive: {type: Boolean},
    isVerified: {type: Boolean},
    loginAttemps: {type: Number},
    timeOut: {type: Date}
},{
    timestamps: true,
    strict: false
})

export default model("Maestros", maestroSchema)