//const { User } = require("../models/User");
const { response } = require("express");
const { compareSync } = require("bcryptjs");
const { JWT_SECRET_KEY } = require("../../config/config.js");
var jwt = require("jsonwebtoken");
const User = require("../models/User");
const Token = require("../models/Token");

class AuthsControllers {
  //[GET]/auths/signup
  async signup(req, res) {
    try {
      const { name, userName, password, email } = req.body;
      User.findOne({
        userName: userName,
      })
        .then((data) => {
          if (data) {
            res.json({
              status: 300,
              message: "Tài khoản đã tồn tại",
            });
          } else {
            return User.create({
              name: name,
              userName: userName,
              password: password,
              email: req.body.email || "",
              avatarUrl: "",
              role: "USER",
            });
          }
        })
        .then((data) => {
          res.json({
            status: 200,
            message: "Tạo tài khoản thành công",
            data: data,
          });
        })
        .catch((err) => {
          res.status(err.status);
        });
    } catch (e) {
      console.error("Error signing up", e);
      res.status(400).json({ error: "Failed to sign up" });
    }
  }

  //[POST]/auths/login
  async login(req, res) {
    try {
      const { userName, password } = req.body;
      const user = await User.findOne({ userName: userName });
      if (user) {
        if (password != user.password) {
          res.json({
            status: 500,
            message: "Mật khẩu không chính xác!!",
          });
        } else {
          var token = jwt.sign(
            { id: user.id, userName: user.userName },
            JWT_SECRET_KEY,
            { expiresIn: 60 * 60 }
          );
          Token.create({
            token: token,
            createAt: Date.now(),
            termAt: Date.now() + 60 * 60,
            userName: user.userName,
            user_id: user._id,
            checkLogout: false,
          });
          res.json({
            status: 200,
            message: "Đăng nhâp thành công",
            data: { user, token: token },
          });
        }
      } else {
        res.json({
          status: 404,
          message: "Tài khoản không tồn tại",
        });
      }
    } catch (e) {
      console.error("Error Login up", e);
      res.status(400).json({ error: "Failed to Login" });
    }
  }

  async logout(req, res) {}
}

module.exports = new AuthsControllers();
