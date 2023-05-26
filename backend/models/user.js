const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const { linkRegExp } = require('../config');
const { NotAuthError } = require('../errors/errors');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Жак-Ив Кусто',
      minlength: 2,
      maxlength: 30,
    },
    about: {
      type: String,
      default: 'Исследователь',
      minlength: 2,
      maxlength: 30,
    },
    avatar: {
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      type: String,
      validate: {
        validator(v) {
          return linkRegExp.test(v);
        },
      },
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator(v) {
          return validator.isEmail(v);
        },
        message: 'Это не электронная почта',
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { toObject: { useProjection: true }, toJSON: { useProjection: true } },
);

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new NotAuthError('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new NotAuthError('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
