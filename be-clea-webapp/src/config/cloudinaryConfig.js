const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dtaisg4cr",
  api_key: "376216889513282",
  api_secret: "RGS6VyR9THrFYylRw_g3HDnAE1k",
});

module.exports = cloudinary;
