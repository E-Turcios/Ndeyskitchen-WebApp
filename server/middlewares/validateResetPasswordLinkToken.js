const User = require('../database/models/userModel');
const jwt = require('jsonwebtoken');

const { TOKEN_EXPIRED } = require('../messages');

async function validateResetPasswordLinkToken(req, res, next) {
  const { userToken } = req.body;

  try {
    jwt.verify(userToken, process.env.JWT, async (err, data) => {
      const payload = jwt.verify(userToken, process.env.JWT, {
        ignoreExpiration: true,
      });

      if (err === null) {
        const user = await User.findOne({
          _id: payload.id,
          token: payload.token,
        });

        req.user = user;
        console.log(req.user);
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
