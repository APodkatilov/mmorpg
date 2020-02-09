import mongoose from 'mongoose';

module.exports = new mongoose.Schema({
  img: { type: String, required: true },
  tileType: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'TileTypes',
  },
});
