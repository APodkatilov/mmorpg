import mongoose from 'mongoose';

module.exports = new mongoose.Schema({
  num: { type: Number, required: true },
  props: {
    timestamp: { type: Date, required: true },
    direction: {
      type: String,
      enum: ['North', 'South', 'West', 'East'],
    },
    distance: {
      type: Number,
    },
  },
  actionType: { type: String, requried: true, enum: ['Fire', 'Move', 'Skip'] },
  player: { type: mongoose.Schema.Types.ObjectId, ref: 'Players' },
});
