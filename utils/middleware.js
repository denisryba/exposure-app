const logger = require('./logger.js');

const unknownRoute = (req, res) => {
  res.status(404).json({ error: 'unknown route' });
};

const errorHandler = (error, req, res, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return res.status(400).json({ error: 'provided parameter is not a valid id' });
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }

  next(error);
};

module.exports = {
  unknownRoute,
  errorHandler
};