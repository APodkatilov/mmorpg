import mongoose from "mongoose";

module.exports = new mongoose.Schema({
  name: { type: String, required: true },
  width: { type: Number, required: true, min: 0 },
  height: { type: Number, required: true, min: 0 }
});
