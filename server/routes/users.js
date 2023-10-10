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
  resetPassword,
} = require('../controllers/userController');

const router = express.Router();

router.post('/', createUser);

router.post('/createGoogleUser', createUser);

router.post('/forgot-password', getUserEmail);

router.post('/getUser', getUserCredentials);

router.post('/getGoogleUser', getGoogleUserCredentials);

router.get('/:id', validateUser, getUser);

router.get('/', validateUser, getAllUsers);

router.get('/reset-password/:id/:token', validateUser, resetPassword);

router.delete('/:id', validateUser, deleteUser);

module.exports = router;
