const express = require("express");
const router = express.Router();

router.route("/username").get((req, res, next) => {
  res.send("BWAH");
});

router.route("/register").post();

router.route("/login").post();

router.route("/signedin").get();

router.route("/logout").get();

module.exports = router;
