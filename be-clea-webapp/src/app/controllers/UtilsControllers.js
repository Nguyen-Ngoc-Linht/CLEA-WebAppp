const Lesson = require("../models/Lesson");
const Course = require("../models/Course");
const User = require("../models/User");

class UtilsControllers {
  //[get]/api/utils/updatenumber/:course_id
  async updatenumber(req, res) {
    try {
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  }

  //[post]/api/utils/useraccount
  async updateAvatar(req, res) {
    try {
      const { user_id } = req.body;
      const files = req.file;
      const uploadedImages = [];
      uploadedImages.push({
        nameimg: files.filename,
        path: `/${files.destination}${files.filename}`,
        size: files.size,
        type: files.mimetype,
      });

      const updateavatar = await User.findOneAndUpdate(
        { _id: user_id },
        {
          avatarUrl: uploadedImages[0].path,
        },
        { new: true }
      );

      if (updateavatar) {
        res.status(200).json({
          status: 200,
          message: "Bạn đã cập nhật avatar thành công",
          user: updateavatar,
        });
      }
    } catch (err) {}
  }
}

module.exports = new UtilsControllers();
