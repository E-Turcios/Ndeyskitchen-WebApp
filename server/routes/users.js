const express = require('express');
const userController = require('../controllers/userController');

const middleware = require('../middlewares');

const router = express.Router();

router.post('/verify-email-link', userController.verifyEmailLink);

router.post('/', middleware.verifyEmail, userController.createUser);

router.post('/createGoogleUser', userController.createGoogleUser);

router.post('/forgot-password', userController.forgotPassword);

router.post('/getUser', userController.getUserCredentials);

router.post('/getGoogleUser', userController.getGoogleUserCredentials);

router.post('/get-user-data', middleware.validateUser, userController.getUser);

router.delete('/:id', middleware.validateUser, userController.deleteUser);

router.post(
  '/reset-password-link',
  middleware.validateResetPasswordLinkToken,
  userController.resetPasswordLink
);

router.post(
  '/reset-password',
  middleware.validateResetPasswordToken,
  userController.resetPassword
);

module.exports = router;
