import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import fs from 'fs';

export class FileSysemDataSource implements LogDatasource {
    private readonly logPath= 'logs/'
    private readonly allLogsPath= 'logs/logs-all.log'
    private readonly medumLogsPath= 'logs/logs-medium.log'
    private readonly highLogsPath= 'logs/logs-high.log'

    constructor(){
        this.createLogsFile()
    }

    private createLogsFile = () => {
        if (!fs.existsSync(this.logPath)){
            fs.mkdirSync(this.logPath)
        }

        [
            this.allLogsPath,
            this.medumLogsPath,
            this.highLogsPath
        ].forEach(path => {
            if (!fs.existsSync(path)) return;
            fs.writeFileSync(path, '')
        })
    }

    saveLog(log: LogEntity): Promise<void> {
        fs.appendFileSync(this.allLogsPath, `${JSON.stringify(log)}\n`)
    }
    getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        throw new Error("Method not implemented.");
    }

}