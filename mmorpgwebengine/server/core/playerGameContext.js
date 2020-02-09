/* eslint-disable no-underscore-dangle */
import Promise from 'bluebird';
import Player from '../models/player';

class PlayerGameContext {
  constructor(userId) {
    this._userId = userId;
    this._player = null;
  }

  get userId() {
    return this._userId;
  }

  get player() {
    return this._player;
  }

  set player(value) {
    this._player = value;
  }

  get playerId() {
    // eslint-disable-next-line no-underscore-dangle
    return this.player._id;
  }

  load() {
    const self = this;
    return Player.findOne({ user: this.userId }).then((player) => {
      if (player === null) {
        throw new Error('Игрок не найден.');
      }
      self._player = player;

      return Promise.resolve(self);
    });
  }
}

export default PlayerGameContext;
