const mongoose = require('mongoose');
const supertest = require('supertest');
const { test, describe, after } = require('node:test');
const assert = require('node:assert');
const app = require('../app');
const Note = require('../models/note');
const helper = require('./test_helper');

const api = supertest(app);

// beforeEach(async () => {
//   await Note.deleteMany({});

//   let noteObject = new Note(helper.initialNotes[0]);
//   await noteObject.save();

//   noteObject = new Note(helper.initialNotes[1]);
//   await noteObject.save();
// });

// beforeEach(async () => {
//   await Note.deleteMany({});
//   console.log('clearned mongodb');

//   const noteObjects = helper.initialNotes.map(
//     (note) => new Note(note)
//   );

//   const promiseArray = noteObjects.map((note) => note.save());
//   const data = await Promise.all(promiseArray);
//   console.log('done::', data);
// });

// beforeEach(async () => {
//   await Note.deleteMany({});
//   let i = 0;
//   for (let note of helper.initialNotes) {
//     i++;
//     let noteObject = new Note(note);
//     let data = await noteObject.save();
//     console.log(`${i}: ${data}`);
//   }
// });

// beforeEach(async () => {
//   await Note.deleteMany({});
//   await Note.insertMany(helper.initialNotes);
// });

test('there are two notes', async () => {
  const response = await api.get('/api/notes');

  assert.strictEqual(response.body.length, 2);
});

test('the first note is about HTTP methods', async () => {
  const response = await api.get('/api/notes');

  const contents = response.body.map((e) => e.content);
  assert.strictEqual(contents.includes('html'), true);
});

// describe('when there is initially some notes saved', () => {
//   test('notes are returned as json', async () => {
//     await api
//       .get('/api/notes')
//       .expect(200)
//       .expect('Content-Type', /application\/json/);
//   });

//   test('the first note is', async () => {
//     const response = await api.get('/api/notes');

//     expect(response.body[0].content).toBe('HTML is easy');
//   });

//   test('all notes are returned', async () => {
//     const response = await api.get('/api/notes');

//     expect(response.body).toHaveLength(helper.initialNotes.length);
//   });

//   test('a specific note is within the returned notes', async () => {
//     const response = await api.get('/api/notes');

//     const contents = response.body.map((r) => r.content);

//     expect(contents).toContain('Browser can execute only Javascript');
//   });
// });

// describe('viewing a specific note', () => {
//   test('succeeds with a valid id', async () => {
//     const notesAtStart = await helper.notesInDb();

//     const noteToView = notesAtStart[0];

//     const resultNote = await api
//       .get(`/api/notes/${noteToView.id}`)
//       .expect(200)
//       .expect('Content-Type', /application\/json/);

//     expect(resultNote.body).toEqual(noteToView);
//   });

//   test('fails with statuscode 404 if id note does not exits', async () => {
//     const validNonexitingId = await helper.nonExistingId();

//     await api.get(`/api/notes/${validNonexitingId}`).expect(404);
//   });

//   test('fails with statuscode 400 if id is invalid', async () => {
//     const invalidId = '23232';
//     await api.get(`/api/notes/${invalidId}`).expect(400);
//   });
// });

// describe('addition of new note', () => {
//   test('succeed with valid data', async () => {
//     const newNote = {
//       content: 'async/await simplifies making async calls',
//       important: true,
//     };

//     await api
//       .post('/api/notes')
//       .send(newNote)
//       .expect(201)
//       .expect('Content-Type', /application\/json/);

//     // const response = await api.get('/api/notes');
//     const notesAtEnd = await helper.notesInDb();
//     expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1);

//     const contents = notesAtEnd.map((r) => r.content);
//     expect(contents).toContain(
//       'async/await simplifies making async calls'
//     );
//   });

//   test('fails with status code 400 if data invalid', async () => {
//     const newNote = {
//       important: true,
//     };

//     await api.post('/api/notes').send(newNote).expect(400);

//     // const response = await api.get('/api/notes');
//     const notesAtEnd = await helper.notesInDb();

//     expect(notesAtEnd).toHaveLength(helper.initialNotes.length);
//   });

//   describe('deletion of a note', () => {
//     test('succeeds with status code 204 if id is valid', async () => {
//       const notesAtStart = await helper.notesInDb();
//       const noteToDelete = notesAtStart[0];

//       await api.delete(`/api/notes/${noteToDelete.id}`).expect(204);

//       const notesAtEnd = await helper.notesInDb();

//       expect(notesAtEnd).toHaveLength(helper.initialNotes.length - 1);

//       const contents = notesAtEnd.map((r) => r.content);

//       expect(contents).not.toContain(noteToDelete.content);
//     });
//   });
// });

after(async () => {
  await mongoose.connection.close();
});
