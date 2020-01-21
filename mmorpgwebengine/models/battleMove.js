import mongoose from 'mongoose'
import battleMoveSchema from '../schemas/BattleMoves';

module.exports = mongoose.model("BattleMove", battleMoveSchema);
