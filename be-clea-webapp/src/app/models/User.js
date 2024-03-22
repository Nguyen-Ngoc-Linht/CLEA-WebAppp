const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
  name: String,
  userName: String,
  password: String,
  email: String,
});

module.exports = mongoose.model("User", User);
