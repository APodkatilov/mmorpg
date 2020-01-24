import mongoose from 'mongoose';
import battleMapSchema from '../schemas/BattleMaps';

module.exports = mongoose.model('BattleMap', battleMapSchema);
