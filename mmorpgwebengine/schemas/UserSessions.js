import mongoose from "mongoose";

const userSessionSchema = new mongoose.Schema(
  {
    token: { type: String, required: true },
    deadline: { type: Date, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" }
  },
  { timestamps: true }
);

userSessionSchema.index({ token: 1 });

module.exports = userSessionSchema;
