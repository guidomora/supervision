import { LogModel } from "../../data/mongoDB";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class MongoLogDataSource implements LogDatasource {
    async saveLog(log: LogEntity): Promise<void> {
        const newLog = await LogModel.create(log); // con esto ya lo crea y se guarda en mongo
        // await newLog.save(); con esto nos asegurariamos 100% que se guardo, pero no es necesario
        console.log("MongoLog creado", newLog.id);
        
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const logs = await LogModel.find({
            level: severityLevel
        })
        return logs.map(LogEntity.fromObject)
    }

}