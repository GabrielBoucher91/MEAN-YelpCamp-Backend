const Campground = require("../models/campgrounds");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.send({ isLoggedIn: false });
  }
  next();
};

module.exports.isCampAuthor = async (req, res, next) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if (!campground) {
    return res
      .status(404)
      .send({ success: false, message: "This campground does not exist" });
  }
  if (!campground.author.equals(req.user._id)) {
    return res.send({ isAuthor: false });
  }
  next();
};
