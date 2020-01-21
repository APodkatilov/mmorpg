import mongoose from 'mongoose'
import userSessionSchema from '../schemas/UserSessions';

module.exports = mongoose.model("UserSession", userSessionSchema);
