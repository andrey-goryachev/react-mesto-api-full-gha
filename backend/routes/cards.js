const router = require('express').Router();
const {
  celebrate,
  Segments,
  Joi,
} = require('celebrate');
const auth = require('../middlewares/auth');
const {
  getCards,
  createCard,
  deleteCard,
  addLike,
  removeLike,
} = require('../controllers/cards');
const { linkRegExp } = require('../config');

router.get('/', auth, getCards);

router.post('/', auth, celebrate({
  [Segments.BODY]: Joi.object().keys({
    link: Joi.string()
      .required()
      .regex(linkRegExp),
    name: Joi.string()
      .required()
      .min(2)
      .max(30),
  }),
}), createCard);

router.delete('/:id', auth, celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string()
      .hex()
      .required()
      .min(24)
      .max(24),
  }),
}), deleteCard);

router.put('/:cardId/likes', auth, celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string()
      .hex()
      .required()
      .min(24)
      .max(24),
  }),
}), addLike);

router.delete('/:cardId/likes', auth, celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string()
      .hex()
      .required(),
  }),
}), removeLike);

module.exports = router;
