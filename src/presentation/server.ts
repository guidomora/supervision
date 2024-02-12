import { error, log } from "console";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";
import { LogRepositoryImpl } from "../insfrastructure/repositories/log.repository.impl";
import { FileSysemDataSource } from "../insfrastructure/datasources/file-system-datasource";
import { envs } from "../config/plugins/envs.plugins";
import { EmailService } from "./email/email.service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { MongoLogDataSource } from "../insfrastructure/datasources/mongo-log.datasource";

const logRepository = new LogRepositoryImpl(
    // new FileSysemDataSource(),
    new MongoLogDataSource(),
    // mongo
    // postgres
);

const emailService = new EmailService();

export class Server {
    static start() { // no ponemos que es publico porque es el valor por defecto, a menos que pongamos privado
        console.log('Server started');
        console.log(envs.MAILER_SECRET_KEY, envs.MAILER_EMAIL);

        // new SendEmailLogs(emailService, fileSystemLogRepository,).execute(['guidomorabito161@hotmail.com', ])
        // emailService.sendEmailFileWithFileSytemLogs(['guidomorabito161@hotmail.com', ])

        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         // new CheckService().execute('https://www.google.com')
        //         new CheckService(
        //             logRepository,
        //             () => console.log('Success'),
        //             (error) => console.log(error),
        //         ).execute('https://www.google.com/')
        //     }
        // )
    }

}

