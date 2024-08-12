const express = require('express');
const path = require('path');
const app = express();
const api = require('./routes/index');
const notesRouter = require('./routes/notes');
const PORT = 3001;


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to serve up static assets from the public folder
app.use(express.static('public'));

// Send all the requests that begin with /api to the index.js in the routes folder
app.use('/api', api);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
  );

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

