const express = require("express");
const userController = require("../repositories/repository.user");
const router = express.Router();

//STARTS WITH /user

//signup
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/request", userController.request);

module.exports = router;
