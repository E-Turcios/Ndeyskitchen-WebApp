const { validateUser } = require('./validateUser');
const { validateResetPasswordToken } = require('./validateResetPasswordToken');
const {
  validateResetPasswordLinkToken,
} = require('./validateResetPasswordLinkToken');

module.exports = {
  validateUser,
  validateResetPasswordToken,
  validateResetPasswordLinkToken,
};
