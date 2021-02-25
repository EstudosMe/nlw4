import Express from 'express'
import 'reflect-metadata'
import { router } from './router'
import createConnection from './database/index'


createConnection()
const app = Express()

app.use(Express.json())

app.use(router)

export { app }

