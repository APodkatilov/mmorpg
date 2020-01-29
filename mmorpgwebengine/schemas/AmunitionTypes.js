import mongoose from 'mongoose';

module.exports = new mongoose.Schema({
  name: { type: String, required: true },
  img: { type: String, required: true },
});
