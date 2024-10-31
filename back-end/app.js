// app.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const pool = require('./config/db');
const recipesRoutes = require('./routes/controller');
const app = express();

app.use(express.json());
app.use(cors());
app.use('/img', express.static(path.join(__dirname, 'img')));

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Connected to PostgreSQL');
  release();
});

app.use('/recipes', recipesRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});

module.exports = app;


