const Course = require("../models/Course");

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
      } = req.body;
      Course.create({
        title: title,
        name: name,
        price: price,
        description: description,
        nbmembers: 0,
        teacherId: teacherId,
        category: category,
        createdAt: Date.now(),
        createdById: createdById,
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
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }

  // [PUT]/api/course/:idcourse
  async updateCourse(req, res, next) {
    try {
      const { title, name, price, description, category } = req.body;
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
