import 'reflect-metadata'
import Express from 'express'
import './database/index.ts'
import { router } from './router'

const app = Express()
const PORT = 8086

app.use(Express.json())

app.use(router)

app.listen(PORT, () => console.log("[Servidor] Rodando na porta: ", PORT))