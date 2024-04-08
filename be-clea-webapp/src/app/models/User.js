const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  name: {
    type: String,
  },
  userName: {
    type: String,
  },
  password: {
    type: String,
  },
  avatarUrl: {
    type: String,
  },
  email: {
    type: String,
  },
  role: {
    type: String,
  },
  createdAt: {
    type: String,
  },
  introduce: {
    type: String,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  studyAt: {
    type: String,
  },
  age: {
    type: Number,
  },
});

module.exports = mongoose.model("User", User);
