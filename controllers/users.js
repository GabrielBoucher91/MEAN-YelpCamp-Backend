const passport = require("passport");
const User = require("../models/users");
const ExpressError = require("../utils/ExpressError");

module.exports.getUser = async (req, res) => {
  const user = await User.findOne({ email: req.query.email });
  res.send(user);
};

module.exports.registerUser = async (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email: email }).then((user) => {
    if (user) {
      next(new ExpressError("User already exist", 401));
    }
  });

  const newUser = new User({ email });
  await newUser.setPassword(password);
  await newUser.save();
  req.login(newUser, (err) => {
    if (!err) {
      res.send({ email: email, signedin: true });
    }
  });
};

module.exports.login = async (req, res) => {
  res.send({ email: req.body.email, login: true });
};

module.exports.checkAuth = async (req, res) => {
  if (req.isAuthenticated()) {
    res.send({ Authenticated: true });
  } else {
    res.send({ Authenticated: false });
  }
};

module.exports.logout = async (req, res) => {
  req.logout((err) => {
    if (!err) {
      res.send({ logout: true });
    }
  });
};
