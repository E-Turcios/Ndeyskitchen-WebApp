const { validateUser } = require('./validateUser');
const { validateResetPasswordToken } = require('./validateResetPasswordToken');
const {
  validateResetPasswordLinkToken,
} = require('./validateResetPasswordLinkToken');
const { verifyEmail } = require('./verifyEmail');
const { validateOrder } = require('./validateOrder');

module.exports = {
  validateUser,
  validateResetPasswordToken,
  validateResetPasswordLinkToken,
  verifyEmail,
  validateOrder,
};
