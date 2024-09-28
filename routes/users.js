const express = require('express'); 

const router = express.Router();

const usersController = require('../controllers/users');

router.get('/', usersController.getAll); 

router.get('/:id', usersController.getSingle); //! GET /api/users/:id - Calls usersController.getSingle to return one user by their ID

router.post('/', usersController.createUser);  // !POST /api/users - Calls usersController.createUser to create a new user

router.put('/:id', usersController.updateUser);   //! PUT /api/users/:id - Calls usersController.updateUser to update user details by ID  

router.delete('/:id', usersController.deleteUser); // !DELETE /api/users/:id - Calls usersController.deleteUser to delete a user by ID
module.exports = router; 