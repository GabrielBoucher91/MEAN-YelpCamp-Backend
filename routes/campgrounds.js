const express = require("express");
const router = express.Router();

router.route("/").get();
router.route("/:id").get().put().delete();
router.route("/newCampground").post();

module.exports = router;
