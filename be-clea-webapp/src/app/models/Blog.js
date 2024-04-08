const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Blog = new Schema({
  title: {
    type: String,
  },
  header: {
    type: String,
  },
  content: {
    type: String,
  },
  type: {
    type: String,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model("Blog", Blog);
