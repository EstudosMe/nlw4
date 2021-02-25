import request from 'supertest'
import { app } from '../app'
import createConnection from '../database/index'

describe("Users", () => {
    beforeAll(async () => {
        const connection = await createConnection()
        await connection.runMigrations()
    })

    it("Should be able to create a new user", async () => {
        const response = await request(app).post("/users")
            .send({
                email: "teste@dev.com",
                name: "Tester"
            })

        expect(response.status).toBe(201)

    })

    it("Not to be able to create a user with the same email", async () => {
        const response = await request(app).post("/users")
            .send({
                email: "teste@dev.com",
                name: "Tester"
            })

        expect(response.status).toBe(400)
    })
})