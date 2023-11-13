const User = require('../database/models/userModel');
const jwt = require('jsonwebtoken');

const { TOKEN_EXPIRED } = require('../messages');

async function validateUser(req, res, next) {
  const { user } = req.body;

  try {
    jwt.verify(user, process.env.JWT, async (err, data) => {
      const payload = jwt.verify(user, process.env.JWT, {
        ignoreExpiration: true,
      });

      if (err === null) {
        const user = await User.findOne({ _id: payload.id });
        req.user = user;

        next();
      }

      if (err && err.name === 'TokenExpiredError') {
        return res.status(401).json({ Message: TOKEN_EXPIRED });
      }
    });
  } catch (err) {
    return res.status(401);
  }
}

module.exports = {
  validateUser,
};
