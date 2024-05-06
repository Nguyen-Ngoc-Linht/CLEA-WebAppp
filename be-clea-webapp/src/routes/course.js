const express = require("express");
const router = express.Router();

const coursesControllers = require("../app/controllers/CoursesControllers");
const authenication = require("../app/middlewares/authenication");

const cloudinary = require("../config/cloudinaryConfig");
const multer = require("multer");
const fs = require("fs");

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: (req, file) => "clea-web-app",
//   },
// });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/:course_id", coursesControllers.getCourse);

router.get("/category", coursesControllers.categoryCourse);

router.post(
  "/course-item/:course_id",
  authenication.checkAdmin,
  upload.single("images"),
  coursesControllers.updateCourse
);

router.post("/", authenication.checkAdmin, coursesControllers.creatCourse);

router.get("/", coursesControllers.index);

module.exports = router;
