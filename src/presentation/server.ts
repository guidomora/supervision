import { error, log } from "console";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";
import { LogRepositoryImpl } from "../insfrastructure/repositories/log.repository.impl";
import { FileSysemDataSource } from "../insfrastructure/datasources/file-system-datasource";
import { envs } from "../config/plugins/envs.plugins";
import { EmailService } from "./email/email.service";

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSysemDataSource(),
    // mongo
    // postgres
);



export class Server {
    static start() { // no ponemos que es publico porque es el valor por defecto, a menos que pongamos privado
        console.log('Server started');
        console.log(envs.MAILER_SECRET_KEY, envs.MAILER_EMAIL);

        const emailService = new EmailService();
        emailService.sendEmail({
            to: "guidomorabito161@hotmail.com",
            subject: "logs del sistema",
            htmlBody: `
                <h1>Logs del sistema</h1>
                <p> sdjhfsdjkhfskjdfhskdjhfskdjhkjsdhfksjdfhskdjhfskjdhfkjshdfkjhsdhjkfjkdshfskjh </p>
                <p>Ver los adjuntos</p>
                `
        })

        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         // new CheckService().execute('https://www.google.com')
        //         new CheckService(
        //             fileSystemLogRepository,
        //             () => console.log('Success'),
        //             (error) => console.log(error),
        //         ).execute('https://www.google.com/')
        //     }
        // )
    }

}

