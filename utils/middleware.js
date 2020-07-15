const logger = require('./logger.js');

const unknownRoute = (req, res) => {
  res.status(404).send({ error: 'unknown route' });
};

const errorHandler = (error, req, res, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'provided parameter is not a valid id' });
  } 

  next(error);
};

module.exports = {
  unknownRoute,
  errorHandler
};