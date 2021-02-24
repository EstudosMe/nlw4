import 'reflect-metadata'
import express from 'express'
import "./database/index"

const app = express()
const PORT = 8086

app.get("/", (req, res) =>{
    res.json({message: "NLW hello"})
})

app.post("/", (req, res) =>{
    res.json({message: "Dados salvos"})
})

app.listen(PORT, () => console.log("Servidor rodando na porta: ", PORT))