const express = require("express");
const router = express.Router();
const reviews = require("../controllers/reviews");

module.exports = router;

router.route("/newreview").post(reviews.newReview);

router.route("/:id").get(reviews.getReview).delete(reviews.deleteReview);
