import mongoose from "mongoose";

module.exports = new mongoose.Schema(
  {
    text: { type: String, required: true }
  },
  {
    timestamps: true
  }
);
