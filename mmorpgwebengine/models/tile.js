import mongoose from 'mongoose';
import tileSchema from '../schemas/Tiles';

module.exports = mongoose.model('Tile', tileSchema);
