const jwt = require('jsonwebtoken');

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
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'invalid token' })
  };

  next(error);
};

const tokenExtractor = (req, res, next) => {
  const auth = req.get('authorization');
  if (auth && auth.toLowerCase().startsWith('bearer')) {
    req.token = auth.split(' ')[1];
  }

  next();
};

const tokenValidator = (req, res, next) => {
  if (!req.token) {
    return res.status(401).json({ error: 'token is missing'});
  }
  const decodedData = jwt.verify(req.token, process.env.SECRET);
  if (!decodedData.id) {
    return res.status(401).json({ error: 'token invalid'});
  }

  next();
};

module.exports = {
  unknownRoute,
  errorHandler,
  tokenExtractor,
  tokenValidator
};