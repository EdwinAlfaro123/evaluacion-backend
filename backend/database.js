import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URI)

const connection = mongoose.connection

connection.on("open", () => {
    console.log("conectado")
})

connection.on("disconnected", () => {
    console.log("desconectado")
})

connection.on("error", (error) => {
    console.log("error", error)
})