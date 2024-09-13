const path = require("path");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const app = express();
const db = require("./config/db");

const http = require("http");
const socketIo = require("socket.io");

const route = require("./routes");

// Socket
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // Cho phép tất cả các nguồn truy cập, nếu cần có thể cấu hình lại
    methods: ["GET", "POST"],
  },
});

// Xử lý sự kiện kết nối socket
io.on("connection", (socket) => {
  console.log("User connected");

  // Lắng nghe và phát dữ liệu từ client
  socket.on("new message", (data) => {
    console.log("Received message: ", data);
    io.emit("message", data); // Phát lại tin nhắn tới tất cả các client
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Cookie
app.use(cookieParser());

//CORS
app.use(cors({ origin: true, credentials: true }));

// Kết nối với database
db.connect();

//Lấy biến cấu hình trong env
require("dotenv").config();
const { PORT } = process.env;

app.use(express.static(path.join(__dirname, "public")));

//Log lỗi
app.use(morgan("combined"));

//Sử dụng middleware sử lý form
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

//Router init
route(app);

// app.listen(PORT, () => {
//   console.log(`Example app listening on port ${PORT}`);
// });

server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
