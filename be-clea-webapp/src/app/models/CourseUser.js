const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseUser = new Schema({
  user_id: {
    type: String,
  },
  course_id: {
    type: String,
  },
  time_in: {
    type: Date,
  },
  userName: {
    type: String,
  },
  course_name: {
    type: String,
  },
});

module.exports = mongoose.model("CourseUser", CourseUser);
