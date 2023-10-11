const User = require('../database/models/userModel');
const jwt = require('jsonwebtoken');

const { UNAUTHORIZED_REQUEST } = require('../messages');

async function validateUser(req, res, next) {
  try {
    const userID = jwt.verify(req.headers.authorization, process.env.JWT);

    const user = await User.findOne({ _id: userID.id });

    if (!user) return res.status(401).json({ error: UNAUTHORIZED_REQUEST });

    req.user = user;
    console.log(req.user);
    next();
  } catch (err) {
    return res.status(401);
  }
}

module.exports = {
  validateUser,
};
