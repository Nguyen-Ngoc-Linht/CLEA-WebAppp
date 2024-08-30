const express = require("express");
const router = express.Router();

const courseUserControllers = require("../app/controllers/CourseUserControllers");
const authenication = require("../app/middlewares/authenication");

router.get(
  "/listcourse/:user_id",
  authenication.authenticateUser,
  courseUserControllers.getlistCourseUser
);

router.get("/list-user/:course_id", courseUserControllers.getlistUserCourse);

router.get(
  "/list-request-user/:course_id",
  courseUserControllers.getListRequestCourse
);

router.post("/request-user", courseUserControllers.requestJoinCourse);

router.post(
  "/reponse-request-user",
  // authenication.checkAdmin,
  courseUserControllers.addUserinCourse
);

module.exports = router;
