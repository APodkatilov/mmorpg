import mongoose from 'mongoose'
import playerSchema from '../schemas/Players';

module.exports = mongoose.model("Player", playerSchema);
