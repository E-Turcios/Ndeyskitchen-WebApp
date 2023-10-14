const mongoose = require('mongoose');

async function openDBConnection() {
  mongoose
    .connect(process.env.TEST_URI)
    .then(() => {
      console.log('Database connection successfully opened');
    })
    .catch(err => console.log(err));
}

async function closeDBConnection() {
  mongoose.connection.close();
}

module.exports = { openDBConnection, closeDBConnection };
