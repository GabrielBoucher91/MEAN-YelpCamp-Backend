const passport = require("passport");
const User = require("../models/users");
const ExpressError = require("../utils/ExpressError");

module.exports.authenticateLocal = async (req, res, next) => {
  console.log("this is a test");
  passport.authenticate("local", (err, user, info) => {
    console.log(err);
    if (err) {
      return next(err);
    }

    if (!user) {
      res
        .status(401)
        .send({ success: false, message: "Email or passowrd incorrect" });
    } else {
      req.logIn(user, function () {
        next();
      });
    }
  })(req, res, next);
};
module.exports.getUser = async (req, res) => {
  const user = await User.findOne({ email: req.query.email });
  if (user) {
    res.send({ username: true });
  } else {
    res.send({ username: false });
  }
};

module.exports.registerUser = async (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email: email }).then((user) => {
    if (user) {
      res.status(409).send({ succes: false, message: "User already exists" });
    }
  });

  const newUser = new User({ email });
  await newUser.setPassword(password);
  await newUser.save();
  req.login(newUser, (err) => {
    if (!err) {
      res.send({ succes: true, message: "User registered", email: email });
    } else {
      next(new ExpressError(err.message, err.status));
    }
  });
};

module.exports.login = async (req, res) => {
  res.send({ success: true, message: "Authentication successful" });
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
