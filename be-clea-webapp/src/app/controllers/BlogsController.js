const Blog = require("../models/Blog");

class BlogsController {
  //[GET]/blog/:id
  async getBlog(req, res, next) {
    try {
      const idblog = req.params.id;
      Blog.findOne({ _id: idblog })
        .then((blog) => {
          if (blog) {
            res.json({
              status: 200,
              mesage: "Lấy bài viết thành công",
              data: blog,
            });
          } else {
            res.status(401).json({
              status: 401,
              mesage: "Bài viết không tồn tại",
            });
          }
        })
        .catch((error) => res.status(error.status));
    } catch (err) {
      res.status(500);
    }
  }
  //[GET]/blog/
  async getBlog(req, res, next) {
    try {
      Blog.find({})
        .then((blogs) => {
          if (blogs.length > 0) {
            res.json({
              status: 200,
              mesage: "Lấy bài viết thành công",
              data: blogs,
            });
          }
        })
        .catch((err) => res.status(err.status));
    } catch (err) {
      res.status(500).json(err);
    }
  }

  //[POST]/blog
  async createBlog(req, res, next) {
    try {
      const { title, header, content, type, image, description } = req.body;
      Blog.create({
        title: title,
        header: header,
        content: content,
        type: type,
        image: image,
        description: description,
      })
        .then((blog) => {
          res.status(200).json({
            status: 200,
            mesage: "Thêm bài viết thành công",
            data: blog,
          });
        })
        .catch((error) => res.status(error.status));
    } catch (error) {
      console.error(error.message);
      res.status(500).json({
        status: 500,
        mesage: "Lỗi thêm bài viết",
      });
    }
  }
  //[PUT]/blog
  //[DELETE]/blog/:id
  async deleteBlog(req, res) {
    try {
      const idBlog = req.params.id;
      Blog.findOneAndDelete({ _id: idBlog })
        .then((blog) => {
          if (blog) {
            res.status(200).json({
              status: 200,
              mesage: "Xóa bài viết thành công",
            });
          } else {
            res.status(401).json({
              status: 401,
              mesage: "Bài viết không tồn tại",
            });
          }
        })
        .catch((e) => {
          res.status(401).json({
            status: 401,
            mesage: "Không tìm thấy bài viết",
          });
        });
    } catch (error) {
      res.status(500);
    }
  }
}

module.exports = new BlogsController();
