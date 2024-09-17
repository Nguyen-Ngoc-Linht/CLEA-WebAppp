//const { User } = require("../models/User");
const User = require("../models/User");

class UsersControllers {
  //[GET]/api/users - Lấy danh sách người dùng trên hệ thống
  async getlistUser(req, res) {
    try {
      User.find({}).then((users) => {
        res.json({
          status: 200,
          messages: "Lấy danh sách tài khoản thành công",
          data: users,
        });
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  }

  //[get]/api/users/getteacher - Lấy danh sách giáo viên trên hệ thống
  async getteacher(req, res) {
    try {
      User.find({ role: "TEACHER" }).then((teacher) => {
        if (teacher || teacher.length > 0) {
          res.json({
            status: 200,
            messages: "Danh sách giáo viên",
            data: teacher,
          });
        }
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }

  //[GET]/api/users/getuser/:user_id - lấy chi tiết một tài khoản
  async getUser(req, res) {
    try {
      const idUser = req.params.id;
      User.findOne({ _id: idUser })
        .then((user) => {
          res.json({
            status: 200,
            message: "Lấy tài khoản thành công",
            data: user,
          });
        })
        .catch((err) => {});
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  }

  //[POST]/api/users/setrole/:user_id - Cập nhật quyền cho một tài khoản
  async setrole(req, res) {
    try {
      const idUser = req.params.user_id;
      const role = req.body.role;
      const updatedUser = await User.findOneAndUpdate(
        { _id: idUser },
        { role: role },
        { new: true }
      );
      if (updatedUser) {
        res.status(200).send({
          status: 200,
          message: "Vai trò của người dùng đã được cập nhật thành công",
          user: updatedUser,
        });
      } else {
        res.status(404).send({
          status: 404,
          message: "Người dùng không tồn tại",
        });
      }
    } catch (err) {
      res.status(err);
    }
  }

  //[POST]/api/users/update/:user_id - Cập nhật thông tin của tài khoản
  async update(req, res) {
    try {
      const idUser = req.params.user_id;
      const { name, email, introduce, address, phone, studyAt, age } = req.body;
      const updateUser = await User.findOneAndUpdate(
        { _id: idUser },
        {
          name: name,
          email: email,
          introduce: introduce,
          address: address,
          phone: phone,
          studyAt: studyAt,
          age: age,
        },
        { new: true }
      );

      if (updatedUser) {
        res.status(200).send({
          status: 200,
          message: "Cập nhật người dùng thành công",
          user: updatedUser,
        });
      } else {
        res.status(404).send({
          status: 404,
          message: "Người dùng không tồn tại",
        });
      }
    } catch (err) {
      res.status(err);
    }
  }

  //[POST]/api/users/block/:id - Chặn một tài khoản khỏi hệ thống
  async block(req, res) {
    try {
      const idUser = req.params.id;
    } catch {
      res.status(500).json({ e });
    }
  }
}

module.exports = new UsersControllers();
