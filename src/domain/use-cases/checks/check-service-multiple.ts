import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckMultipleServiceUseCase {
    execute(url: string): Promise<boolean> // una promesa que devuelve un boolean
}

type SuccessCallBack = (() => void) | undefined;
type ErrorCallBack = ((error: string) => void) | undefined;

export class CheckMultipleService implements CheckMultipleServiceUseCase {

    constructor(
        private readonly logRepository: LogRepository[],
        private readonly successCallBack: SuccessCallBack,
        private readonly errorCallBack: ErrorCallBack
    ) { }

    private callLogs(log:LogEntity) {
        this.logRepository.forEach(logRepository => {
            logRepository.saveLog(log)
        })
    }

    public async execute(url: string): Promise<boolean> {
        try {
            const req = await fetch(url);
            if (!req.ok) {
                throw new Error(`Error on check service ${url}`);
            }
            const log = new LogEntity({message:`Service ${url} is working`, level: LogSeverityLevel.low, createdAt: new Date(), origin: 'check-service.ts'});
            this.callLogs(log)
            this.successCallBack && this.successCallBack();
            console.log(`Service ${url} is ok`);
            return true;
        } catch (error) {
            const errorMessage = `${error}`
            const log = new LogEntity({message:`${errorMessage}`,level: LogSeverityLevel.high, createdAt: new Date(), origin: 'check-service.ts'});
            this.callLogs(log)
            this.errorCallBack && this.errorCallBack(`${errorMessage}`);
            return false
        }
    }
} 