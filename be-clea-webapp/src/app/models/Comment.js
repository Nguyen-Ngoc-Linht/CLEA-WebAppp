const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Comment = new Schema({
  user_id: {
    type: String,
  },
  content: {
    type: String,
  },
  image: {
    type: String,
  },
  lesson_id: {
    type: String,
  },
  number_like: {
    type: String,
  },
  created_at: {
    type: Date,
  },
});

module.exports = mongoose.model("Comment", Comment);
