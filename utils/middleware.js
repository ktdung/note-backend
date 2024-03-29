const logger = require('./logger');

const requestLogger = (req, res, next) => {
  logger.info('::---loggger start');
  logger.info('Method:', req.method);
  logger.info('Path:', req.path);
  logger.info('Body:', req.body);
  logger.info('::--- logger end');
  next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknow endpoint' });
};

const errorHandler = (error, req, res, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  } else if (
    error.name === 'MongoServerError' &&
    error.message.include('E11000 duplicate key error')
  ) {
    return res.status(400).json({
      error: 'expected `username` to be unique',
    });
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: error.message });
  } else if (error.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: 'token expired',
    });
  }

  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
