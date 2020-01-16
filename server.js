var path = require("path");
const express = require("express");
const pug = require("pug");
// const uuid = require("uuid");
// const cookie = require("cookie-parser");
// const MongoClient = require("mongodb").MongoClient;
// const ObjectId = require("mongodb").ObjectID;
// const router = express.Router();

const CONNECTION_URL = ""; //enter mongoDB URL here
const DATABASE_NAME = ""; //enter Database Name here
const COLLECTION_NAME = ""; //enter collection name here
let database, collection;

const app = express();

app.use(express.json()); // Make sure it comes back as json
app.use(express.static(__dirname + "/public"));
// app.use(bodyParser.json()); // to support JSON-encoded bodies
// app.use(
//   bodyParser.urlencoded({
//     extended: true
//   })
// );

app.set("view engine", "pug");
app.set("views", "./views");

const PORT = process.env.PORT || 3000;

app.get("/", function(req, res) {
  res.redirect("/home");
});

app.get("/home", function(req, res) {
  res.render("home");
});

// app.get("*", function(req, res) {
//   console.log("This route was not defined. Redirecting to the homePage");
//   res.redirect("/home");
// });

app.get("/nongeek", function(req, res) {
  res.sendFile(__dirname + "/public/nonGeek.html");
});

app.get("/geek", function(req, res) {
  res.render("geek");
});

app.get("/team", function(req, res) {
  // res.render("team");
  res.sendFile(__dirname + "/public/team.html");
});

app.get("/articles", function(req, res) {
  // res.render("team");
  res.sendFile(__dirname + "/public/articles.html");
});

app.get("*", function(req, res) {
  res.send("This feature is still under development");
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
