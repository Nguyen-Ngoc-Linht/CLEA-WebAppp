const express = require("express");
const router = express.Router();

const userControllers = require("../app/controllers/UsersControllers");
const authenication = require("../app/middlewares/authenication");

router.post(
  "/:id",
  authenication.authenticateUser,
  authenication.checkAdmin,
  userControllers.setrole
);

router.post(
  "/block/:id",
  authenication.authenticateUser,
  authenication.checkAdmin,
  userControllers.block
);

router.get("/", authenication.checkAdmin, userControllers.getlistUser);

module.exports = router;
