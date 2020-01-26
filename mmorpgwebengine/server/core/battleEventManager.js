import events from 'events';

export const BattleEvents = Object.freeze({
  CreateBattle: 'CreateBattle',
  ConnectBattle: 'ConnectBattle',
  StartBattle: 'StartBattle',
});
class BattleEventManager {
  constructor() {
    // eslint-disable-next-line no-underscore-dangle
    this._battleEventEmitter = new events.EventEmitter();
  }

  get playerEventEmitter() {
    // eslint-disable-next-line no-underscore-dangle
    return this._battleEventEmitter;
  }

  signalCreateBattle(battleId) {
    this.playerEventEmitter.emit(BattleEvents.CreateBattle, battleId);
  }

  signalConnectBattle(battleId, teamId, playerId) {
    this.playerEventEmitter.emit(BattleEvents.ConnectBattle, battleId, teamId, playerId);
  }

  signalStartBattle(battleId) {
    this.playerEventEmitter.emit(BattleEvents.ConnectBattle, battleId);
  }
}

export default new BattleEventManager();
