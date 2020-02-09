import mongoose from 'mongoose';

module.exports = new mongoose.Schema({
  name: { type: String, required: true },
  teamCount: { type: Number, default: 2 },
  teamPlayerCount: { type: Number, default: 5 },
  battleMapSizeType: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'BattleMapSizeType',
  },
});
