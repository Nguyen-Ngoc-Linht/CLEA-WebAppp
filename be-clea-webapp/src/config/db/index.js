const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/clea-webapp-dev");
    console.log("Successfully connected");
  } catch (e) {
    console.log(e);
  }
}

module.exports = { connect };
