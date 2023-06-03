const jwt = require('jsonwebtoken');
const { NotAuthError } = require('../errors/errors');
const { secretKey } = require('../config');
const {
  NODE_ENV = 'dev',
  JWT_SECRET
} = process.env;

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new NotAuthError('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : secretKey);
  } catch (err) {
    return next(new NotAuthError('Необходима авторизация'));
  }
  req.user = payload;
  next();
};
