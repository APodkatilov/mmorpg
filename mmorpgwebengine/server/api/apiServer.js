import Express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

import winston from 'winston';
import morgan from 'morgan';
import WebSocket from 'ws';
import BluebirdPromise from 'bluebird';
import logger from '../logger';
import config from '../../config';

import todoRoute from './routes/todo.router';
import authRouter from './routes/auth.router';
import resourceRouter from './routes/resource.router';
import battleRouter from './routes/battle.router';
import playerRouter from './routes/player.router';

import authMiddleware from './middlewares/authMiddleware';
import WebSocketsManager from '../sockets/WebSocketsManager';
import BattleEventManager from '../core/battleEventManager';


const port = config.apiPort;

const app = new Express();

app.set('views', path.join(__dirname, '../../views'));
app.set('view engine', 'ejs');
// app.set('view cache', true);
// setup the logger
// app.configure('development', () => {

// }));
if (config.env === 'development') {
  app.use(morgan('combined', { stream: logger.stream }));
}

const imagePath = path.join(__dirname, '../../image');
app.use('/image', Express.static(imagePath));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(cookieParser());


app.use('/todo', todoRoute);
app.use('/auth', authRouter);

// app.use(authMiddleware);

app.use('/resource', authMiddleware, resourceRouter);
app.use('/battle', authMiddleware, battleRouter);
app.use('player', authMiddleware, playerRouter);
app.get('*', (req, res) => {
  res.end('Route is not supported!');
});

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});
mongoose.Promise = BluebirdPromise;

const connectionString = process.env.MONGODB_URL || `mongodb://${config.dbHost}:${config.dbPort}/${config.dbName}`;

console.log(connectionString);
if (process.env.DB_SEED === 'true') {
  (async () => {
    const seeder = (await import('mongoose-seed')).default;
    const dbSeedData = (await import('../resources/dbseed')).default;
    seeder.connect(connectionString, () => {
      seeder.loadModels(dbSeedData.modelPaths);
      seeder.clearModels(dbSeedData.models, () => {
        seeder.populateModels(dbSeedData.data, () => {
          seeder.disconnect();
        });
      });
    });
  })();
}

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
