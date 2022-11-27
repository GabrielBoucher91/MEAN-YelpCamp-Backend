const Review = require("../models/reviews");

module.exports.newReview = async (req, res) => {
  const { author, body, campground, rating } = req.body;
  const newReview = new Review({
    author,
    body,
    campground,
    rating,
  });

  console.log(newReview);
  res.send("Bootay");
};
