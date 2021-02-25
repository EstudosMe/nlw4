import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { SurveysRepository } from '../repositories/SurveysRepository'

class SurveysController {
    async create(req: Request, res: Response) {
        try {
            const { title, description } = req.body

            const surveyRepository = getCustomRepository(SurveysRepository)
            const surveysAlredyExists = await surveyRepository.findOne({
                title
            })

            if (surveysAlredyExists) {
                return res.status(400).json({ error: "Já existe uma pesquisa com este título!" })
            }

            const survey = surveyRepository.create({
                title,
                description
            })

            await surveyRepository.save(survey)

            return res.status(201).json(survey)

        } catch (e) {
            console.log({ error: e })
            return res.status(500).json({ error: "Erro interno no servidor" })
        }
    }

    async listAll(req: Request, res:Response){
        try{
            const surveyRepository = getCustomRepository(SurveysRepository)
    
            const allSurveys = await surveyRepository.find()
            
            if(allSurveys.length == 0){
                return res.status(200).json({message:"Não temos nenhuma pesquisa!"})
            }
            return res.status(200).json(allSurveys)
        }catch(e){
            console.log({error: e})
            return res.status(500).json({error:"Erro interno no servidor!"})
            
        }
    }
}

export { SurveysController }

