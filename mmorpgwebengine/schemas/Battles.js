import mongoose from 'mongoose';
import BattleMoves from './BattleMoves';
import Message from './Message';

const battleSchema = new mongoose.Schema(
  {
    moves: [{ type: BattleMoves, required: true }],
    beginAt: { type: Date },
    finishAt: { type: Date },
    teams: [{ type: mongoose.Schema.Types.ObjectId, required: true }],
    battleMap: { type: mongoose.Schema.Types.ObjectId, required: true },
    messages: [{ type: Message, required: true }],
  },
  { timestamps: true },
);

battleSchema.index({ teams: 1 });

module.exports = battleSchema;
