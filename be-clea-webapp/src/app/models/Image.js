const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Image = new Schema({
  idImage: {
    type: String,
  },
  path: {
    type: String,
  },
  typeImage: {
    type: String,
  },
});

module.exports = mongoose.model("Image", Image);
