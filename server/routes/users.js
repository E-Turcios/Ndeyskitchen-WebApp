const express = require('express');
const {
  createUser,
  createGoogleUser,
  getUser,
  getAllUsers,
  deleteUser,
  getUserCredentials,
  validateUser,
} = require('../controllers/userController');

const router = express.Router();

router.post('/', createUser);

router.post('/createGoogleUser', createUser);

router.post('/user', getUserCredentials);

router.get('/:id', validateUser, getUser);

router.get('/', validateUser, getAllUsers);

router.delete('/:id', validateUser, deleteUser);

module.exports = router;
