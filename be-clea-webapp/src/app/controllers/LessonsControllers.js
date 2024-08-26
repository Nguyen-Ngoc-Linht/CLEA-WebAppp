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
      const {
        title,
        content,
        nameLesson,
        order,
        nameChapter,
        linkVideo,
        image,
      } = req.body;
      const course = Course.findOne({ _id: course_id });
      if (course) {
        const detailsinfo = {
          linkVideo: linkVideo,
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
          image: image,
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
  async deleteLesson(req, res) {
    try {
      const lesson_id = req.params.lesson_id;
      const lesson = await Lesson.deleteOne({ _id: lesson_id });
      res.json({
        status: 200,
        message: "Xóa bài học thành công",
        data: lesson,
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: "Xóa bài học thất bại",
        error: err.message,
      });
    }
  }
}

module.exports = new LessonControllers();
