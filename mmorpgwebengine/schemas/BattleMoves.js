import mongoose from 'mongoose';
import BattleAction from './BattleAction';

module.exports = new mongoose.Schema({
  num: { type: Number, required: true },
  actions: [{ type: BattleAction, required: true }],
  finished: { type: Boolean, required: true },
  player: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Player',
  },
});
