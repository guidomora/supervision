"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogEntity = exports.LogSeverityLevel = void 0;
var LogSeverityLevel;
(function (LogSeverityLevel) {
    LogSeverityLevel["low"] = "low";
    LogSeverityLevel["medium"] = "medium";
    LogSeverityLevel["high"] = "high";
})(LogSeverityLevel || (exports.LogSeverityLevel = LogSeverityLevel = {}));
class LogEntity {
    constructor(message, level) {
        this.message = message;
        this.level = level;
        this.createdAt = new Date();
    }
}
exports.LogEntity = LogEntity;
LogEntity.fromJson = (json) => {
    const { message, level, createdAt } = JSON.parse(json);
    const log = new LogEntity(message, level);
    log.createdAt = new Date(createdAt);
    return log;
};
