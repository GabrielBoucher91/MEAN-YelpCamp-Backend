const Review = require("../models/reviews");
const Campground = require("../models/campgrounds");
const User = require("../models/users");

module.exports.newReview = async (req, res) => {
  const { author, body, campground, rating } = req.body;
  const newReview = new Review({
    author,
    body,
    campground,
    rating,
  });
  const currentUser = await User.findById(author);
  const currentCampground = await Campground.findById(campground);
  currentUser.reviews.push(newReview);
  currentCampground.reviews.push(newReview);
  await newReview.save();
  await currentUser.save();
  await currentCampground.save();
  console.log(newReview);
  res.send("Bootay");
};

module.exports.getReview = async (req, res) => {
  const { id } = req.params;
  const review = await Review.findById(id)
    .populate("author", "email")
    .populate("campground", "title");
  res.send(review);
};

module.exports.deleteReview = async (req, res) => {
  const { id } = req.params;
  const { author, campground } = req.body;
  await Campground.findByIdAndUpdate(campground, { $pull: { reviews: id } });
  await User.findByIdAndUpdate(author, { $pull: { reviews: id } });
  await Review.findByIdAndDelete(id);
  res.send("It worked bruh");
};
