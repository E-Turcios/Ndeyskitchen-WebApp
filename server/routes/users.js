const express = require('express');
const {
  createUser,
  getUser,
  getAllUsers,
  deleteUser,
  getUserCredentials,
  validateUser,
} = require('../controllers/userController');

const router = express.Router();

router.post('/', createUser);

router.post('/user', getUserCredentials);

router.get('/:id', validateUser, getUser);

router.get('/', validateUser, getAllUsers);

router.delete('/:id', validateUser, deleteUser);

module.exports = router;
