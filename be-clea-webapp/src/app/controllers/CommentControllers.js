const Comment = require("../models/Comment");
const User = require("../models/User");

class CommentController {
  //[get]/api/commentslesson/:lesson_id
  async getcomment(req, res) {
    try {
      const lesson_id = req.params.lesson_id;

      console.log(lesson_id);
      const comments = await Comment.find({
        lesson_id: lesson_id,
      });

      if (comments.length > 0) {
        const result = [];
        for (let i = 0; i < comments.length; i++) {
          const user = await User.findOne({ _id: comments[i].user_id });

          const item = {
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
  //[post]/api/commentslesson/:lesson_id
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
  //[put]/api/commentslesson/:lesson_id
  //[delete]/api/commentslesson/:comment_id
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
