const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Post = new Schema({
  title: {
    type: String,
  },
  body: {
    type: String,
  },
  user_id: {
    type: String,
  },
  username: {
    type: String,
  },
  status: {
    type: String,
  },
  created_at: {
    type: Date,
  },
  images: {
    type: Object,
  },
  number_like: {
    type: Number,
  },
});

module.exports = mongoose.model("Post", Post);
