import { error, log } from "console";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";
import { LogRepositoryImpl } from "../insfrastructure/repositories/log.repository.impl";
import { FileSysemDataSource } from "../insfrastructure/datasources/file-system-datasource";
import { envs } from "../config/plugins/envs.plugins";
import { EmailService } from "./email/email.service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { MongoLogDataSource } from "../insfrastructure/datasources/mongo-log.datasource";
import { PostgresLogDatsource } from "../insfrastructure/datasources/postgres-log.datasource";
import { CheckMultipleService } from "../domain/use-cases/checks/check-service-multiple";
import fs from 'fs';

const postgreRepository = new LogRepositoryImpl(
    new PostgresLogDatsource()
);

const mongoRepository = new LogRepositoryImpl(
    new MongoLogDataSource()
);

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSysemDataSource()
);

const emailService = new EmailService();

export class Server {
    static start() { // no ponemos que es publico porque es el valor por defecto, a menos que pongamos privado
        console.log('Server started');
        // console.log(envs.MAILER_SECRET_KEY, envs.MAILER_EMAIL);

        // new SendEmailLogs(emailService, fileSystemLogRepository,).execute(['guidomorabito161@hotmail.com', ])
        // emailService.sendEmailFileWithFileSytemLogs(['guidomorabito161@hotmail.com', ])

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                // new CheckService().execute('https://www.google.com')
                new CheckMultipleService(
                    [fileSystemLogRepository, postgreRepository, mongoRepository],
                    () => console.log('Success'),
                    (error) => console.log(error),
                ).execute('https://www.google.com/')
            }
        )
    }

}

