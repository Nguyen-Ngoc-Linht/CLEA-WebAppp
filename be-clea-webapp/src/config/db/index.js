const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/clea-webapp-dev");
    // await mongoose.connect(
    //   "mongodb+srv://ngoclinhtp2002:TWxJnE3oLjMMwJdr@mymongodb.ls6urvz.mongodb.net/"
    // );
    console.log("Successfully connected");
  } catch (e) {
    console.log(e);
  }
}

module.exports = { connect };
