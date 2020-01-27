import Express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
// import seeder from 'mongoose-seed';
import winston from 'winston';
import morgan from 'morgan';
import WebSocket from 'ws';
// import dbSeedData from '../resources/dbseed';
import BluebirdPromise from 'bluebird';
import logger from '../logger';
import config from '../../config';

import todoRoute from './routes/todo.router';
import authRouter from './routes/auth.router';
import resourceRouter from './routes/resource.router';
import battleRouter from './routes/battle.router';

import authMiddleware from './middlewares/authMiddleware';
import WebSocketsManager from '../sockets/WebSocketsManager';
import BattleEventManager from '../core/battleEventManager';


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
app.use('/battle', battleRouter);

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

        const wss = new WebSocket.Server({ port: config.webSocketPort });
        const webSocketsManager = new WebSocketsManager(wss);

        webSocketsManager.start();

        BattleEventManager.webSocketsManager = webSocketsManager;
        // .then(() => {
        //   console.info(
        //     `===> web sockets server is running at ${config.apiHost}:${config.webSocketPort}`,
        //   );
        // }).catch((wsErr) => {
        //   console.info(
        //     `===> web sockets server start fail (${wsErr.message})at ${config.apiHost}:${config.webSocketPort}`,
        //   );
        // });
      }
    });
  })
  .catch((err) => {
    console.log(
      'Please check if you have Mongo installed. The following error occurred: ',
      err,
    );
  });
