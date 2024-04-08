//const { User } = require("../models/User");
const User = require("../models/User");

class UsersControllers {
  //[POST]/api/users/:id
  async setrole(req, res) {
    try {
      const idUser = req.params.id;
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

  //[POST]/api/users/block/:id
  async block(req, res) {
    try {
      const idUser = req.params.id;
    } catch {
      res.status(500).json({ e });
    }
  }
}

module.exports = new UsersControllers();
