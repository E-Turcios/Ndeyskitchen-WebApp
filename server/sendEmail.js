const nodemailer = require('nodemailer');

async function sendEmail(subject, message, receiver) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${process.env.EMAIL_ADDRESS}`,
      pass: `${process.env.EMAIL_PASSWORD}`,
    },
  });

  const mailOptions = {
    from: 'youremail@gmail.com',
    to: receiver,
    subject: subject,
    html: message,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { sendEmail };
