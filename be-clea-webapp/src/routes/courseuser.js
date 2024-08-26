const express = require("express");
const router = express.Router();

const courseUserControllers = require("../app/controllers/CourseUserControllers");
const authenication = require("../app/middlewares/authenication");

router.get(
  "/listcourse/:user_id",
  authenication.authenticateUser,
  courseUserControllers.getlistCourseUser
);

router.post(
  "/",
  authenication.checkAdmin,
  courseUserControllers.addUserinCourse
);

module.exports = router;
