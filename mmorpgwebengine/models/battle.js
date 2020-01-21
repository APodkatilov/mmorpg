import mongoose from 'mongoose';
import battleTypeSchema from '../schemas/Battles';

module.exports = mongoose.model("Battle", battleTypeSchema);