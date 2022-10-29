const express = require("express");
const path = require("path");
const port = 8000;
const ExpressError = require("./utils/ExpressError");

// Defining routes
const userRoutes = require("./routes/users");

// Starting app
app = express();

//routing
app.use("/users", userRoutes);

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
