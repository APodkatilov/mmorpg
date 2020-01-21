import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    nickname: {
      type: String,
      required: true,
      trim: true,
      minLength: 6,
      maxLength: 20,
      unique: true,
      index: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true
    },
    passwordHash: { type: String, required: true },
    salt: { type: String, default: "" }
  },
  {
    timestamps: true
  }
);

module.exports = userSchema;
