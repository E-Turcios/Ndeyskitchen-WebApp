const User = require('../database/models/userModel');
const jwt = require('jsonwebtoken');

async function validateResetPasswordToken(req, res, next) {
  try {
    const userData = jwt.verify(req.body.userToken, process.env.JWT);

    const user = await User.findOne({
      _id: userData.id,
      token: userData.token,
    });

    req.user = user;
    next();
  } catch (err) {}
}

module.exports = { validateResetPasswordToken };
