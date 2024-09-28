const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;



// Controller function to get all users from the 'users' collection
const getAll = async (req, res) =>{
    const result = await mongodb.getDatabase().db().collection('users').find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);

    });
};


// Controller function to get a single user by their ID
const getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id);  // Convert the request parameter `id` into a MongoDB ObjectId
    const result = await mongodb.getDatabase().db().collection('users').find({_id: userId});
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0]);

    });

};

const createUser = async (req, res) => {
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const response = await mongodb.getDatabase().db().collection('users').insertOne(user);
    if (response.acknowledged > 0) {
        res.status(204).send();
      } else {
        res.status(500).json(response.error || 'Some error occurred while creating the User.');
      }
}; 


const updateUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    // be aware of updateOne if you only want to update specific fields
    const user = {
      username: req.body.username,
      lastName: req.body.lastName,
      email: req.body.email,
      ipaddress: req.body.ipaddress
    };
    const response = await mongodb.getDatabase().db().collection('users').replaceOne({ _id: userId }, user);
    if (response.modifiedCount) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the user.');
    }
  };


  const deleteUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('users').deletOne({ _id: userId }, true);
    console.lo
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
    }
  };


module.exports ={
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};

















