// app.js
const express = require('express');
const pool = require('./config/db');
const recipesRoutes = require('./routes/controller');
const app = express();

app.use(express.json());

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


