const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Course = new Schema({
  title: {
    type: String,
  },
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
  nbmembers: {
    type: Number,
  },
  teacherId: {
    type: String,
  },
  likenb: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  category: {
    type: String,
  },
  createdById: {
    type: String,
  },
});

module.exports = mongoose.model("Course", Course);
