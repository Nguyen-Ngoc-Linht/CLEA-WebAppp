const { verify } = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../../config/config.js");
const User = require("../models/User.js");

class Authenication {
  // Check login
  async authenticateUser(req, res, next) {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = verify(token, JWT_SECRET_KEY);
        next();
      } else {
        res.status(401).json({
          status: 401,
          message: "Bạn chưa đăng nhập",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  }

  //Phân quyền tài khoản
  async checkAdmin(req, res, next) {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = verify(token, JWT_SECRET_KEY);
        User.findOne({ _id: decoded.id }).then((user) => {
          if (user) {
            if (user.role === "ADMIN") {
              next();
            } else {
              res.status(401).json({
                status: 401,
                message: "Bạn không có quyền truy cập",
              });
            }
          } else {
            res.status(404).json({
              status: 404,
              message: "Tài khoản không tồn tại",
            });
          }
        });
      } else {
        res.status(401).json({
          status: 401,
          message: "Bạn chưa đăng nhập",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  }

  //Kiểm tra tài khoản có là tài khoản giáo viên hay không
  async checkTeacher(req, res, next) {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = verify(token, JWT_SECRET_KEY);
        User.findOne({ _id: decoded.id }).then((user) => {
          if (user) {
            if (user.role === "TEACHER") {
              next();
            } else {
              res.status(401).json({
                status: 401,
                message: "Bạn không có quyền truy cập",
              });
            }
          } else {
            res.status(404).json({
              status: 404,
              message: "Tài khoản không tồn tại",
            });
          }
        });
      } else {
        res.status(401).json({
          status: 401,
          message: "Bạn chưa đăng nhập",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  }
}

module.exports = new Authenication();
