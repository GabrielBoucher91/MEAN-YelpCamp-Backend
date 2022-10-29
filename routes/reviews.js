const express = require("express");
const router = express.Router();

module.exports = router;

router.route("/newReview").post();

router.route("/:id").get().delete();
