import Express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
// import seeder from 'mongoose-seed';
import winston from 'winston';
import morgan from 'morgan';
// import dbSeedData from '../resources/dbseed';
import BluebirdPromise from 'bluebird';
import logger from '../logger';
import config from '../../config';

import todoRoute from './routes/todo.router';
import authRouter from './routes/auth.router';
import resourceRouter from './routes/resource.router';

import authMiddleware from './middlewares/authMiddleware';

const port = config.apiPort;

const app = new Express();

// setup the logger
if (config.env === 'development') {
  app.use(morgan('combined', { stream: logger.stream }));
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/json' }));

app.use('/todo', todoRoute);
app.use('/auth', authRouter);

app.use(authMiddleware);

app.use('/resource', resourceRouter);

mongoose.Promise = BluebirdPromise;

const connectionString = `mongodb://${config.dbHost}:${config.dbPort}/${config.dbName}`;

// seeder.connect(connectionString, function() {
//   seeder.loadModels(dbSeedData.modelPaths);
//   seeder.clearModels(dbSeedData.models, function() {
//     seeder.populateModels(dbSeedData.data, function() {
//       seeder.disconnect();
//     });
//   });
// });

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    logger.add(
      new winston.transports.MongoDB({
        level: 'info',
        db: connectionString,
        collection: 'logs',
        options: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
      }),
    );
    console.log('Api Server Started');

    app.listen(port, (err) => {
      if (err) {
        console.error('err:', err);
      } else {
        console.info(
          `===> api server is running at ${config.apiHost}:${config.apiPort}`,
        );
      }
    });
  })
  .catch((err) => {
    console.log(
      'Please check if you have Mongo installed. The following error occurred: ',
      err,
    );
  });
