import mongoose from 'mongoose';
import tileTypeSchema from '../schemas/TileTypes';

module.exports = mongoose.model('TileType', tileTypeSchema);
