const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const videoUploadPath = "videos/";
if (!fs.existsSync(videoUploadPath)) {
  fs.mkdirSync(videoUploadPath, { recursive: true });
}

// Cấu hình multer để lưu file video vào server
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, videoUploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Chỉ cho phép upload các định dạng video phổ biến
    const filetypes = /mp4|mkv|avi|mov/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(
        new Error(
          "Chỉ cho phép upload file video với định dạng mp4, mkv, avi, mov"
        )
      );
    }
  },
  limits: { fileSize: 100 * 1024 * 1024 }, // Giới hạn kích thước file video (ở đây là 100MB)
});

// POST route để upload video
router.post("/upload-video", upload.single("video"), (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ message: "Không có file video nào được tải lên." });
  }

  res.status(200).json({
    message: "Upload video thành công!",
    file: req.file,
  });
});

// Route GET để phát video từ server
router.get("/videos/:filename", (req, res) => {
  const videoPath = path.join(videoUploadPath, req.params.filename);

  // Kiểm tra xem video có tồn tại không
  fs.access(videoPath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ message: "Không tìm thấy video." });
    }

    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      if (start >= fileSize) {
        res
          .status(416)
          .send(
            "Requested range not satisfiable\n" + start + " >= " + fileSize
          );
        return;
      }

      const chunkSize = end - start + 1;
      const file = fs.createReadStream(videoPath, { start, end });
      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunkSize,
        "Content-Type": "video/mp4",
      };

      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        "Content-Length": fileSize,
        "Content-Type": "video/mp4",
      };
      res.writeHead(200, head);
      fs.createReadStream(videoPath).pipe(res);
    }
  });
});

module.exports = router;
