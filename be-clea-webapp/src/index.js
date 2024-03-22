const path = require("path");
const express = require("express");
const morgan = require("morgan");
const app = express();
const db = require("./config/db");

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

app.get("/", (req, res) => {
  res.send("Hello World oki!");
});

app.post("/home", (req, res) => {
  res.send({
    name: req.body.name,
    title: req.body.title,
  });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
