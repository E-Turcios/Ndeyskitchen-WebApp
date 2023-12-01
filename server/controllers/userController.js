const crypto = require('crypto');
const User = require('../database/models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sendEmail } = require('../script/sendEmail');

require('dotenv').config();

const {
  USER_NOT_FOUND,
  USER_DELETED,
  USER_NOT_DELETED,
  ADDRESS_AND_NUMBER_COULD_NOT_BE_UPDATED,
  ADDRESS_AND_NUMBER_UPDATED,
  UNAUTHORIZED_REQUEST,
  PASSWORD_INCORRECT,
  RESET_PASSWORD,
  PASSWORD_RESET,
  EMAIL_BEING_VERIFIED,
  EMAIL_VERIFICATION_FAILED,
  USER_UPDATE_TOKEN_NOT_FOUND,
  NO_TOKEN_FOUND,
  INVALID_TOKEN,
  TOKEN_VALIDATED,
} = require('../messages');

async function verifyEmailLink(req, res) {
  const { user } = req.body;

  try {
    const promise = new Promise((resolve, reject) => {
      crypto.randomBytes(10, (error, buffer) => {
        if (error) reject(error);
        const token = buffer.toString('hex');
        resolve(token);
      });
    });

    const token = await promise;

    const userToken = jwt.sign(
      {
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
        email: user.email,
        number: user.number,
        countryCode: user.countryCode,
        residence: user.residence,
        token: token,
      },
      process.env.JWT,
      {
        expiresIn: '15m',
      }
    );

    const link = `http://localhost:8081/verify-email/${userToken}`;

    const receiver = user.email;
    const subject = 'Email Verification';
    const message = `
    <div>
    <p>Hello,</p>
    <p>You are almost done signing up.</p>
    <p>Click the link below to veify your email:</p>
    <p><a href="${link}">Verify Email</a></p>
    <p>This link will expire in 15 minutes.</p>
    <p>If you did not signup for <a href="">www.ndeyskitchen.com</a>, you can safely ignore this email.</p>
    <p>Best regards,<br>Ndey's Kitchen</p>
  </div>
`;

    sendEmail(subject, message, receiver);
    return res
      .status(200)
      .json({ token: userToken, Message: EMAIL_BEING_VERIFIED });
  } catch (err) {
    return res.status(500).json({ Message: err });
  }
}

async function createUser(req, res) {
  if (!req.token)
    return res.status(401).json({ Message: EMAIL_VERIFICATION_FAILED });

  const {
    firstName,
    lastName,
    email,
    password,
    number,
    residence,
    countryCode,
  } = req;

  const hash = await bcrypt.hash(password, 11);

  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hash,
      number,
      residence,
      countryCode,
    });

    const receiver = email;
    const subject = 'Verification Completed';
    const message = `
    <div>
      <p><strong>From: Ndey's Kitchen</strong></p>
      <p>Hello,</p>
      <p>You have been verified.</p>
      <p>Best regards,<br>Ndey's Kitchen</p>
    </div>
`;
    sendEmail(subject, message, receiver);

    return res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ Message: error.message });
  }
}

async function createGoogleUser(req, res) {
  const { firstName, lastName, email, sub } = req.body;

  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      sub,
      isGoogleUser: true,
    });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ Message: error.message });
  }
}

async function getUserCredentials(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (!user) return res.status(404).json({ error: USER_NOT_FOUND });

  const id = user._id;
  const match = bcrypt.compare(password, user.password);

  if (!match) return res.status(404).json({ error: PASSWORD_INCORRECT });

  try {
    const token = jwt.sign({ id: id }, process.env.JWT, { expiresIn: '1d' });
    return res.status(200).json({ token: token });
  } catch (err) {
    return res.status(500).json({ Message: err });
  }
}

async function getGoogleUserCredentials(req, res) {
  const { email, sub } = req.body;

  const user = await User.findOne({ email: email, sub: sub });

  if (!user) return res.status(404).json({ Message: USER_NOT_FOUND });

  const id = user._id;

  try {
    const token = jwt.sign({ id: id }, process.env.JWT, { expiresIn: '1d' });
    const userUpdateInfoToken = jwt.sign(
      { string: process.env.STRING },
      process.env.JWT
    );

    return res.status(200).json({
      token: token,
      information: { residence: user.residence, number: user.number },
      userUpdateInfoToken: userUpdateInfoToken,
    });
  } catch (err) {
    return res.status(500).json({ Message: err });
  }
}

async function updateUserAddressAndNumber(req, res) {
  const { form } = req.body;

  if (!req.user) return res.status(404).json({ Message: USER_NOT_FOUND });

  try {
    const user = await User.updateMany(
      { _id: req.user._id },
      {
        number: form.number,
        residence: form.residence,
      }
    );

    if (!user)
      return res
        .status(200)
        .json({ Message: ADDRESS_AND_NUMBER_COULD_NOT_BE_UPDATED });

    return res.status(200).json({ Message: ADDRESS_AND_NUMBER_UPDATED });
  } catch (err) {
    return res.status(500).json({ Message: err });
  }
}

async function updateGoogleUserAddressAndNumber(req, res) {
  const { userUpdateInfoToken, form } = req.body;

  if (!req.user) return res.status(404).json({ Message: USER_NOT_FOUND });

  if (!userUpdateInfoToken)
    return res.status(404).json({ Message: USER_UPDATE_TOKEN_NOT_FOUND });

  const token = jwt.verify(userUpdateInfoToken, process.env.JWT);
  if (!token) res.status(404).json({ Message: USER_UPDATE_TOKEN_NOT_FOUND });

  try {
    const user = await User.updateMany(
      { _id: req.user._id },
      {
        number: form.number,
        residence: form.residence,
        countryCode: form.countryCode,
      }
    );

    if (!user)
      return res
        .status(200)
        .json({ Message: ADDRESS_AND_NUMBER_COULD_NOT_BE_UPDATED });

    return res.status(200).json({ Message: ADDRESS_AND_NUMBER_UPDATED });
  } catch (err) {
    return res.status(500).json({ Message: err });
  }
}

async function verifyUserUpdateToken(req, res) {
  const { userUpdateInfoToken } = req.body;

  if (userUpdateInfoToken === null)
    return res.status(400).json({ Message: NO_TOKEN_FOUND });

  const token = jwt.verify(userUpdateInfoToken, process.env.JWT);

  if (!token) return res.status(400).json({ Message: INVALID_TOKEN });

  return res.status(200).json({ Message: TOKEN_VALIDATED });
}

async function forgotPassword(req, res) {
  const { email } = req.body;

  const user = await User.findOne({ email: email });

  if (!user) return res.status(404).json({ Message: USER_NOT_FOUND });

  const id = user._id;

  try {
    const promise = new Promise((resolve, reject) => {
      crypto.randomBytes(10, (error, buffer) => {
        if (error) reject(error);
        const token = buffer.toString('hex');
        resolve(token);
      });
    });

    const token = await promise;

    await User.findByIdAndUpdate(id, { token: token });

    const userToken = jwt.sign({ id: id, token: token }, process.env.JWT, {
      expiresIn: '15m',
    });

    const link = `http://localhost:8081/reset-password/${userToken}`;

    const receiver = user.email;
    const subject = 'Reset Password';
    const message = `
    <div>
      <p><strong>From: Ndey's Kitchen</strong></p>
      <p>Hello,</p>
      <p>You have requested to reset your password for your Ndey's Kitchen account.</p>
      <p>Click the link below to reset your password:</p>
      <p><a href="${link}">Reset Password</a></p>
      <p>This link will expire in 15 minutes.</p>
      <p>If you did not request this password reset, you can safely ignore this email.</p>
      <p>Best regards,<br>Ndey's Kitchen</p>
    </div>
`;
    sendEmail(subject, message, receiver);

    return res.status(200).json({ token: userToken, link: link });
  } catch (err) {
    return res.status(500).json({ Message: err });
  }
}

async function resetPasswordLink(req, res) {
  if (!req.user) return res.status(401).json({ Message: UNAUTHORIZED_REQUEST });
  return res.status(200).json({ Message: RESET_PASSWORD });
}

async function resetPassword(req, res) {
  const { password } = req.body;

  if (!req.user) return res.status(401).json({ Message: UNAUTHORIZED_REQUEST });

  try {
    const hash = await bcrypt.hash(password, 11);

    await User.findByIdAndUpdate(req.user._id, { password: hash });

    const receiver = req.user.email;
    const subject = 'Password Successfully Reset';
    const message = `
    <div>
      <p><strong>From: Ndey's Kitchen</strong></p>
      <p>Hello,</p>
      <p>You are password has been reset as requested.</p>
      <p>Best regards,<br>Ndey's Kitchen</p>
    </div>
`;
    sendEmail(subject, message, receiver);
  } catch (err) {
    return res.status(401).json({ Message: err });
  }
  return res.status(200).json({ Message: PASSWORD_RESET });
}

async function getUser(req, res) {
  if (!req.user) return res.status(401).json({ Message: USER_NOT_FOUND });

  return res.status(200).json({
    id: req.user._id,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    email: req.user.email,
    number: req.user.number,
    countryCode: req.user.countryCode,
    residence: req.user.residence,
    isGoogleUser: req.user.isGoogleUser,
  });
}

async function deleteUser(req, res) {
  if (!req.user) return res.status(401).json({ Message: USER_NOT_FOUND });

  try {
    const deletedUser = await User.deleteOne({ _id: req.user });

    if (!deletedUser)
      return res.status(200).json({ Message: USER_NOT_DELETED });

    return res.status(200).json({ Message: USER_DELETED });
  } catch (err) {
    res.status(200).json({ Message: err });
  }
}

module.exports = {
  createUser,
  createGoogleUser,
  getUser,
  forgotPassword,
  deleteUser,
  getUserCredentials,
  getGoogleUserCredentials,
  updateUserAddressAndNumber,
  updateGoogleUserAddressAndNumber,
  verifyUserUpdateToken,
  resetPasswordLink,
  resetPassword,
  verifyEmailLink,
};
