import mongoose from "mongoose";

const battleMapSchema = new mongoose.Schema({
  name: { type: String, required: true },
  battleMapType: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "BattleMapType"
  },
  tiles: [
    { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Tiles" }
  ]
});

battleMapSchema.index({ battleMapType: 1 });

module.exports = battleMapSchema;
