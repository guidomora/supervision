// abstract significa que no se puede crear una instancia de esta clase 

import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

// pbligamos el comportamiento de la clase
export abstract class LogRepository {   
    abstract saveLog(log:LogEntity): Promise<void>;
    abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>;
}