const express = require("express");
const router = express.Router();

const blogControllers = require("../app/controllers/BlogsController");
const authenication = require("../app/middlewares/authenication");

router.get("/:id", authenication.authenticateUser, blogControllers.getBlog);

router.post("/", authenication.authenticateUser, blogControllers.createBlog);

router.delete(
  "/:id",
  authenication.authenticateUser,
  blogControllers.deleteBlog
);

router.get("/", authenication.authenticateUser, blogControllers.getBlog);

module.exports = router;
