const express = require('express');
const userController = require('../controllers/userController');

const middleware = require('../middlewares');

const router = express.Router();

router.post('/verify-email-link', userController.verifyEmailLink);

router.post('/', middleware.verifyEmail, userController.createUser);

router.post('/createGoogleUser', userController.createGoogleUser);

router.post('/forgot-password', userController.forgotPassword);

router.post('/get-user', userController.getUserCredentials);

router.post('/get-google-user', userController.getGoogleUserCredentials);

router.post('/get-user-data', middleware.validateUser, userController.getUser);

router.post(
  '/update-address-and-number',
  middleware.validateUser,
  userController.updateAddressAndNumber
);

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
