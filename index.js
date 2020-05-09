// import the packages
const bodyParser = require("body-parser");
const express    = require("express");
const mongoose   = require("mongoose");

// Importing routes
const routes = require("./app/routes.js");

// Import db configs
const db = require("./app/config/db.js");

// configure body parser
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add /api to all routes
app.use("/api", routes);

// Set up port
const port     = process.env.PORT || 9000;

mongoose.connect(db.url, db.options, (err) => {
  if (err) {
    console.warn(err);
  } else {
    console.log("Connected to database");
    app.listen(port);
    console.log(`Crownstack - App is running on the port ${port}`);
  }
});

module.exports = app;
