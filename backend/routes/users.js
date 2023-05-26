const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');
const auth = require('../middlewares/auth');
const {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');
const { linkRegExp } = require('../config');

router.get('/me', auth, getCurrentUser);

router.patch('/me', auth, celebrate({
  [Segments.BODY]: Joi.object().keys({
    about: Joi.string()
      .required()
      .min(2)
      .max(30),
    name: Joi.string()
      .required()
      .min(2)
      .max(30),
  }),
}), updateProfile);

router.patch('/me/avatar', auth, celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string()
      .required()
      .regex(linkRegExp),
  }),
}), updateAvatar);

router.get('/:id', auth, celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string()
      .hex()
      .required()
      .min(24)
      .max(24),
  }),
}), getUserById);

router.get('/', auth, getUsers);

module.exports = router;
