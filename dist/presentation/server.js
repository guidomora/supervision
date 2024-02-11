"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const check_service_1 = require("../domain/use-cases/checks/check-service");
const cron_service_1 = require("./cron/cron-service");
const log_repository_impl_1 = require("../insfrastructure/repositories/log.repository.impl");
const file_system_datasource_1 = require("../insfrastructure/datasources/file-system-datasource");
const fileSystemLogRepository = new log_repository_impl_1.LogRepositoryImpl(new file_system_datasource_1.FileSysemDataSource());
class Server {
    static start() {
        console.log('Server started');
        cron_service_1.CronService.createJob('*/5 * * * * *', () => {
            // new CheckService().execute('https://www.google.com')
            new check_service_1.CheckService(fileSystemLogRepository, () => console.log('Success'), (error) => console.log(error)).execute('https://www.google.com/');
        });
    }
}
exports.Server = Server;
