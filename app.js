const config = require('./utils/config');
const mongoose = require('mongoose');
const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const notesRouter = require('./controllers/notes.controller');
const usersRouter = require('./controllers/users.controller');
const loginRouter = require('./controllers/login.controller');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');

// database init
mongoose.set('strictQuery', false);

logger.info('connecting to ', config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDb');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB: ', error.message);
  });

// middleware
app.use(cors());
app.use(express.json());
app.use(express.static('dist'));
app.use(middleware.requestLogger);

// router
app.use('/api/login', loginRouter);
app.use('/api/notes', notesRouter);
app.use('/api/users', usersRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
