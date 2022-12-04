const Campground = require("../models/campgrounds");

module.exports.getCampgrounds = async (req, res) => {
  numberOfCamps = req.query.num;
  // console.log(numberOfCamps);
  const campgrounds = await Campground.find();
  // console.log(campgrounds);
  res.send("gottem");
};

module.exports.addCampground = async (req, res) => {
  const { title, image, price, state, city, author } = JSON.parse(req.body);
  const newCampground = new Campground({
    title,
    price: parseFloat(price),
    state,
    city,
    author,
  });
  newCampground.image = image.map((i) => ({
    url: i.url,
    filename: i.filename,
  }));
  await newCampground.save();
  res.send(req.body);
};

module.exports.getCampground = async (req, res) => {
  const campground = await Campground.findById(req.params.id)
    .populate({ path: "reviews" })
    .populate({ path: "author", select: "_id email" });

  if (!campground) {
    res.status(404).send({ message: "Campground not found" });
  } else {
    res.send(campground);
  }
};

module.exports.updateCampground = async (req, res) => {
  const id = req.params.id;
  const { title, image, price, state, city, author } = JSON.parse(req.body);
  const campground = await Campground.findByIdAndUpdate(
    id,
    {
      title,
      price: parseFloat(price),
      state,
      city,
      author,
    },
    { new: true }
  );
  console.log(image);
  if (image) {
    const imgs = image.map((i) => ({
      url: i.url,
      filename: i.filename,
    }));
    campground.image.push(...imgs);
  }
  await campground.save();
  res.send(campground);
};

module.exports.deleteCAmpground = async (req, res) => {
  const id = req.params.id;
  await Campground.findByIdAndDelete(id);
  res.send({ success: true, message: "Campground deleted" });
};
