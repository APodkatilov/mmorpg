import mongoose from 'mongoose';
import battleMapTypeSchema from '../schemas/BattleMapTypes';

module.exports = mongoose.model('BattleMapType', battleMapTypeSchema);
