import { Schema, model } from "mongoose";

const materiaSchema = new Schema({
    subject: {type: String},
    teacher_Id: {type: Schema.Types.ObjectId, ref: "Maestros"},
    isAvailable : {type: Boolean}
},{
    timestamps: true,
    strict: false
})

export default model("Materias", materiaSchema)