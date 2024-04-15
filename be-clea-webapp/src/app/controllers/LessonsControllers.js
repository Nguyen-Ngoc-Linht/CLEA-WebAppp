const Lesson = require("../models/Lesson");
const Course = require("../models/Course");

class LessonControllers {
  //[get]/api/lesson/:course_id
  async getlistLesson(req, res) {
    try {
      const course_id = req.params.course_id;
      const course = Course.findOne({
        _id: course_id,
      });

      if (course) {
        Lesson.findOne({
          course_id: course_id,
        })
          .then((lessons) => {
            res.json({
              status: 200,
              message: "lấy danh sách khóa học thành công",
              data: lessons,
            });
          })
          .catch((err) => {
            res.status(500).json({
              status: 500,
              message: err.message,
            });
          });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  //[get]/api/lesson/:id
  //[post]/api/lesson/:course_id
  async createLesson(req, res) {
    try {
      const course_id = req.params.course_id;
      const { title, nameLesson, order, nameChaptter } = req.body;
      const course = Course.findOne({ _id: course_id });
      if (course) {
        Lesson.create({
          course_id: course_id,
          title: title,
          nameLesson: nameLesson,
          order: order,
          nameChaptter: nameChaptter,
          access_time: Date.now(),
        })
          .then((lesson) => {
            res.json({
              status: 200,
              message: "Tạo bài học thành công!",
              data: lesson,
            });
          })
          .catch((err) => {
            res.json({ err });
          });
      } else {
        res.status(404).json({
          status: 404,
          message: "Không có khóa học phù hợp",
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  }
  //[put]/api/lesson/:id
  //[delete]/api/lesson/:id
}

module.exports = new LessonControllers();
