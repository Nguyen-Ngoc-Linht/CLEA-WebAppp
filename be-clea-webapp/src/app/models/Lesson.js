const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Lesson = new Schema({
  course_id: {
    type: String,
  },
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  nameLesson: {
    type: String,
  },
  order: {
    type: Number,
  },
  nameChapter: {
    type: String,
  },
  details: {
    type: Object,
  },
  access_time: {
    type: Date,
  },
  imagesLesson: {
    type: String,
  },
});

module.exports = mongoose.model("Lesson", Lesson);
