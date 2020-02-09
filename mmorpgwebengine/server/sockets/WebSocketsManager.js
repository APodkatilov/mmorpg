// import Promise from 'bluebird';
/* eslint-disable no-underscore-dangle */
import WebSocket from 'ws';
import * as url from 'url';
import Promise from 'bluebird';
import { getContext } from '../api/middlewares/authMiddleware';
import UserModel from '../../models/user';
import BattleEventManager from '../core/battleEventManager';
import logger from '../logger';

class WebSocketsManager {
  static PingPongInterval = 10000;

  constructor(wss) {
    this._wss = wss;
    this._clients = {};
    this._pollingTimer = null;
  }

  _startPolling() {
    this._pollingTimer = setInterval(() => {
      // eslint-disable-next-line no-unused-vars
      for (const client of Object.values(this._clients)) {
        if (!client.isAlive) {
          this._disconnect(client);
          client.terminate();
        }
        client.isAlive = false;
        client.ping(null, false, true);
      }
    }, WebSocketsManager.PingPongInterval);
  }

  _stopPolling() {
    if (this._pollingTimer) {
      clearInterval(this._pollingTimer);
    }
  }

  _connect(context, client) {
    this._clients[context.userId] = client;
    return UserModel.connect(context.userId).then(() => {
      BattleEventManager.signalPlayerConnect(context);
    });
  }

  _disconnect(client) {
    const userId = Object.keys(this._clients).find((u) => this._clients[u] === client);

    if (userId) {
      delete this._clients[userId];
      return UserModel.disconnect(userId).then(() => {
        BattleEventManager.signalPlayerLeave(userId);
      });
    }

    return Promise.resolve();
  }

  start() {
    this._wss.on('error', (error) => {
      this._stopPolling();
      logger.error(`WS error : ${error}`);
    });

    this._wss.on('close', () => {
      this._stopPolling();
      logger.info('WS connection close.');
    });

    this._wss.on('listening', () => {
      this._startPolling();
      logger.info('WS listening...');
    });

    // eslint-disable-next-line no-underscore-dangle
    this._wss.on('connection', (client, req) => {
      // eslint-disable-next-line no-param-reassign
      client.isAlive = true;

      client.on('pong', () => {
        // eslint-disable-next-line no-param-reassign
        client.isAlive = true;
      });

      client.on('close', (code, reason) => {
        logger.warn(`WS closed, code: ${code}, reason: ${reason}, url:${req.url}.`);
        this._disconnect(client);
      });

      const wsUrl = url.parse(req.url, { parseQueryString: true });
      const { query: { token } } = wsUrl;

      if (token) {
        getContext(token).then((context) => {
          client.on('message', (data) => {
            logger.into(`WS message: ${data}.`);
          });
          return this._connect(context, client);
        }).catch((err) => {
          client.close();
          logger.error(`WS error context resore: ${err.message}.`);
        });
      } else {
        client.close();
        logger.error('WS no auth prams.');
      }
    });
  }


  sendSingleClient(userId, message) {
    const client = this._clients[userId];

    if (client && client.readyState === WebSocket.OPEN) {
      return new Promise((resolve, reject) => {
        const onError = () => {
          client.removeEventListener('error', onError);
          reject();
        };
        client.addEventListener('error', onError);
        client.send(JSON.stringify(message), { fin: true }, () => {
          resolve();
        });
      });
    }
    return Promise.resolve();
  }

  send(users, message) {
    return Promise.all(users.map((u) => this.sendSingleClient(u, message)));
  }
}

export default WebSocketsManager;
