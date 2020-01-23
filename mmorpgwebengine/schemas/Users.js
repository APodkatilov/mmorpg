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

const generateHash = (str, salt) => {
  return str;
};

const generateSalt = () => {
  return "salt";
};

userSchema.virtual("password").set(function(value) {
  this.salt = generateSalt();
  this.passwordHash = generateHash(value, this.salt);
});

userSchema.statics = {
  singIn: function(email, password) {
    return this.findOne({ email }).then(user => {
      if (!user) {
        throw new Error("Пользователь не найден.");
      }

      const passwordHash = generateHash(password, user.salt);

      if (passwordHash !== user.passwordHash) {
        throw new Error("Пользователь не найден.");
      }

      return new mongoose.Promise.resolve(user);
    });
  },

  signOn: function(nickname, email, password) {
    const model = this;

    return this.findOne({ nickname }).then(user => {
      if (user !== null) {
        throw new Error("Пользователь с таким именем уже существует");
      }

      return this.findOne({ email }).then(user => {
        if (user !== null) {
          throw new Error(
            "Пользователь с таким адресом электронной почты уже существует"
          );
        }

        const salt = generateSalt();
        const passwordHash = generateHash(password, salt);
        const newUser = new model({
          nickname,
          email,
          passwordHash,
          salt
        });
        return newUser.save();
      });
    });
  }
};

module.exports = userSchema;
