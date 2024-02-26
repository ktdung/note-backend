const mongoose = require('mongoose');
const supertest = require('supertest');
const { test, describe, after, beforeEach } = require('node:test');
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

// after(async () => {
//   await mongoose.connection.close();
// });

// // node:test

// // // init database way-1
// // beforeEach(async () => {
// //   await Note.deleteMany({});

// //   let noteObject = new Note(helper.initialNotes.length);
// //   await noteObject.save();

// //   noteObject = new Note(helper.initialNotes.length);
// //   await noteObject.save();
// // });

// // // init database way-2 : wrong way
// // beforeEach(async () => {
// //   await Note.deleteMany({});
// //   console.log('clearned');

// //   helper.initialNotes.forEach(async (note) => {
// //     let noteObject = new Note(note);
// //     await noteObject.save();
// //     console.log('saved');
// //   });
// //   console.log('done');
// // });

// // // init database way-3
// beforeEach(async () => {
//   await Note.deleteMany({});

//   const noteObject = helper.initialNotes.map(
//     (note) => new Note(note)
//   );

//   const promiseArray = noteObject.map((note) => note.save());
//   await Promise.all(promiseArray);
// });

// test('there are two notes', async () => {
//   console.log('entered test');
//   const response = await api.get('/api/notes');

//   assert.strictEqual(
//     response.body.length,
//     helper.initialNotes.length
//   );
// });

// test('the first note is about HTTP methods', async () => {
//   const response = await api.get('/api/notes');

//   const contents = response.body.map((e) => e.content);
//   // assert.strictEqual(contents.includes('HTML is easy'), true);
//   assert(contents.includes('HTML is easy'));
// });

// test('notes are returned as json', { only: true }, async () => {
//   await api
//     .get('/api/notes')
//     .expect(200)
//     .expect('Content-Type', /application\/json/);
// });

// test('there are two notes', { only: true }, async () => {
//   const response = await api.get('/api/notes');

//   assert.strictEqual(response.body.length, 2);
// });

// test('a specific note is within the returned notes', async () => {
//   const response = await api.get('/api/notes');

//   const contents = response.body.map((r) => r.content);

//   assert(contents.includes('Browser can execute only JavaScript'));
// });

// test('a valid note can be added', async () => {
//   const newNote = {
//     content: 'async/await simplifes making async calls',
//     important: true,
//   };

//   await api
//     .post('/api/notes')
//     .send(newNote)
//     .expect(201)
//     .expect('Content-Type', /appliaction\/json/);

//   const notesAtEnd = await helper.notesInDb();
//   assert.strictEqual(
//     notesAtEnd.length,
//     helper.initialNotes.length + 1
//   );

//   const contents = notesAtEnd.map((n) => n.content);
//   assert(
//     contents.includes('async/await simplifies making async calls')
//   );
// });

// test('note without content is not added', async () => {
//   const newNote = {
//     important: true,
//   };

//   await api.post('/api/notes').send(newNote).expect(400);

//   const notesAtEnd = await helper.notesInDb();

//   assert.strictEqual(notesAtEnd.length, helper.initialNotes.length);
// });

// test('a specifit note can be viewed', async () => {
//   const notesAtStart = await helper.notesInDb();

//   const noteToView = notesAtStart[0];

//   const resultNote = await api
//     .get(`/api/notes/${noteToView.id}`)
//     .expect(200)
//     .expect('Content-Type', /application\/json/);

//   assert.deepStrictEqual(resultNote.body, noteToView);
// });

// test('a note can be deleted', async () => {
//   const notesAtStart = await helper.notesInDb();
//   const noteToDelete = notesAtStart[0];

//   await api.delete(`/api/notes/${noteToDelete.id}`).expect(204);

//   const notesAtEnd = await helper.notesInDb();

//   const contents = notesAtEnd.map((r) => r.content);
//   assert(!contents.includes(noteToDelete.content));

//   assert.strictEqual(
//     notesAtEnd.length,
//     helper.initialNotes.length - 1
//   );
// });

// after(async () => {
//   await mongoose.connection.close();
// });

// using node:test with group test

describe('when there is initially some notes saved', () => {
  beforeEach(async () => {
    await Note.deleteMany({});
    await Note.insertMany(helper.initialNotes);
  });

  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all notes are returned', async () => {
    const response = await api.get('/api/notes');

    assert.strictEqual(
      response.body.length,
      helper.initialNotes.length
    );
  });

  test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes');

    const contents = response.body.map((r) => r.content);
    assert(contents.includes('Browser can execute only JavaScript'));
  });

  describe('viewing a specific note', () => {
    test('succeeds with a valid id', async () => {
      const notesAtStart = await helper.notesInDb();

      const noteToView = notesAtStart[0];

      const resultNote = await api
        .get(`/api/notes/${noteToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      assert.deepStrictEqual(resultNote.body, noteToView);
    });

    test('fails with statuscode 404 if note does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId();

      await api.get(`/api/notes/${validNonexistingId}`).expect(404);
    });

    test('fails with statuscode 400 id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445';

      await api.get(`/api/notes/${invalidId}`).expect(400);
    });
  });

  describe('addition of a new note', () => {
    test('succeeds with valid data', async () => {
      const newNote = {
        content: 'async/await simplifies making async calls',
        important: true,
      };

      await api
        .post('/api/notes')
        .send(newNote)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const notesAtEnd = await helper.notesInDb();
      assert.strictEqual(
        notesAtEnd.length,
        helper.initialNotes.length + 1
      );

      const contents = notesAtEnd.map((n) => n.content);
      assert(
        contents.includes('async/await simplifies making async calls')
      );
    });

    test('fails with status code 400 if data invalid', async () => {
      const newNote = {
        important: true,
      };

      await api.post('/api/notes').send(newNote).expect(400);

      const notesAtEnd = await helper.notesInDb();

      assert.strictEqual(
        notesAtEnd.length,
        helper.initialNotes.length
      );
    });
  });

  describe('deletion of a note', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const notesAtStart = await helper.notesInDb();
      const noteToDelete = notesAtStart[0];

      await api.delete(`/api/notes/${noteToDelete.id}`).expect(204);

      const notesAtEnd = await helper.notesInDb();

      assert.strictEqual(
        notesAtEnd.length,
        helper.initialNotes.length - 1
      );

      const contents = notesAtEnd.map((r) => r.content);
      assert(!contents.includes(noteToDelete.content));
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
