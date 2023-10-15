const mongoose = require('mongoose');
const crypto = require('crypto');
const User = require('../database/models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const qedmail = require('qed-mail');

require('dotenv').config();

const {
  USER_NOT_FOUND,
  USERS_NOT_FOUND,
  UNAUTHORIZED_REQUEST,
  PASSWORD_INCORRECT,
  RESET_PASSWORD,
  PASSWORD_RESET,
  EMAIL_DOES_NOT_EXIST,
  TOKEN_EXPIRED,
} = require('../messages');

async function verifyEmailLink(req, res, next) {
  const { email } = req.body;

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
        email: email,
        token: token,
      },
      process.env.JWT,
      {
        expiresIn: '1h',
      }
    );

    const link = `http://localhost:8081/verify-email/${userToken}`;
    //console.log(link);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: `${process.env.EMAIL_ADDRESS}`,
        pass: `${process.env.EMAIL_PASSWORD}`,
      },
    });

    const mailOptions = {
      from: 'youremail@gmail.com',
      to: email,
      subject: 'Email Verification',
      html: `
      <div>
      <p><strong>From: Ndey's Kitchen</strong></p>
      <p>Hello,</p>
      <p>You are almost done signing up.</p>
      <p>Click the link below to veify your email:</p>
      <p><a href="${link}">Verify Email</a></p>
      <p>This link will expire in 15 minutes.</p>
      <p>If you did not signup for <a href="">www.ndeyskitchen.com</a>, you can safely ignore this email.</p>
      <p>Best regards,<br>Ndey's Kitchen</p>
    </div>
  `,
    };

    await transporter.sendMail(mailOptions);
    req.token = token;
    console.log(req.token);
    next();
  } catch (err) {
    return res.status(500).json({ Message: err });
  }
}

async function verifyEmail(req, res, next) {
  const verificationToken1 = req.params.verificationToken;

  console.log(verificationToken1);

  jwt.verify(req.token, process.env.JWT, async (err, payload) => {
    //console.log(payload);
    if (err === null) {
      req.verified = payload.token;
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

async function createUser(req, res) {
  const { firstName, lastName, email, password, number } = req.body;

  const hash = await bcrypt.hash(password, 11);

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
    res.status(400).json({ Message: error.message });
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
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ Message: error.message });
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
    return res.status(200).json({ token: token });
  } catch (err) {
    return res.status(500).json({ Message: err });
  }
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

    await transporter.sendMail(mailOptions);

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
  } catch (err) {
    return res.status(401).json({ Message: err });
  }
  return res.status(200).json({ Message: PASSWORD_RESET });
}

async function getAllUsers(req, res) {
  const users = await User.find().sort();

  if (req.user) {
    if (!users) return res.status(404).json({ Message: USERS_NOT_FOUND });
    return res.status(200).json(users);
  }

  return res.status(401).json({ Message: UNAUTHORIZED_REQUEST });
}

async function isUserValid(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ Message: USER_NOT_FOUND });
  }
}

async function getUser(req, res) {
  const id = req.params.id;

  isUserValid(id);

  const user = await User.findById(id);

  if (!user) return res.status(404).json({ Message: USER_NOT_FOUND });

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
  resetPasswordLink,
  resetPassword,
  verifyEmailLink,
  verifyEmail,
};
