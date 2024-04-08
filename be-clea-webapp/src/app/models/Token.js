const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Token = new Schema({
  token: {
    type: String,
  },
  createAt: {
    type: Date,
  },
  termAt: {
    type: Date,
  },
  userName: {
    type: String,
  },
  user_id: {
    type: String,
  },
  checkLogout: {
    type: Boolean,
  },
});

module.exports = mongoose.model("Token", Token);
