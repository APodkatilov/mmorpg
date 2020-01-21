import mongoose from 'mongoose'
import teamSchema from '../schemas/Teams';

module.exports = mongoose.model("Team", teamSchema);
