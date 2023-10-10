const express = require('express');
const {
  createUser,
  getUser,
  getAllUsers,
  deleteUser,
  getUserCredentials,
  validateUser,
  getGoogleUserCredentials,
  forgotPassword,
  resetPassword,
} = require('../controllers/userController');

const router = express.Router();

router.post('/', createUser);

router.post('/createGoogleUser', createUser);

router.post('/forgot-password', forgotPassword);

router.post('/getUser', getUserCredentials);

router.post('/getGoogleUser', getGoogleUserCredentials);

router.get('/:id', validateUser, getUser);

router.get('/', validateUser, getAllUsers);

router.get('/reset-password/:id/:token/:userToken', resetPassword);

router.delete('/:id', validateUser, deleteUser);

module.exports = router;
