const express = require("express");
const router = express.Router();
const campgrounds = require("../controllers/campgrounds");

router.route("/getcampgrounds").get(campgrounds.getCampgrounds);
router.route("/:id").get().put().delete();
router.route("/newcampground").post(campgrounds.addCampground);

module.exports = router;
