import mongoose from 'mongoose'
import userSchema from '../schemas/Users';

module.exports = mongoose.model("User", userSchema);
