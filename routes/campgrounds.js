const express = require("express");
const router = express.Router();
const campgrounds = require("../controllers/campgrounds");
const { isLoggedIn, isCampAuthor } = require("../utils/middlewares");

router.route("/getcampgrounds").get(campgrounds.getCampgrounds);
router.route("/newcampground").post(campgrounds.addCampground);
router
  .route("/:id")
  .get(campgrounds.getCampground)
  .put(campgrounds.updateCampground)
  .delete(isLoggedIn, isCampAuthor, campgrounds.deleteCAmpground);

module.exports = router;
