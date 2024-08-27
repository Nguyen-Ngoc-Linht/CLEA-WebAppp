const Course = require("../models/Course");
const User = require("../models/User");

class CoursesControllers {
  //[GET]/api/course -- get all courses
  async index(req, res) {
    try {
      Course.find({}).then((courses) => {
        if (courses.length > 0) {
          res.json({
            status: 200,
            message: "Danh sách khóa học",
            data: courses,
          });
        } else {
          res.status(401).json({
            status: 401,
            message: "Không có khóa học nào!",
          });
        }
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  //[GET]/api/course/:course_id -- get course by course
  async getCourse(req, res) {
    try {
      const course_id = req.params.course_id;
      Course.findOne({
        _id: course_id,
      })
        .then((course) => {
          if (course) {
            res.json({
              status: 200,
              message: "Lấy khóa học thành công",
              data: course,
            });
          } else {
            res.status(401).json({
              status: 401,
              message: "Không có khóa học",
            });
          }
        })
        .catch((err) => {
          res.status(500).json({ message: err.message });
        });
    } catch (err) {
      res.json({ status: 500, message: err });
    }
  }

  //[GET]/api/course/category?category= -- get all courses with category
  async categoryCourse(req, res) {
    try {
      const category = req.query.category;
      Course.find({ category: category })
        .then((courses) => {
          if (courses.length > 0) {
            res.json({
              status: 200,
              message: "Danh sách khóa học theo loại",
              data: courses,
            });
          } else {
            res.json({
              status: 404,
              message: "Không có khóa học nào!!",
            });
          }
        })
        .catch((err) => {
          res.status(404).json({
            status: 404,
            message: "Không thấy khóa học yêu cầu",
          });
        });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  //[post]/api/course -- tao course
  async creatCourse(req, res) {
    try {
      const {
        title,
        name,
        price,
        description,
        teacherId,
        category,
        createdById,
        urlImage,
      } = req.body;
      const usercreate = User.findOne({
        _id: createdById,
      });
      const teacher = User.findOne({
        _id: teacherId,
      });
      if (usercreate && teacher && teacher.role === "TEACHER") {
        Course.create({
          title: title,
          name: name,
          price: price,
          description: description,
          nbmembers: 0,
          teacherId: teacherId,
          teacherName: teacher.name,
          category: category,
          createdAt: Date.now(),
          createdById: createdById,
          createdBy: usercreate.name,
          urlImage: urlImage,
        })
          .then((course) => {
            res.json({
              status: 200,
              message: "Bạn đã tạo khóa học thành công!!",
              data: course,
            });
          })
          .catch((err) => {
            res.status(500).json({
              status: 500,
              message: "Tạo khóa học thất bại",
              data: err,
            });
          });
      }
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }

  // [PUT]/api/course/:idcourse
  async updateCourse(req, res) {
    try {
      const course_id = req.params.course_id;
      const {
        title,
        name,
        price,
        description,
        teacherId,
        teacherName,
        category,
        urlImage,
      } = req.body;

      const teacher = await User.findOne({
        _id: teacherId,
      });

      console.log(req.body);

      if (teacher && teacher.role === "TEACHER") {
        const updateCourse = await Course.findOneAndUpdate(
          { _id: course_id },
          {
            title: title,
            name: name,
            price: price,
            description: description,
            teacherId: teacherId,
            teacherName: teacherName,
            category: category,
            urlImage: urlImage,
          },
          { new: true }
        );

        if (updateCourse) {
          res.json({
            status: 200,
            message: "Cập nhật thành công",
            data: updateCourse,
          });
        } else {
          res.status(404).send({
            status: 404,
            message: "Khóa học không tồn tại",
          });
        }
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: "Lỗi hệ thống",
      });
    }
  }

  //[DELETE]/api/course/:idcourse
  async deleteCourse(req, res) {
    try {
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: "Lỗi hệ thống",
      });
    }
  }
}

module.exports = new CoursesControllers();
