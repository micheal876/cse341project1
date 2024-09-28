const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database'); //! MongoDB module
const app = express();

const port = process.env.PORT || 3000;


app.use(bodyParser.json())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');  //! Allow requests from any origin (*). You can restrict this to specific domains if needed.
  res.setHeader(
    'Access-control-Allow-Headers',  // !Define which headers are allowed in requests
    'Origin, X-Requested-with, Content-type, Accept, Z-key' //! List of allowed headers, including common ones like Content-Type and custom headers like Z-key
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});
//! Middleware or route handling
app.use('/', require('./routes'));

//! Initialize the database and start the server only after a successful connection
mongodb.initDb((err) => {
  if (err) {
    console.log('Failed to connect to the database:', err);
  } else {
    //! Start the server only after the database is connected
    app.listen(port, () => {
      console.log(`Database is connected, and the server is running on port ${port}`);
    });
  }
});