const User = require('../database/models/userModel');
const jwt = require('jsonwebtoken');

const { UNAUTHORIZED_REQUEST, TOKEN_EXPIRED } = require('../messages');

async function validateResetPasswordLinkToken(req, res, next) {
  const { userToken } = req.body;
  console.log(userToken);

  try {
    jwt.verify(userToken, process.env.JWT, async (err, payload) => {
      if (err && err.name === 'JsonWebTokenError')
        return res.status(401).json({ Message: UNAUTHORIZED_REQUEST });

      if (err === null) {
        const user = await User.findOne({
          _id: payload.id,
          token: payload.token,
        });

        req.user = user;
        console.log(user.firstName);
        next();
      }

      if (err && err.name === 'TokenExpiredError') {
        await User.findByIdAndUpdate(payload.id, { token: '' });
        return res.status(401).json({ Message: TOKEN_EXPIRED });
      }
    });
  } catch (err) {
    return res.status(401);
  }
}

module.exports = { validateResetPasswordLinkToken };
