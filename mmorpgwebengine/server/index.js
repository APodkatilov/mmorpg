import Express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';
import WebSocket from 'ws';
import BluebirdPromise from 'bluebird';
import http from 'http';
import logger from './logger';
import config, { Env, Param } from './config';

import WebSocketsManager from './sockets/WebSocketsManager';
import BattleEventManager from './core/battleEventManager';

import RouteRegistrator from './api/routes';
import ignoreCaseMiddleware from './api/middlewares/ignoreCaseMiddleware';

const app = new Express();

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

if (config.get(Param.Env) !== Env.Development) {
  app.set('view cache', true);
}
if (config.get(Param.Env) === Env.Development) {
  app.use(morgan('combined', { stream: logger.stream }));
}
const imagePath = path.join(process.cwd(), config.get(Param.ImagePath));
app.use('/image', Express.static(imagePath));

const publicDir = path.resolve(__dirname, 'public/testbox');
app.use('/testbox', Express.static(publicDir));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(cookieParser());
app.use(ignoreCaseMiddleware);

RouteRegistrator.register(app);

mongoose.Promise = BluebirdPromise;


const dbConnectionString = config.get(Param.Db);
mongoose
  .connect(dbConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    logger.info('MongoDb connected.');

    const port = config.get(Param.ApiPort);

    const httpServer = http.createServer(app);
    const wss = new WebSocket.Server({ server: httpServer });
    const webSocketsManager = new WebSocketsManager(wss);
    webSocketsManager.start();

    httpServer.listen(port, (err) => {
      if (err) {
        logger.error(`Api server listen error ${err}`);
      } else {
        logger.info(`Api server is running at ${config.get(Param.ApiHost)}:${port}.`);

        BattleEventManager.webSocketsManager = webSocketsManager;
      }
    });
  })
  .catch((err) => {
    logger.error(`MongoDb connection error ${err}`);
  });
