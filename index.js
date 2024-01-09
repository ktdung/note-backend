const fs = require('fs');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const Note = require('./models/note');

app.use(express.json());
app.use(cors());
app.use(express.static('dist'));

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>');
});

app.get('/api/notes', (req, res) => {
  Note.find({}).then((notes) => {
    res.json(notes);
  });
});

app.post('/api/notes', (req, res, next) => {
  const body = req.body;
  console.log(body);

  if (!body.content) {
    return res.status(400).json({
      error: 'content missing',
    });
  }

  const note = new Note({
    content: body.content,
    important: Boolean(body.important) || false,
  });

  note
    .save()
    .then((savedNote) => {
      res.json(savedNote);
    })
    .catch((error) => next(error));
});

app.put('/api/notes/:id', (req, res, next) => {
  const body = req.body;
  const note = {
    content: body.content,
    important: body.important || false,
  };
  // console.log(note);

  Note.findByIdAndUpdate(req.params.id, note, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedNote) => {
      console.log(updatedNote);
      res.json(updatedNote);
    })
    .catch((error) => next(error));
});

app.get('/api/notes/:id', (req, res, next) => {
  const id = req.params.id;

  // const note = await Note.findOne({ _id: id });
  Note.findById(id)
    .then((note) => {
      console.log(note);
      if (note) {
        res.json(note);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete('/api/notes/:id', (req, res, next) => {
  console.log(req.params.id);
  // Note.findOneAndDelete({
  //   _id: req.params.id,
  // })
  Note.findByIdAndDelete(req.params.id)
    .then((note) => {
      console.log(note);
      res.status(204).end();
    })
    .catch((error) => next(error));
});

const errorHandler = (error, req, res, next) => {
  console.log('hi3');
  console.error(error.message);

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  } else if (error.code === 'ENOENT') {
    return res.status(400).send({ error: 'FILE NOT OPEN' });
  } else if (error.message === 'no data') {
    return res.status(400).send({ error: 'no data' });
  } else if (error.name === 'ValidationError') {
    return res.status(400).send({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// let notes = [
//   {
//     id: 1,
//     content: 'HTML is easy',
//     important: true,
//   },
//   {
//     id: 2,
//     content: 'Browser can execute only JavaScript',
//     important: false,
//   },
//   {
//     id: 3,
//     content:
//       'GET and POST are the most important methods of HTTP protocol',
//     important: true,
//   },
// ];
