import { Schema, model } from "mongoose";

const categoriaSchema = new Schema({
    categoryName: {type: String},
    description: {type: String},
    color : {type: String},
    isActive: {type: Boolean}
},{
    timestamps: true,
    strict: false
})

export default model("Categorias", categoriaSchema)