const router = require('express').Router();
const {
  celebrate,
  Segments,
  Joi,
} = require('celebrate');
const userRouter = require('./users');
const cardRouter = require('./cards');
const incorrect = require('./incorrect');
const {
  login,
  createUser,
} = require('../controllers/users');

router.post('/signin', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string()
      .email()
      .required()
      .min(2)
      .max(30),
    password: Joi.string()
      .required()
      .min(2)
      .max(30),
  }),
}), login);

router.post('/signup', celebrate({
  [Segments.BODY]: Joi.object().keys({
    about: Joi.string()
      .min(2)
      .max(30),
    avatar: Joi.string()
      .regex(/^(https?|ftp):\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b[-a-zA-Z0-9()@:%_+.~#?&\/=]*$/),
    email: Joi
      .string()
      .email()
      .required()
      .min(2)
      .max(30),
    name: Joi.string()
      .min(2)
      .max(30),
    password: Joi.string()
      .required()
      .min(2)
      .max(30),
  }),
}), createUser);
router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use('*', incorrect);

module.exports = router;
