const userRouter = require("./users");
const blogRouter = require("./blogs");
const authRouter = require("./auths");
const courseRouter = require("./course");
const lessonRouter = require("./lessons");
const postRouter = require("./posts");

function route(app) {
  app.get("/", (req, res) => {
    res.send("Đã vào được đây");
  });

  //User
  app.use("/users", userRouter);

  // Auths
  app.use("/auths", authRouter);

  //Blogs
  app.use("/blogs", blogRouter);

  //Course
  app.use("/course", courseRouter);

  //lesson
  app.use("/lesson", lessonRouter);

  //post
  app.use("/posts", postRouter);
}

module.exports = route;
