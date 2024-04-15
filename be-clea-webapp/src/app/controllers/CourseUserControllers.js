const CourseUser = require("../models/CourseUser");
const User = require("../models/User");
const Course = require("../models/Course");

class CourseUserController {
  // [Get]/api/course-user/:user_id
  async getlistCourseUser(req, res) {
    try {
      const userId = req.params.user_id;
      CourseUser.find({ user_id: userId })
        .then((coursesUser) => {
          if (coursesUser.length > 0) {
            res.json({
              status: 200,
              message: "Lấy khóa học thành công!",
              data: coursesUser,
            });
          } else {
            res.status(404).json({
              status: 404,
              message: "Bạn chưa có khóa học nào",
            });
          }
        })
        .catch((error) => {
          res.status(500).json({
            status: 500,
            message: "Lấy khóa học thất bại!",
          });
        });
    } catch (err) {
      console.error(err);
    }
  }

  //[post]/api/course-user - thêm tài khoản vào 1 khóa học
  async addUserinCourse(req, res) {
    try {
      const { user_id, course_id } = req.body;
      const user = await User.findOne({ _id: user_id });
      const course = await Course.findOne({ _id: course_id });
      if (user.userName != null && course.name != null) {
        CourseUser.create({
          user_id: user._id,
          course_id: course._id,
          time_in: Date.now(),
          userName: user.userName,
          course_name: course.name,
        })
          .then((courseUser) => {
            res.json({
              status: 200,
              message: "Thêm khóa học cho tài khoản thành công",
              data: courseUser,
            });
          })
          .catch((error) => {
            res.status(500).json({
              status: 500,
              message: "Thêm khóa học cho tài khoản thất bại",
            });
          });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: "Error",
      });
    }
  }
}

module.exports = new CourseUserController();
