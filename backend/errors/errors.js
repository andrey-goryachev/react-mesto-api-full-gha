// eslint-disable-next-line max-classes-per-file
const mongoose = require('mongoose');

const INCORRECT_DATA_ERROR_CODE = 400;
const NOT_AUTH_ERROR_CODE = 401;
const NOT_OWNER_ENTITY_ERROR_CODE = 403;
const NOT_FOUND_CODE = 404;
const ALREADY_EXISTS_CODE = 409;
const DEFAULT_ERROR_CODE = 500;

class CustomError extends Error {
  // eslint-disable-next-line no-useless-constructor
  constructor(message) {
    super(message);
  }
}
class NotFoundError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND_CODE;
  }
}

class NotAuthError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = NOT_AUTH_ERROR_CODE;
  }
}

class NotOwnerEntityError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = NOT_OWNER_ENTITY_ERROR_CODE;
  }
}

const handleErrors = (err, req, res, next) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).send({ message: err.message });
    return;
  }
  if (err instanceof mongoose.Error.ValidationError || err instanceof mongoose.Error.CastError) {
    res.status(INCORRECT_DATA_ERROR_CODE).send({ message: 'Переданы некорректные данные в методы создания, удаления карточки, пользователя, обновления аватара пользователя или профиля' });
    return;
  }
  if (err.code === 11000) {
    res.status(ALREADY_EXISTS_CODE).send({ message: 'Пользователь с такой почтой уже существует' });
    return;
  }
  res.status(DEFAULT_ERROR_CODE).send({ message: `Произошла ошибка: ${err.message}` });

  next();
};

module.exports = {
  handleErrors,
  NotFoundError,
  NotAuthError,
  NotOwnerEntityError,
};
