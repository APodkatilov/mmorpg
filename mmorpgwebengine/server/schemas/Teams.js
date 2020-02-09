import mongoose from 'mongoose';
import Player from '../models/player';

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    color: { type: String },
    players: [
      { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Players' },
    ],
  },
  { timestamps: true },
);

teamSchema.index({ players: 1 });

teamSchema.methods = {
  getPlayers: function getPlayers() {
    return Player.find({ _id: { $in: this.players } });
  },
};
module.exports = teamSchema;
