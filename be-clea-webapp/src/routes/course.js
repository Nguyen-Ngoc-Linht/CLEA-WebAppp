const express = require("express");
const router = express.Router();

const coursesControllers = require("../app/controllers/CoursesControllers");
const authenication = require("../app/middlewares/authenication");

router.get("/", coursesControllers.creatCourse);

router.get("/", authenication.checkAdmin, coursesControllers.index);

module.exports = router;
