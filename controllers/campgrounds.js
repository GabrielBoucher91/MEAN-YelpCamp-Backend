const Campground = require("../models/campgrounds");

module.exports.getCampgrounds = async (req, res) => {
  const campgrounds = await Campground.find();
  console.log(campgrounds);
  res.send("gottem");
};

module.exports.addCampground = async (req, res) => {
  const { title, image, price, location, author } = JSON.parse(req.body);
  const newCampground = new Campground({
    title,
    price: parseFloat(price),
    location,
    author,
  });
  newCampground.image = image.map((i) => ({
    url: i.url,
    filename: i.filename,
  }));
  await newCampground.save();
  console.log(newCampground);
  res.send(req.body);
};
