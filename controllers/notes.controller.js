const notesRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Note = require('../models/note');
const User = require('../models/user');

const getTokenFrom = (request) => {
  console.log(request.get('Authorization'));
  const authorization = request.get('Authorization');
  if (authorization && authorization.startsWith('Bearer')) {
    return authorization.replace('Bearer ', '');
  }
  return null;
};

notesRouter.get('/', async (req, res) => {
  const notes = await Note.find({}).populate('user', {
    username: 1,
    name: 1,
  });
  res.json(notes);
});

notesRouter.post('/', async (req, res) => {
  const body = req.body;
  // console.log(body);

  const decodedToken = jwt.verify(
    getTokenFrom(req),
    process.env.SECRET
  );
  console.log(decodedToken);
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' });
  }
  const user = await User.findById(decodedToken.id);
  console.log(user);

  // if (!body.content) {
  //   return res.status(400).json({
  //     error: 'content missing',
  //   });
  // }

  const note = new Note({
    content: body.content,
    important: body.important === undefined ? false : body.important,
    user: user._id,
  });

  const savedNote = await note.save();
  user.notes = user.notes.concat(savedNote._id);
  await user.save();

  res.status(201).json(savedNote);
});

notesRouter.get('/:id', async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
});

notesRouter.put('/:id', async (req, res) => {
  const body = req.body;

  const note = {
    content: body.content,
    important: body.important || false,
  };

  const updatedNote = await Note.findByIdAndUpdate(
    req.params.id,
    note,
    {
      new: true,
      runValidators: true,
      context: 'query',
    }
  );

  res.json(updatedNote);
});

notesRouter.delete('/:id', async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = notesRouter;
