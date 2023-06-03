const express = require('express');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routes/index');
require('dotenv').config();
const { handleErrors } = require('./errors/errors');
// const { mongoPath } = require('./config');
const {
  requestLogger,
  errorLogger,
} = require('./middlewares/logger');

const {
  DB_ADDRESS = 'mongodb://127.0.0.1:27017/mestodb',
  PORT = 3000,
} = process.env;

mongoose.connect(DB_ADDRESS, { autoIndex: true });

const app = express();
app.use(cors());
app.use(express.json());
app.use(requestLogger);
// удалить после ревью
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);
app.use(errorLogger);
// noinspection JSCheckFunctionSignatures
app.use(errors());
app.use(handleErrors);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Приложение запущено, порт ${PORT}`);
});
