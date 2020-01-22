import winston from "winston";
import path from "path";
require("winston-mongodb");
require("winston-mongodb").MongoDB;

var logFilePath = path.join(__dirname, "../logs/log.log");

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({ level: "info" }),
    new winston.transports.File({ filename: logFilePath, level: "info" })
  ]
});

logger.stream = {
  write: info => {
    logger.info(info);
  }
};

export default logger;
