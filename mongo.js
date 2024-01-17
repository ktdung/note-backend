const mongoose = require('mongoose');

// if (process.argv.length < 3) {
//   console.log('give password as argument');
//   process.exit(1);
// }

// const password = process.argv[2];

const url =
  'mongodb+srv://fullstack:fullstackopen@cluster0.wwg7ir4.mongodb.net/testNoteApp?retryWrites=true&w=majority';

mongoose.set('strictQuery', false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model('Note', noteSchema);

// find
Note.find({}).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });

  mongoose.connection.close();
});

// create new document
// {
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

// const note = new Note({
//   content: 'Browser can execute only JavaScript',
//   important: false,
// });

// note.save().then((result) => {
//   console.log('note saved!');
//   console.log(result);
//   mongoose.connection.close();
// });
