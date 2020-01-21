import mongoose from "mongoose";
const playerSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true },
    avatar: { type: Buffer },
    props: {
      stamina: { type: Number, required: true, min: 0 },
      accuracy: { type: Number, required: true, min: 0 },
      force: { type: Number, required: true, min: 0 },
      dexterity: { type: Number, required: true, min: 0 }
    },
    stat: {
      level: { type: Number, min: 0, max: 10 },
      credit: { type: Number, min: 0 },
      winBattles: { type: Number, default: 0 },
      loseBattles: { type: Number, default: 0 }
    },
    battleState: {
      health: { type: Number, min: 0 },
      mapPosX: { type: Number },
      mapPosY: { type: Number }
    },
    amunitions: [{ type: mongoose.Schema.Types.ObjectId, required: true }]
  },
  { timestamps: true }
);

playerSchema.index({ user: 1 });

module.exports = playerSchema;
