/* eslint-disable no-underscore-dangle */
import events from 'events';
import TeamModel from '../../models/team';
import UserModel from '../../models/user';
import logger from '../logger';

import { battleCreateMessage, battleConnectMessage, battleStartMessage } from '../sockets/messages/battle.message';
import { playerConnectMessage, playerLeaveMessage } from '../sockets/messages/player.message';
import { BattleEvents, PlayerEvents } from './gameEventTypes';

class BattleEventManager {
  constructor() {
    // eslint-disable-next-line no-underscore-dangle
    this._battleEventEmitter = new events.EventEmitter({ captureRejections: true });
    this._webSocketsManager = null;
  }

  get webSocketsManager() {
    return this._webSocketsManager;
  }

  set webSocketsManager(value) {
    this._webSocketsManager = value;

    this._subscribe();
  }

  get playerEventEmitter() {
    // eslint-disable-next-line no-underscore-dangle
    return this._battleEventEmitter;
  }

  _subscribe() {
    if (this._battleEventEmitter) {
      this._battleEventEmitter.on('error', (err) => {
        logger.error(`EM error ${err.message}.`);
      });

      this._battleEventEmitter.on(BattleEvents.BattleCreate, this._onBattleCreate.bind(this));
      this._battleEventEmitter.on(BattleEvents.BattleConnect, this._onBattleConnect.bind(this));
      this._battleEventEmitter.on(BattleEvents.BattleStart, this._onBattleStart.bind(this));

      this._battleEventEmitter.on(PlayerEvents.PlayerConnect, this._onPlayerConnect.bind(this));
      this._battleEventEmitter.on(PlayerEvents.PlayerLeave, this._onPlayerLeave.bind(this));
    }
  }

  _onPlayerConnect(context) {
    const { player } = context;

    const message = playerConnectMessage(player);

    return UserModel.getOnline().then((users) => {
      const userIds = users.map((u) => u._id);
      return this._webSocketsManager.send(userIds, message);
    });
  }

  _onPlayerLeave(userId) {
    return UserModel.getPlayer(userId).then((player) => {
      if (player) {
        const message = playerLeaveMessage(player);

        return UserModel.getOnline().then((users) => {
          const userIds = users.map((u) => u._id);
          return this._webSocketsManager.send(userIds, message);
        });
      }
      return Promise.resolve();
    });
  }

  _onBattleCreate(battle) {
    if (battle == null) {
      throw new Error(`Битва ${battle._id} не найдена.`);
    }

    const message = battleCreateMessage(battle);

    return UserModel.getOnline().then((users) => {
      const userIds = users.map((u) => u._id);
      return this._webSocketsManager.send(userIds, message);
    });
  }

  _onBattleConnect(context, battle, teamId) {
    if (battle == null) {
      throw new Error(`Битва ${battle._id} не найдена.`);
    }

    return TeamModel.findById(teamId).then((team) => {
      if (team == null) {
        throw new Error(`Команда ${teamId} для битвы ${battle._id} не найдена.`);
      }

      const message = battleConnectMessage(battle, team, context.player);

      return UserModel.getOnline().then((users) => {
        const userIds = users.map((u) => u._id);
        return this._webSocketsManager.send(userIds, message);
      });
    });
  }

  _onBattleStart(context, battle) {
    if (battle == null) {
      throw new Error(`Битва ${battle._id} не найдена.`);
    }

    const message = battleStartMessage(battle);

    return UserModel.getOnline().then((users) => {
      const userIds = users.map((u) => u._id);
      return this._webSocketsManager.send(userIds, message);
    });
  }

  signalPlayerConnect(context) {
    this.playerEventEmitter.emit(PlayerEvents.PlayerConnect, context);
  }

  signalPlayerLeave(userId) {
    this.playerEventEmitter.emit(PlayerEvents.PlayerLeave, userId);
  }

  signalCreateBattle(context, battle) {
    this.playerEventEmitter.emit(BattleEvents.BattleCreate, battle);
  }

  signalConnectBattle(context, battle, teamId) {
    this.playerEventEmitter.emit(BattleEvents.BattleConnect, context, battle, teamId);
  }

  signalStartBattle(context, battle) {
    this.playerEventEmitter.emit(BattleEvents.BattleConnect, context, battle);
  }
}

export default new BattleEventManager();
