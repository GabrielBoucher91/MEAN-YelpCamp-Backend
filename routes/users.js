const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");
const passport = require("passport");

router.route("/username").get(userController.getUser);

router.route("/register").post(userController.registerUser);

router
  .route("/login")
  .post(userController.authenticateLocal, userController.login);

router.route("/signedin").get(userController.checkAuth);

router.route("/logout").get(userController.logout);

module.exports = router;
