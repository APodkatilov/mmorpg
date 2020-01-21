import mongoose from 'mongoose'
import battleActionTypeSchema from '../schemas/BattleAction';

module.exports = mongoose.model("BattleAction", battleActionTypeSchema);