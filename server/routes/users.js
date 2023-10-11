const express = require('express');
const {
  createUser,
  getUser,
  getAllUsers,
  deleteUser,
  getUserCredentials,
  getGoogleUserCredentials,
  forgotPassword,
  resetPasswordLink,
  resetPassword,
} = require('../controllers/userController');

const { validateUser, validateResetPasswordToken } = require('../middlewares');

const router = express.Router();

router.post('/', createUser);

router.post('/createGoogleUser', createUser);

router.post('/forgot-password', forgotPassword);

router.post('/getUser', getUserCredentials);

router.post('/getGoogleUser', getGoogleUserCredentials);

router.post('/reset-password-link', resetPasswordLink);

router.post('/reset-password', validateResetPasswordToken, resetPassword);

router.get('/', validateUser, getAllUsers);

router.get('/:id', validateUser, getUser);

router.delete('/:id', validateUser, deleteUser);

module.exports = router;
