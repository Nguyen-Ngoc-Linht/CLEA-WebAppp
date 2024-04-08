const express = require("express");
const router = express.Router();

const lessonControllers = require("../app/controllers/LessonsControllers");
const authenication = require("../app/middlewares/authenication");

router.get("/", authenication.authenticateUser, lessonControllers.index);

module.exports = router;
