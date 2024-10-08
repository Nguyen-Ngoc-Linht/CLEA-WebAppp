const express = require("express");
const router = express.Router();
const postControllers = require("../app/controllers/PostControllers");
const authenication = require("../app/middlewares/authenication");

const cloudinary = require("../config/cloudinaryConfig");
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/", postControllers.index);

router.post(
  "/",
  authenication.authenticateUser,
  upload.single("images"),
  postControllers.apicreatePost
);

module.exports = router;
