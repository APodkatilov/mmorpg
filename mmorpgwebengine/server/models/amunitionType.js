import mongoose from 'mongoose';
import amunitionTypeSchema from '../schemas/AmunitionTypes';

module.exports = mongoose.model('AmunitionType', amunitionTypeSchema);
