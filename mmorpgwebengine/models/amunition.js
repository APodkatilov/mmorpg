import mongoose from 'mongoose';
import amunitionSchema from '../schemas/Amunitions';

module.exports = mongoose.model('Amunition', amunitionSchema);
