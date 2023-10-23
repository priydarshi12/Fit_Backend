const mongoose = require("mongoose");

//model

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  height: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },

  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  verifytoken: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
