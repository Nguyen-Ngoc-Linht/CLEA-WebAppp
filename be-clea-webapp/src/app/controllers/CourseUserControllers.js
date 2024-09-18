const CourseUser = require("../models/CourseUser");
const User = require("../models/User");
const Course = require("../models/Course");
const RequestJoinCourse = require("../models/RequestJoinCourse");

class CourseUserController {
  // [Get]/api/course-user/list-course/:user_id - Lấy danh sách khóa học của người dùng
  async getlistCourseUser(req, res) {
    try {
      const userId = req.params.user_id;
      const coursesUser = await CourseUser.find({ user_id: userId });

      if (coursesUser.length === 0) {
        return res.json({
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

  //[get]/api/course-user/list-request-user/:course_id -- Lấy danh sách yêu cầu tham gia khóa học
  async getListRequestCourse(req, res) {
    try {
      const course_id = req.params.course_id;
      const course = await Course.findOne({ _id: course_id });
      if (course) {
        const listUser = await RequestJoinCourse.find({ course_id: course_id });

        const data = [];

        for (const item of listUser) {
          if (item.statusRequest === "PENDING") {
            const user = await User.findOne({ _id: item.user_id }); // Sử dụng await ở đây
            data.push({
              user: user,
              timeRequest: item.timeRequest,
              statusRequest: item.statusRequest,
            });
          }
        }

        res.status(200).json({
          status: 200,
          message: "Lấy danh sách yêu cầu thành công",
          data: data,
        });
      } else {
        res.status(404).json({
          status: 404,
          message: "Khóa học không tồn tại",
        });
      }
    } catch (err) {
      res.status(err);
    }
  }

  //[post]/api/course-user/reponse-request-user - thêm tài khoản vào 1 khóa học
  async addUserinCourse(req, res) {
    try {
      const { user_id, course_id, statusRequest, request_id } = req.body;
      const user = await User.findOne({ _id: user_id });
      const course = await Course.findOne({ _id: course_id });
      if (user.userName != null && course.name != null) {
        const usercourse = await CourseUser.findOne({
          user_id: user_id,
          course_id: course_id,
        });
        if (!usercourse) {
          if (statusRequest === "DONE") {
            await RequestJoinCourse.findByIdAndUpdate(
              { _id: request_id },
              { statusRequest: statusRequest },
              { new: true }
            );
            await Course.findOneAndUpdate(
              { _id: course_id },
              { nbmembers: course.nbmembers + 1 },
              { new: true }
            );
            CourseUser.create({
              user_id: user._id,
              course_id: course._id,
              time_in: Date.now(),
              userName: user.name,
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
            RequestJoinCourse.findOneAndUpdate(
              {
                _id: request_id,
              },
              {
                statusRequest: statusRequest,
              },
              { new: true }
            ).then((data) => {
              res.json({
                status: 200,
                message: "Hủy duyệt thành công",
                data: data,
              });
            });
          }
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

  //[post]/api/course-user/request-user - yêu cầu tham gia vào 1 khóa học.
  async requestJoinCourse(req, res) {
    try {
      const { user_id, course_id, statusRequest } = req.body;
      const user = await User.findOne({ _id: user_id });
      const course = await Course.findOne({ _id: course_id });

      if (user && course) {
        const request = await RequestJoinCourse.findOne({
          course_id: course_id,
          user_id: user_id,
        });
        if (request) {
          res.json({
            status: 401,
            message: "Bạn đã gửi yêu cầu rồi",
          });
        } else {
          RequestJoinCourse.create({
            user_id: user_id,
            course_id: course_id,
            statusRequest: statusRequest,
            timeRequest: Date.now(),
            timeApprove: null,
          })
            .then((response) => {
              res.status(200).json({
                status: 200,
                message: "Yêu cầu được gửi thành công",
                data: response,
              });
            })
            .catch((e) => {
              res.status(500).json({
                status: 500,
                message: "Gửi yêu cầu thất bại",
              });
            });
        }
      } else {
        res.status(404).json({
          status: 404,
          message: "Tài khoản hoặc khóa học không tồn tại!",
        });
      }
    } catch (err) {
      res.status(err);
    }
  }

  //[get]/api/course-user/list-user/:course_id - Lấy danh sách người dùng của 1 khóa học
  async getlistUserCourse(req, res) {
    try {
      const course_id = req.params.course_id;

      const course = await Course.findOne({ _id: course_id });

      if (!course) {
        return res.status(404).json({
          status: 404,
          message: "Khóa học không tồn tại",
        });
      }

      const userCourse = await CourseUser.find({ course_id: course_id });

      if (userCourse.length === 0) {
        return res.status(404).json({
          status: 404,
          message: "Khóa học không có thành viên nào",
        });
      }

      const data = [];

      for (const item of userCourse) {
        const user = await User.findOne({ _id: item.user_id });

        data.push({
          id: item._id,
          time_in: item.time_in,
          course_name: course.name, // Lấy tên khóa học từ biến course
          avatarUrl: user.avatarUrl,
          name: user.name,
          address: user.address,
          email: user.email,
          user_id: user._id,
          studyAt: user.studyAt,
          age: user.age,
          phone: user.phone,
        });
      }

      res.status(200).json({
        status: 200,
        message: "Lấy danh sách tài khoản thành công",
        data: data,
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: "Lấy khóa học thất bại!",
        error: err.message, // Thêm thông tin lỗi
      });
    }
  }

  //[get]//api/course-user/checkaccount - Kiểm tra tài khoản đã đăng ký khóa học hay chưa
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
