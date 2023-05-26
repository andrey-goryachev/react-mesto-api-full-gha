const Card = require('../models/card');
const {
  NotFoundError,
  NotOwnerEntityError,
} = require('../errors/errors');

const getCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .populate('likes')
    .then((cards) => res.send({ cards }))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ card }))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const cardId = req.params.id;
  Card.findById(cardId)
    .orFail(() => {
      throw new NotFoundError('Такой карточки нет');
    })
    .then((card) => {
      if (card.owner._id.valueOf() !== req.user._id) {
        throw new NotOwnerEntityError('Вы не владелец карточки');
      }
      return card.deleteOne()
        .then((deletedCard) => res.send(deletedCard));
    })
    .catch(next);
};

const addLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      res.send({ card });
    })
    .catch(next);
};

const removeLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      res.send({ card });
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLike,
  removeLike,
};
