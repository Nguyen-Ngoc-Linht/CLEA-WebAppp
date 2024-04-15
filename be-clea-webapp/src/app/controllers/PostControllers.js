const Post = require("../models/Post");
const User = require("../models/User");

class PostControllers {
  //[get]/api/posts/:user_id?post_id=
  index(req, res) {}
  //[get]/api/posts/:user_id
  //[post]/api/posts
  async apicreatePost(req, res) {
    try {
      const { title, body, user_id, status } = req.body;
      const files = req.files;
      const uploadedImages = [];
      for (let image of files) {
        uploadedImages.push({
          nameimg: image.filename,
          path: `/${image.destination}${image.filename}`,
          size: image.size,
          type: image.mimetype,
        });
      }
      const user = await User.findOne({ _id: user_id });
      if (user) {
        Post.create({
          title: title,
          body: body,
          user_id: user_id,
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
            });
          })
          .catch((error) => {
            json.statua(500).json({
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
