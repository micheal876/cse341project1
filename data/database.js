const dotenv =require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient; // Import MongoDB client from the official 'mongodb' package

let database;

// Function to initialize the database connection
const initDb = (callback) => {
    if (database) {
        console.log('Db is already initialized!');  // If the database is already initialized, log a message and return the existing connection
        return callback(null, database);
    }
    MongoClient.connect (process.env.MONGODB_URL) // Connect to the MongoDB server using the connection string stored in environment variables
    .then((client) => {
        database = client;
        callback (null, database);
    })
    .catch((err) => {
        callback(err);    // If an error occurs during connection, pass the error to the callback
    });

};

const getDatabase = () => {
    // Throw an error if the database has not been initialized yet
    if (!database) { 
        throw Error('Database not initialized')
    }
    return database;
};
// Export the initDb and getDatabase functions to be used in other modules
module.exports = {
    initDb,
    getDatabase
};