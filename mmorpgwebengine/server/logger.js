import winston from 'winston';
import path from 'path';
import conifg, {Param, Env} from '../config';
import config from '../config';

require('winston-mongodb');
// eslint-disable-next-line no-unused-expressions
require('winston-mongodb').MongoDB;

const logger = winston.createLogger();

if (config.get(Param.Env) === Env.Development) {
  const logFilePath = path.join(__dirname, '../logs/log.log');
  logger.add(new winston.transports.Console({ level: 'info' }));    
  logger.add(new winston.transports.File({ filename: logFilePath, level: 'info' }));    
}

const dbConnectionString = config.get(Param.Db);

logger.add(
  new winston.transports.MongoDB({
    level: 'info',
    db: dbConnectionString,
    collection: config.get(Param.MongoLogCollection),
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  }),
);

logger.stream = {
  write: (info) => {
    logger.info(info);
  },
};

export default logger;
