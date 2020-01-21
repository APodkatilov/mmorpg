import mongoose from "mongoose";

module.exports = new mongoose.Schema({
  name: { type: String, required: true },
  img: { type: Buffer, required: true }
});
