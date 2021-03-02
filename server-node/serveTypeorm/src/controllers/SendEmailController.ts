import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { UserRepository } from "../repositories/UserRepository";
import SendEmailService from "../services/SendEmailService";


class SendEmailController {
    async execute(req: Request, res: Response) {
        try{
            const { email, title } = req.body
    
            const userRepository = getCustomRepository(UserRepository)
            const surveysRepository = getCustomRepository(SurveysRepository)
            const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)
    
            const userAlredyExists = await userRepository.findOne({ email })
    
            if (!userAlredyExists) {
                return res.status(400).json({ error: "Este usuário não existe" })
            }
    
            const surveysAlredyExists = await surveysRepository.findOne({ title: title })
            
            if(!surveysAlredyExists){
                return res.status(400).json({error:"Esta pequisa não existe"})
            }
    
            const surveyUser = surveysUsersRepository.create({
                user_id: userAlredyExists.id,
                surveys_id: surveysAlredyExists.id
            })
    
            await surveysUsersRepository.save(surveyUser)
    
            await SendEmailService.execute(
                email,
                surveysAlredyExists.title, 
                surveysAlredyExists.description, 
                userAlredyExists.name
                )
            
            return res.status(201).json(surveyUser)

        }catch(error){
            console.log("Error: ", error)
            return res.status(500).json({error:"Erro interno no servidor"})
        }
    }
}

export { SendEmailController }