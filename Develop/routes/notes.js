const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Helper functions for reading and writing to the JSON file
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');

// This API route is a GET Route for retrieving all the notes
router.get('/', (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile('./db/db.json')
  .then((data) => res.json(JSON.parse(data)))
  .catch((err) => console.error(err))
  ;
});


// This API route is a POST Route for a new UX/UI tip
router.post('/', (req, res) => {
  console.info(`${req.method} request received to add a note`);

  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuidv4(), // Use uuidv4() to generate unique IDs
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully`);
  } else {
    res.status(400).json({ message: 'Error in adding note: Missing title or text' });
  }
});

router.get('/:id', (req, res) => {
  readFromFile('./db/db.json')
    .then((data) => {
      const notes = JSON.parse(data);
      const note = notes.find(note => note.id === req.params.id);
      if (note) {
        res.json(note);
      } else {
        res.status(404).json({ message: 'Note not found' });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'Error retrieving note' });
    });
});

module.exports = router;
