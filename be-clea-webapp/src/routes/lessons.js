const express = require("express");
const router = express.Router();

const lessonControllers = require("../app/controllers/LessonsControllers");
const authenication = require("../app/middlewares/authenication");

router.get("/course_id/:lesson_id", lessonControllers.getLesson);

//Chưa kiểm tra tài khoản có đăng ký hóa học hay không
router.get(
  "/:course_id",
  // authenication.authenticateUser,
  lessonControllers.getlistLesson
);

router.post(
  "/:course_id",
  authenication.checkTeacher,
  lessonControllers.createLesson
);

module.exports = router;
