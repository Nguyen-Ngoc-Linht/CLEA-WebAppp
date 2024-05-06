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
        Lesson.find({
          course_id: course_id,
        })
          .then((lessons) => {
            res.json({
              status: 200,
              message: "lấy danh sách bài học thành công",
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
  //[get]/api/lesson/course_id/:lesson_id
  async getLesson(req, res) {
    try {
      const lesson_id = req.params.lesson_id;
      await Lesson.findOne({
        _id: lesson_id,
      })
        .then((lesson) => {
          res.json({
            status: 200,
            message: "Lấy chi tiết khóa học thành công",
            data: lesson,
          });
        })
        .catch((err) => {
          res.json({
            status: 500,
            message: err,
          });
        });
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  }
  //[post]/api/lesson/:course_id
  async createLesson(req, res) {
    try {
      const course_id = req.params.course_id;
      const { title, content, nameLesson, order, nameChapter } = req.body;
      const course = Course.findOne({ _id: course_id });
      if (course) {
        const detailsinfo = {
          linkVideo:
            "https://www.youtube.com/embed/CyZ_O7v62h4?autoplay=1&mute=0&controls=1&origin=https%3A%2F%2Ffullstack.edu.vn&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=1",
          fileUrl: "HHHH",
        };
        Lesson.create({
          course_id: course_id,
          title: title,
          content: content,
          nameLesson: nameLesson,
          order: order,
          nameChapter: nameChapter,
          access_time: Date.now(),
          details: detailsinfo,
          //imagesLesson: imagesLesson,
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
