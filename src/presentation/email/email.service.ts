import nodemailer from 'nodemailer' // hay que instalar las dependencias de desarrollo de ts
import { envs } from '../../config/plugins/envs.plugins'
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachments[];
}

interface Attachments {
    filename: string;
    path: string;

}



export class EmailService { // usamos nodemailer con nuestras variables de entorno
    private transporter = nodemailer.createTransport({ // el transporter es el obj que termina mandando el email
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    })

    constructor(
        // private readonly logRepository: LogRepository,
    ) {}

    // solo se encarga de enviar el mail 
    async sendEmail(options: SendMailOptions): Promise<boolean> {
        const { to, subject, htmlBody, attachments = [] } = options
        try {
            const sentInformation = this.transporter.sendMail({
                to,
                subject,
                html: htmlBody,
                attachments
            })
            // console.log("???", sentInformation);

            const log = new LogEntity({
                level:LogSeverityLevel.low,
                message: `Email sent to ${to}`,
                origin: 'email-service.ts'
            })
            // this.logRepository.saveLog(log)

            return true
        } catch (error) {
            const log = new LogEntity({
                level:LogSeverityLevel.high,
                message: `Email not to ${to}`,
                origin: 'email-service.ts'
            })
            // this.logRepository.saveLog(log)
            return false
        }
    }

    // se encarga de enviar el mail con los archivos adjuntos
    async sendEmailFileWithFileSytemLogs(to: string | string[]) { // archivos
        const subjects = 'Logs del sistema'
        const htmlBody = `
        <h1>Logs del sistema</h1>
        <p> sdjhfsdjkhfskjdfhskdjhfskdjhkjsdhfksjdfhskdjhfskjdhfkjshdfkjhsdhjkfjkdshfskjh </p>
        <p>Ver los adjuntos</p>
        `;
        const attachments = [
            {
                filename: 'logs-all.log',
                path: './logs/logs-all.log'
            },
            {
                filename: 'logs-high.log',
                path: './logs/logs-high.log'
            }
        ]

        return this.sendEmail({ //envio del mail utilizando el metodo creado anteriormente
            to,
            subject: subjects,
            htmlBody,
            attachments
        })
    }
}