import { Schema, model } from "mongoose";

const TareaSchema = new Schema({
    title: {type: String},
    description: {type: String},
    dueDate: {type: Date},
    priority: {type: String},
    status: {type: String}
},{
    timestamps: true,
    strict: false
})

export default model("Tareas", TareaSchema)