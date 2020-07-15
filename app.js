const config = require('./utils/config');
const express = require('express');
require('express-async-errors');
const cors = require('cors');
const plansRouter = require('./controllers/plans.js');
const usersRouter = require('./controllers/users.js');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const mongoose = require('mongoose');
const morgan = require('morgan');

const app = express();

logger.info('connecting to', config.MONGO_URL);

mongoose.connect(config.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    logger.info('connected to Mongo');
  })
  .catch(error => {
    logger.info('error occured while connecting', error.message);
  });

morgan.token('body', (req, res) => JSON.stringify(req.body));
const logTemplate = ':method :url :status :res[content-length] - :response-time ms :body';

app.use(cors());
app.use(express.json());
app.use(morgan(logTemplate));

app.use('/api/plans', plansRouter);
app.use('/api/users', usersRouter);

app.use(middleware.unknownRoute);
app.use(middleware.errorHandler);

module.exports = app;