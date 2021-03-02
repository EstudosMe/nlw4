import request from 'supertest'
import { app } from '../app'
import createConnection from '../database/index'

describe("Users", () => {
    beforeAll(async () => {
        const connection = await createConnection()
        await connection.runMigrations()
    })

    it("Should be able to create a survey", async () => {
        const response = await request(app).post("/surveys")
            .send({
                title: "Usando o TDD",
                description: "Aprendendo a usar o TDD com o Jest"
            })

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("id")
    })

    it("Not to be able to create a survey with exists title", async () => {
        const response = await request(app).post("/surveys")
            .send({
                title: "Usando o TDD",
                description: "Aprendendo a usar o TDD com o Jest no TS"
            })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("error")

    })

    it("Should be able to get all surveys", async () => {
        await request(app).post("/surveys")
            .send({
                title: "Segundo TDD",
                description: "Aprendendo a usar o TDD com o Jest"
            })

        const response = await request(app).get("/surveys")

        expect(response.body.length).toBeGreaterThan(1)
        expect(response.body[0]).toHaveProperty("id")
    })
})