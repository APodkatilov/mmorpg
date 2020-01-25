import mongoose from 'mongoose';

module.exports = new mongoose.Schema(
  {
    text: { type: String, required: true },
    player: { type: mongoose.Schema.Types.ObjectId, ref: 'Players' },
  },
  {
    timestamps: true,
  },
);
