const express = require("express");
const router = express.Router();
const commentController = require("../app/controllers/CommentControllers");
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

router.get("/:lesson_id", commentController.getcomment);

router.post(
  "/:lesson_id",
  authenication.authenticateUser,
  // upload.single("images"),
  commentController.createComment
);

module.exports = router;
