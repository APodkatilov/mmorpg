import mongoose from 'mongoose';
import PlayerModel from '../models/player';

const userSchema = new mongoose.Schema(
  {
    nickname: {
      type: String,
      required: true,
      trim: true,
      minLength: 6,
      maxLength: 20,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    passwordHash: { type: String, required: true },
    salt: { type: String, default: '' },
    online: { type: Boolean, default: false },
    lastPing: { type: Date, index: true },
  },
  {
    timestamps: true,
  },
);

// eslint-disable-next-line no-unused-vars
const generateHash = (str, salt) => str;

const generateSalt = () => 'salt';

userSchema.virtual('password').set(function setPassword(value) {
  this.salt = generateSalt();
  this.passwordHash = generateHash(value, this.salt);
});

userSchema.statics = {
  getOnline() {
    return this.find({ online: true });
  },
  connect(userId) {
    return this.findByIdAndUpdate(userId, { $set: { online: true, lastPing: new Date() } });
  },
  getPlayer(userId) {
    return PlayerModel.findOne({ user: userId });
  },
  disconnect(userId) {
    return this.findByIdAndUpdate(userId, { $set: { online: false } });
  },
  singIn(email, password) {
    return this.findOne({ email }).then((user) => {
      if (!user) {
        throw new Error('Пользователь не найден.');
      }

      const passwordHash = generateHash(password, user.salt);

      if (passwordHash !== user.passwordHash) {
        throw new Error('Пользователь не найден.');
      }

      return mongoose.Promise.resolve(user);
    });
  },

  signOn(nickname, email, password) {
    const Model = this;

    return this.findOne({ nickname }).then((userByNickname) => {
      if (userByNickname !== null) {
        throw new Error('Пользователь с таким именем уже существует');
      }

      return this.findOne({ email }).then((userByEmail) => {
        if (userByEmail !== null) {
          throw new Error(
            'Пользователь с таким адресом электронной почты уже существует',
          );
        }

        const salt = generateSalt();
        const passwordHash = generateHash(password, salt);

        const userId = mongoose.Types.ObjectId();

        return PlayerModel.createDefault(userId).then(() => {
          const newUser = new Model({
            _id: userId,
            nickname,
            email,
            passwordHash,
            salt,
          });
          return newUser.save();
        });
      });
    });
  },
};

module.exports = userSchema;
