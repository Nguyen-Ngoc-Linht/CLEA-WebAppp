const utils = require("../app/controllers/UtilsControllers");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

// router.get("/", (req, res) => {
//   res.json({
//     status: 200,
//   });
// });

router.post("/useraccount", upload.single("images"), utils.updateAvatar);

module.exports = router;
