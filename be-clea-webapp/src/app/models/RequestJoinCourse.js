const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestCourse = new Schema({
  user_id: {
    type: String,
  },
  course_id: {
    type: String,
  },
  timeRequest: {
    type: Date,
  },
  statusRequest: {
    type: String,
  },
  timeApprove: {
    type: String,
  },
});

module.exports = mongoose.model("RequestCourse", RequestCourse);
