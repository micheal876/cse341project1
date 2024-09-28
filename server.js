const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database'); // MongoDB module


const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json())
// Middleware or route handling
app.use('/', require('./routes'));

// Initialize the database and start the server only after a successful connection
mongodb.initDb((err) => {
  if (err) {
    console.log('Failed to connect to the database:', err);
  } else {
    // Start the server only after the database is connected
    app.listen(port, () => {
      console.log(`Database is connected, and the server is running on port ${port}`);
    });
  }
});