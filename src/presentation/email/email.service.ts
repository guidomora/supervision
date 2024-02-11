import nodemailer from 'nodemailer' // hay que instalar las dependencias de desarrollo de ts
import { envs } from '../../config/plugins/envs.plugins'

interface SendMailOptions {
    to: string;
    subject: string;
    htmlBody: string;
    // attachments?: any[];
}



export class EmailService { // usamos nodemailer con nuestras variables de entorno
    private transporter = nodemailer.createTransport({ // el transporter es el obj que termina mandando el email
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    })

    async sendEmail(options: SendMailOptions): Promise<boolean> {
        const { to, subject, htmlBody } = options
        try {
            const sentInformation = this.transporter.sendMail({
                to:to,
                subject:subject,
                html: htmlBody
            })
            console.log("???", sentInformation);
            
            return true
        } catch (error) {
            return false
        }
    }
}