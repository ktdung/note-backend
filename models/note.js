const mongoose = require('mongoose');

const noteScheme = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: [true, 'content must more than 5 characters'],
  },
  important: Boolean,
});

noteScheme.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Note', noteScheme);
