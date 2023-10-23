const mongoose = require('mongoose');
require('dotenv').config();
const chalk = require('chalk');

async function DBConnection() {
  mongoose
    .connect(process.env.URI)
    .then(() => {
      console.log(chalk.cyan('Database Connection Established'));
    })
    .catch(err => console.log(err));
}

module.exports = DBConnection();
