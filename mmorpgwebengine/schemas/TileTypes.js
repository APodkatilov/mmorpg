import mongoose from "mongoose";

module.exports = new mongoose.Schema({
  name: { type: String, required: true },
  props: {
    canWalk: { type: Boolean, default: false },
    canDrive: { type: Boolean, default: false },
    canFire: { type: Boolean, default: false },
    damage: { type: Number, default: false },
    impedance: { type: Number, default: false },
    acceleration: { type: Number, default: false }
  }
});
