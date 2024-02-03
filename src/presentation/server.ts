import { error } from "console";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";





export class Server {
    static start() { // no ponemos que es publico porque es el valor por defecto, a menos que pongamos privado
        console.log('Server started');
        CronService.createJob(
            '*/5 * * * * *',
            () => {
                // new CheckService().execute('https://www.google.com')
                new CheckService(
                    () => console.log('Success'),
                    (error) => console.log(error),
                ).execute('http://localhost:3000')
            }
        )
    }

}

