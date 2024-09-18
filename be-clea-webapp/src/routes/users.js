const express = require("express");
const router = express.Router();

const userControllers = require("../app/controllers/UsersControllers");
const authenication = require("../app/middlewares/authenication");

router.get("/getuser/:id", userControllers.getUser); // Lấy thông tin cá nhân 1 tài khoản

router.post(
  // Cập nhật quyền người dùng
  "/setrole/:user_id",
  authenication.authenticateUser,
  authenication.checkAdmin,
  userControllers.setrole
);

//Chặn tài khoản
router.post(
  "/block/:user_id",
  authenication.authenticateUser,
  authenication.checkAdmin,
  userControllers.block
);

router.post(
  "/update/:user_id",
  authenication.authenticateUser,
  userControllers.update
);

router.get("/get-teacher", userControllers.getteacher);

router.get("/", authenication.checkAdmin, userControllers.getlistUser);

module.exports = router;
