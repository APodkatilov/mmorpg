import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    color: { type: String },
    players: [
      { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Players" }
    ]
  },
  { timestamps: true }
);

teamSchema.index({ players: 1 });

module.exports = teamSchema;
