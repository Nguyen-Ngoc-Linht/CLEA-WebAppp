const CourseUser = require("../models/CourseUser");
const User = require("../models/User");
const Course = require("../models/Course");

class CourseUserController {
  // [Get]/api/course-user/listcourse/:user_id
  async getlistCourseUser(req, res) {
    try {
      const userId = req.params.user_id;
      const coursesUser = await CourseUser.find({ user_id: userId });

      if (coursesUser.length === 0) {
        return res.status(404).json({
          status: 404,
          message: "Bạn chưa có khóa học nào",
        });
      }

      const courses = [];
      for (const course of coursesUser) {
        const courseItem = await Course.findOne({ _id: course.course_id });
        if (courseItem) {
          courses.push({
            course,
            details_course: courseItem,
            // Các thông tin khác của courseUser nếu cần
          });
        }
      }

      res.json({
        status: 200,
        message: "",
        data: courses,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 500,
        message: "Lấy khóa học thất bại!",
      });
    }
  }

  //[post]/api/course-user - thêm tài khoản vào 1 khóa học
  async addUserinCourse(req, res) {
    try {
      const { user_id, course_id } = req.body;
      const user = await User.findOne({ _id: user_id });
      const course = await Course.findOne({ _id: course_id });
      if (user.userName != null && course.name != null) {
        const usercourse = await CourseUser.findOne({
          user_id: user_id,
          course_id: course_id,
        });
        console.log(usercourse);
        if (!usercourse) {
          await Course.findOneAndUpdate(
            { _id: course_id },
            { nbmembers: course.nbmembers + 1 },
            { new: true }
          );
          CourseUser.create({
            user_id: user._id,
            course_id: course._id,
            time_in: Date.now(),
            userName: user.userName,
            course_name: course.name,
            //details_course: course,
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
        } else {
          res.json({
            status: 302,
            message: "Tài khoản đã có trong khóa học",
          });
        }
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: "Error",
      });
    }
  }

  //[get]/api/course-user/listuser/:course_id
  async getlistUserCourse(req, res) {
    try {
      const course_id = req.params.course_id;

      const course = await Course.findOne({ _id: course_id });

      if (course) {
        const userCourse = await CourseUser.find({ course_id: course_id });

        if (userCourse.length === 0) {
          return res.status(404).json({
            status: 404,
            message: "Khóa học không có thành viên nào",
          });
        }
      }
    } catch (err) {
      console.error(error);
      res.status(500).json({
        status: 500,
        message: "Lấy khóa học thất bại!",
      });
    }
  }

  //[get]//api/course-user/checkaccount
  async checkAccount(req, res) {
    try {
      const { user_id, course_id } = req.body;
      const course_user = await CourseUser.findOne({
        user_id: user_id,
        course_id: course_id,
      });
      if (course_user && course_user != null) {
        res.json({
          status: 200,
          message: "Tài khoản có đăng ký khóa học",
          data: course_user,
        });
      }
    } catch (err) {
      res.json({
        status: 500,
        message: err,
      });
    }
  }
}

module.exports = new CourseUserController();
