const express = require('express');
const {
  createUser,
  getUser,
  getUserEmail,
  getAllUsers,
  deleteUser,
  getUserCredentials,
  validateUser,
  getGoogleUserCredentials,
} = require('../controllers/userController');

const router = express.Router();

router.post('/', createUser);

router.post('/createGoogleUser', createUser);

router.post('/getUserEmail', getUserEmail);

router.post('/getUser', getUserCredentials);

router.post('/getGoogleUser', getGoogleUserCredentials);

router.get('/:id', validateUser, getUser);

router.get('/', validateUser, getAllUsers);

router.delete('/:id', validateUser, deleteUser);

module.exports = router;
