import request from 'supertest'
import { createConnection } from "typeorm"
import { app } from "../app"


describe("SurveysUsers", () => {
    beforeAll(async () => {
        const connection = await createConnection()
        await connection.runMigrations()
    })

    it("Should be able to create a SurveysUsers", async () => {
        const createdSurvey = await request(app).post("/surveys")
            .send({
                title: "Quero o ID",
                description: "Quero um id valido"
            })
        await request(app).post("/users")
            .send({
                email: "survey@dev.com",
                name: "User dervey"
            })

        const { id } = createdSurvey.body

        const response = await request(app).post('/sendemail').send({
            email: "survey@dev.com",
            surveys_id: id
        })

        expect(response.body).toHaveProperty("id")

    })

    it("Not be able to create a SurveyUsers with User's EMAIL that no exists", async () => {
        const trustSurveysID = await request(app).post('/surveys').send({
            title: "Testando o envio de email",
            description: "Enviar email"
        })

        const { id } = trustSurveysID.body

        const response = await request(app).post('/sendemail')
            .send({
                email: "naoexisto@.com",
                surveys_id: id
            })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("error")
    })

    it("Not be able to create a SurveysUsers with Surveys ID that not exists", async () => {
        const response = await request(app).post('/sendemail')
            .send({
                email: "teste@dev.com",
                surveys_id: "nao existo"
            })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("error")
    })
})