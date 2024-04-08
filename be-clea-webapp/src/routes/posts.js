const express = require("express");
const router = express.Router();

const postControllers = require("../app/controllers/PostControllers");
const authenication = require("../app/middlewares/authenication");

router.get("/", authenication.authenticateUser, postControllers.index);

module.exports = router;
