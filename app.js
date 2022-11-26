const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const path = require("path");
const port = 8000;
const ExpressError = require("./utils/ExpressError");

//Passport imports
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/users");

// Defining routes
const userRoutes = require("./routes/users");
const reviewRoutes = require("./routes/reviews");
const campgroundRoutes = require("./routes/campgrounds");

//Connect to mongoose
async function mongooseConnect() {
  await mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp-mean");
  console.log("Connected to Database");
}

mongooseConnect().catch((err) => {
  console.log(err);
});

//Starting app
app = express();
app.use(express.urlencoded({ extended: true }));
app.use(
  bodyParser.raw({ inflate: true, limit: "100kb", type: "application/json" })
);

//Login and session
const sessionConfig = {
  secret: "thisshouldbeabettersecret!",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy({ usernameField: "email" }, User.authenticate())
);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Routing
app.use("/users", userRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/reviews", reviewRoutes);

app.all("*", (req, res, next) => {
  console.log("Page not found");
  next(new ExpressError("Page not found", 404));
});

app.use((err, req, res, next) => {
  console.log(err);
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh No, Something Went Wrong!";
  res.status(statusCode).send(err.message);
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
