const Post = require("../models/Post");
const PostCourse = require("../models/PostCourse");
const User = require("../models/User");

class PostControllers {
  //[get]/api/posts/
  async index(req, res) {
    try {
      const posts = await Post.find({});

      if (posts.length > 0) {
        const result = [];
        for (let i = 0; i < posts.length; i++) {
          const user = await User.findOne({ _id: posts[i].user_id });
          const item = {
            id: posts[i]._id,
            body: posts[i].body,
            created_at: posts[i].created_at,
            images: posts[i].images,
            number_like: posts[i].number_like,
            status: posts[i].status,
            title: posts[i].title,
            user: user,
          };
          result.push(item);
        }

        res.json({
          status: 200,
          message: "Lấy danh sách bài viết thành công",
          data: result,
        });
      }
    } catch (e) {
      res.status(404).json({
        status: 404,
        message: e.message,
      });
    }
  }
  //[get]/api/posts/:user_id
  async getpostscourse(req, res) {
    try {
      const course_id = req.params.course_id;
      console.log(course_id);
      const posts = await PostCourse.find({
        course_id: course_id,
      });

      if (posts.length > 0) {
        const result = [];
        for (let i = 0; i < posts.length; i++) {
          const user = await User.findOne({ _id: posts[i].user_id });
          const item = {
            body: posts[i].body,
            created_at: posts[i].created_at,
            images: posts[i].images,
            number_like: posts[i].number_like,
            status: posts[i].status,
            title: posts[i].title,
            user: user,
          };
          result.push(item);
        }

        res.json({
          status: 200,
          message: "Lấy danh sách bài viết thành công",
          data: result,
        });
      }
    } catch (e) {
      res.status(500).json({
        status: 500,
        message: e.message,
      });
    }
  }
  //[post]/api/posts
  async apicreatePost(req, res) {
    try {
      const { title, body, user_id, course_id, status } = req.body;
      const files = req.file;
      const uploadedImages = [];
      uploadedImages.push({
        nameimg: files.filename,
        path: `/${files.destination}${files.filename}`,
        size: files.size,
        type: files.mimetype,
      });

      const user = await User.findOne({ _id: user_id });
      if (user) {
        Post.create({
          title: title,
          body: body,
          user_id: user_id,
          username: user.name,
          course_id: course_id,
          status: status,
          created_at: Date.now(),
          images: uploadedImages,
          number_like: 0,
        })
          .then((post) => {
            res.json({
              status: 200,
              message: "Tạo bài viết thành công",
              data: post,
              user: {
                avatarUrl: user.avatarUrl,
                email: user.email,
                name: user.name,
                role: user.role,
                userName: user.userName,
              },
            });
          })
          .catch((error) => {
            console.log(error);
            json.status(500).json({
              status: 500,
              message: "Tạo bài viết thất bại",
            });
          });
      } else {
        res.status(404).json({
          status: 404,
          message: "Tài khoản không tồn tại",
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  }

  //[post]/api/postcourse/:course_id
  async apicreatePostCourse(req, res) {
    try {
      const { title, body, user_id, course_id, status } = req.body;
      const files = req.file;
      const uploadedImages = [];
      uploadedImages.push({
        nameimg: files.filename,
        path: `/${files.destination}${files.filename}`,
        size: files.size,
        type: files.mimetype,
      });

      const user = await User.findOne({ _id: user_id });
      if (user) {
        PostCourse.create({
          title: title,
          body: body,
          user_id: user_id,
          username: user.name,
          course_id: course_id,
          status: status,
          created_at: Date.now(),
          images: uploadedImages,
          number_like: 0,
        })
          .then((post) => {
            res.json({
              status: 200,
              message: "Tạo bài viết thành công",
              data: post,
              user: {
                avatarUrl: user.avatarUrl,
                email: user.email,
                name: user.name,
                role: user.role,
                userName: user.userName,
              },
            });
          })
          .catch((error) => {
            console.log(error);
            json.status(500).json({
              status: 500,
              message: "Tạo bài viết thất bại",
            });
          });
      } else {
        res.status(404).json({
          status: 404,
          message: "Tài khoản không tồn tại",
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: 500,
        message: err.message,
      });
    }
  }
  //[put]/api/posts/:id
  //[delete]/api/posts/:id
}

module.exports = new PostControllers();
