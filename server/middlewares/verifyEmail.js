const User = require('../database/models/userModel');
const jwt = require('jsonwebtoken');
const { UNAUTHORIZED_REQUEST, TOKEN_EXPIRED } = require('../messages');

async function verifyEmail(req, res, next) {
  const { userToken } = req.body;

  jwt.verify(userToken, process.env.JWT, async (err, payload) => {
    if (err === null) {
      req.token = payload.token;
      req.firstName = payload.firstName;
      req.lastName = payload.lastName;
      req.email = payload.email;
      req.password = payload.password;
      req.number = payload.number;
      req.residence = payload.residence;
      next();
    }
    if (err && err.name === 'JsonWebTokenError') {
      console.log(err);
      return res.status(401).json({ Message: UNAUTHORIZED_REQUEST });
    }
    if (err && err.name === 'TokenExpiredError') {
      return res.status(401).json({ Message: TOKEN_EXPIRED });
    }
  });
}

module.exports = { verifyEmail };
