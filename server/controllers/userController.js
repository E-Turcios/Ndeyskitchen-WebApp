const mongoose = require('mongoose');
const crypto = require('crypto');
const User = require('../database/models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

require('dotenv').config();

const {
  USER_NOT_FOUND,
  USERS_NOT_FOUND,
  UNAUTHORIZED_REQUEST,
  PASSWORD_INCORRECT,
} = require('../errors');

async function createUser(req, res) {
  const { firstName, lastName, email, password, number } = req.body;
  bcrypt.hash(password, 11, async (error, hash) => {
    try {
      const user = await User.create({
        firstName,
        lastName,
        email,
        password: hash,
        number,
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
}

async function createGoogleUser(req, res) {
  const { firstName, lastName, email } = req.body;

  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getUserCredentials(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (!user) return res.status(404).json({ error: USER_NOT_FOUND });

  const id = user._id;
  const match = await bcrypt.compare(password, user.password);

  if (!match) return res.status(404).json({ error: PASSWORD_INCORRECT });

  try {
    const token = jwt.sign({ id: id }, process.env.JWT, { expiresIn: '1d' });
    return res
      .status(200)
      .cookie('token', token, { httpOnly: true, secure: true })
      .json({ token: token });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

async function getGoogleUserCredentials(req, res) {
  const { email } = req.body;

  const user = await User.findOne({ email: email });

  if (!user) return res.status(404).json({ error: USER_NOT_FOUND });

  const id = user._id;

  try {
    const token = jwt.sign({ id: id }, process.env.JWT, { expiresIn: '1d' });
    return res
      .status(200)
      .cookie('token', token, { httpOnly: true, secure: true })
      .json({ token: token });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

async function validateUser(req, res, next) {
  try {
    const userID = jwt.verify(req.headers.authorization, process.env.JWT);

    const user = await User.findOne({ _id: userID.id });

    if (!user) return res.status(401).json({ error: UNAUTHORIZED_REQUEST });

    req.user = user;
    next();
  } catch (err) {
    return res.status(401);
  }
}

async function forgotPassword(req, res) {
  const { email } = req.body;

  const user = await User.findOne({ email: email });

  if (!user) return res.status(404).json({ error: USER_NOT_FOUND });

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
    console.log(link);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: `${process.env.EMAIL_ADDRESS}`,
        pass: `${process.env.EMAIL_PASSWORD}`,
      },
    });

    const mailOptions = {
      from: 'youremail@gmail.com',
      to: user.email,
      subject: 'Reset Password',
      html: `
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
  `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    return res.status(200).json({ token: userToken, link: link });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

async function resetPassword(req, res) {
  const { userToken } = req.body;

  try {
    const userData = jwt.verify(userToken, process.env.JWT);

    const user = await User.findOne({
      _id: userData.id,
      token: userData.token,
    });

    if (!user) return res.status(401).json({ error: UNAUTHORIZED_REQUEST });

    return res.status(200).json({ Message: 'Reset Password' });
  } catch (err) {
    return res.status(401);
  }
}

async function getAllUsers(req, res) {
  const users = await User.find().sort();

  if (req.user) {
    if (!users) return res.status(404).json({ error: USERS_NOT_FOUND });
    return res.status(200).json(users);
  }

  return res.status(401).json({ error: UNAUTHORIZED_REQUEST });
}

async function isUserValid(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: USER_NOT_FOUND });
  }
}

async function getUser(req, res) {
  const id = req.params.id;

  isUserValid(id);

  const user = await User.findById(id);

  if (!user) return res.status(404).json({ error: USER_NOT_FOUND });

  res.status(200).json(user);
}

async function deleteUser(req, res) {
  const id = req.params.id;

  isUserValid(id);

  try {
    const user = await User.deleteOne({ _id: id });
    if (!user) res.status(200).json({ mssg: 'Deletion Complete' });
  } catch (err) {
    res.status(200).json({ mssg: 'Deletion Incomplete' });
  }
}

module.exports = {
  createUser,
  createGoogleUser,
  getUser,
  forgotPassword,
  getAllUsers,
  deleteUser,
  getUserCredentials,
  getGoogleUserCredentials,
  validateUser,
  resetPassword,
};
