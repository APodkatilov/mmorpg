import mongoose from "mongoose";

module.exports = new mongoose.Schema({
  name: { type: String, required: true },
  img: { type: Buffer, required: true },
  props: {
    distance: { type: Number, default: 0, min: 0 },
    damage: { type: Number, default: 0, min: 0 },
    defence: { type: Number, default: 0, min: 0 },
    accuracy: { type: Number, default: 0, min: 0 },
    speed: { type: Number, default: 0, min: 0 }
  },
  cost: { type: Number, required: true, min: 0 },
  amunitionType: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "AmunitionTypes"
  }
});
