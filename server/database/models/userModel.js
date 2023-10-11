const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true, minlength: 2, maxlength: 50 },
    lastName: { type: String, required: true, minlength: 2, maxlength: 50 },
    email: { type: String, required: true, unique: true, maxlength: 100 },
    password: { type: String, required: false, maxlength: 100 },
    number: { type: Number, required: false, unique: true, maxlength: 10 },
    token: { type: String, required: false, maxlength: 100 },
    order: [],
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
