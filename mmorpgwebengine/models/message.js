import mongoose from 'mongoose';
import messageSchema from '../schemas/Message';

module.exports = mongoose.model('Message', messageSchema);
