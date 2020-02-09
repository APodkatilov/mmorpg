import mongoose from 'mongoose';

const defaultProps = {
  stamina: 0,
  accuracy: 1,
  force: 1,
  dexterity: 1,
};

const defaultStat = {
  level: 1,
  credit: 100,
  winBattles: 0,
  loseBattles: 0,
};

const playerSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true },
    avatar: { type: Buffer },
    props: {
      stamina: { type: Number, required: true, min: 0 },
      accuracy: { type: Number, required: true, min: 0 },
      force: { type: Number, required: true, min: 0 },
      dexterity: { type: Number, required: true, min: 0 },
    },
    stat: {
      level: { type: Number, min: 0, max: 10 },
      credit: { type: Number, min: 0 },
      winBattles: { type: Number, default: 0 },
      loseBattles: { type: Number, default: 0 },
    },
    battleState: {
      health: { type: Number, min: 0 },
      mapPosX: { type: Number },
      mapPosY: { type: Number },
    },
    activeBattle: { type: mongoose.Schema.Types.ObjectId },
    amunitions: [{ type: mongoose.Schema.Types.ObjectId, required: true }],
  },
  { timestamps: true },
);

playerSchema.index({ user: 1 });

playerSchema.statics = {
  createDefault: function createDefault(userId) {
    const player = new this({
      user: userId,
      props: { ...defaultProps },
      stat: { ...defaultStat },
    });

    return player.save();
  },
};

playerSchema.methods = {
  setActiveBattle: function setActiveBattle(battleId) {
    this.activeBattle = battleId;
    return this.save();
  },
};

module.exports = playerSchema;
