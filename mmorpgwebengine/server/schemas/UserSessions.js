import mongoose from 'mongoose';
import uuid from 'uuid/v1';

const userSessionSchema = new mongoose.Schema(
  {
    token: { type: String, required: true },
    deadline: { type: Date, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  },
  { timestamps: true },
);

const generateToken = () => uuid();

userSessionSchema.statics = {
  register(user) {
    const userSession = new this({
      token: generateToken(),
      deadline: new Date(),
      // eslint-disable-next-line no-underscore-dangle
      user: user._id,
    });

    return userSession.save();
  },
};

userSessionSchema.index({ token: 1 });

module.exports = userSessionSchema;
