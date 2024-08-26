const cloudinary = require("../../config/cloudinaryConfig");
const Image = require("../models/Image");

class Images {
  async uploadImages(req, res, next) {
    try {
      // const images = req.files.map((file) => file.path);
      const image = req.file;
      const uploadImages = [];

      Image.create({
        idImage: image.filename,
        path: `http://localhost:3030/${image.destination}${image.filename}`,
        typeImage: image.mimetype,
      });
      uploadImages.push({
        name: image.filename,
        path: `http://localhost:3030/${image.destination}${image.filename}`,
      });

      return res.status(200).json({
        status: 200,
        message: "Uploaded images successfully",
        data: uploadImages,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = new Images();
