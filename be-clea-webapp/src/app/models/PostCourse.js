const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostCourse = new Schema({
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
  course_id: {
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

module.exports = mongoose.model("PostCourse", PostCourse);
