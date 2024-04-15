const express = require("express");
const router = express.Router();

const coursesControllers = require("../app/controllers/CoursesControllers");
const authenication = require("../app/middlewares/authenication");

router.get("/", coursesControllers.index);

router.get("/category", coursesControllers.categoryCourse);

router.post("/", authenication.checkAdmin, coursesControllers.creatCourse);

module.exports = router;
