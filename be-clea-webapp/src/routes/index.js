const userRouter = require("./users");
const blogRouter = require("./blogs");
const authRouter = require("./auths");
const courseRouter = require("./course");
const courseUserRouter = require("./courseuser");
const lessonRouter = require("./lessons");
const postRouter = require("./posts");
const postCourseRouter = require("./postcourses");
const commentsRouter = require("./comment");
const uploadRouter = require("./upload");
const utilsRouter = require("./utils");

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

  //Course user
  app.use("/course-user", courseUserRouter);

  //lesson
  app.use("/lesson", lessonRouter);

  //post
  app.use("/posts", postRouter);
  app.use("/postcourse", postCourseRouter);

  //comment
  app.use("/commentlesson", commentsRouter);

  //upload
  app.use("/upload", uploadRouter);

  //Utils
  app.use("/utils", utilsRouter);
}

module.exports = route;
