const express = require("express");
const router = express.Router();
const campgrounds = require("../controllers/campgrounds");

router.route("/getcampgrounds").get(campgrounds.getCampgrounds);
router.route("/newcampground").post(campgrounds.addCampground);
router
  .route("/:id")
  .get(campgrounds.getCampground)
  .put(campgrounds.updateCampground)
  .delete();

module.exports = router;
