const images = require("../app/controllers/images");
const express = require("express");
const router = express.Router();
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinaryConfig");
const multer = require("multer");
const fs = require("fs");

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: (req, file) => "clea-web-app",
//   },
// });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.array("images", 10), images.uploadImages);

router.get("/:idimage", (req, res) => {
  const imageName = `upload/${req.params.idimage}`;
  fs.readFile(imageName, (err, imageData) => {
    if (err) {
      res.json({
        status: 500,
        mesage: "Không đọc được ảnh",
      });
    } else {
      res.writeHead(200, {});
      res.end(imageData);
    }
  });
});

module.exports = router;
