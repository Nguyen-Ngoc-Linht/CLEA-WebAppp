const express = require("express");
const router = express.Router();

const authsControllers = require("../app/controllers/AuthsControllers");

router.post("/signup", authsControllers.signup);

router.post("/login", authsControllers.login);

router.post("/logout", authsControllers.logout);

module.exports = router;
