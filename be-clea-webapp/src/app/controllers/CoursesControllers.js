const Course = require("../models/Course");

class CoursesControllers {
  //[GET]/api/couser -- get all courses
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

  //[post]/api/couser -- tao course
  async creatCourse(req, res) {
    try {
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }
}

module.exports = new CoursesControllers();
