const path = require("path");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const app = express();
const db = require("./config/db");

const route = require("./routes");

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

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
