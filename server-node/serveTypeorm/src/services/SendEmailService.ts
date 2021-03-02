import nodemailer, { Transporter } from 'nodemailer'
import dotenv from 'dotenv'

class SendEmailService {
    private client: Transporter

    constructor() {
        dotenv.config()
        nodemailer.createTestAccount().then((account) => {
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD
                }
            });

            this.client = transporter
        })
    }

    async execute(to: string, subject: string, body: string, name: string) {
        const message = await this.client.sendMail({
            to,
            subject,
            html: `Olá, ${name}. ${body} `,
            from: "Algum desenvolvedor <assisserver@gmail.com.br"
        })

        console.log(`Email enviado!`)
    }
}

export default new SendEmailService()