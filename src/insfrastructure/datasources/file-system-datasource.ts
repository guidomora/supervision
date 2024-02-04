import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import fs from 'fs';

export class FileSysemDataSource implements LogDatasource {
    private readonly logPath= 'logs/'
    private readonly allLogsPath= 'logs/logs-low.log'
    private readonly medumLogsPath= 'logs/logs-medium.log'
    private readonly highLogsPath= 'logs/logs-high.log'

    constructor(){
        this.createLogsFile()
    }

    private createLogsFile = () => {
        if (!fs.existsSync(this.logPath)){
            fs.mkdirSync(this.logPath)
        }
    }

    saveLog(log: LogEntity): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        throw new Error("Method not implemented.");
    }

}