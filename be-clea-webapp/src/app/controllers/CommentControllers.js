const Comment = require("../models/Comment");
const User = require("../models/User");

class CommentController {
  //[get]/api/commentslesson/:lesson_id - Lấy danh sách bình luận của một bài học
  async getcomment(req, res) {
    try {
      const lesson_id = req.params.lesson_id;
      const comments = await Comment.find({
        lesson_id: lesson_id,
      });

      if (comments.length > 0) {
        const result = [];
        for (let i = 0; i < comments.length; i++) {
          const user = await User.findOne({ _id: comments[i].user_id });

          const item = {
            id: comments[i]._id,
            content: comments[i].content,
            images: comments[i].images,
            lesson_id: comments[i].lesson_id,
            number_like: comments[i].number_like,
            created_at: comments[i].created_at,
            user: user,
          };

          result.push(item);
        }

        res.json({
          status: 200,
          message: "Lấy danh sách bình luận thành công",
          data: result,
        });
      } else {
        res.json({
          status: 404,
          message: "Không có bình luận nào được tìm thấy",
          data: [],
        });
      }
    } catch (e) {
      res.status(500).json({
        status: 500,
        message: e.message,
      });
    }
  }
  //[post]/api/commentslesson/:lesson_id - Bình luận 1 bài học
  async createComment(req, res) {
    try {
      const lesson_id = req.params.lesson_id;
      const { user_id, content } = req.body;
      //   const files = req.file;
      //   const uploadedImages = [];
      //   uploadedImages.push({
      //     nameimg: files.filename,
      //     path: `/${files.destination}${files.filename}`,
      //     size: files.size,
      //     type: files.mimetype,
      //   });

      const user = await User.findOne({ _id: user_id });
      if (user) {
        Comment.create({
          user_id: user_id,
          content: content,
          //   images: uploadedImages,
          lesson_id: lesson_id,
          number_like: 0,
          created_at: Date.now(),
        }).then((comment) => {
          res.json({
            status: 200,
            message: "Gửi comment thành công",
            data: comment,
            user: {
              avatarUrl: user.avatarUrl,
              email: user.email,
              name: user.name,
              userName: user.userName,
            },
          });
        });
      }
    } catch (e) {
      res.status(500).json({
        status: 500,
        message: e.message,
      });
    }
  }
  //[put]/api/commentslesson/:lesson_id - Sửa bình luận khỏi một bài học
  //[delete]/api/commentslesson/:comment_id - Xóa bình luận khỏi một bài học
  async deleteComment(req, res) {
    try {
      const comment_id = req.params.comment_id;
      Comment.deleteOne({
        comment_id: comment_id,
      });
    } catch (e) {
      res.status(500).json({
        status: 500,
        message: e.message,
      });
    }
  }
}

module.exports = new CommentController();
