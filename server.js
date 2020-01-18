var path = require("path");
const express = require("express");
const pug = require("pug");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const router = express.Router();
let CCdata, MCdata, WCdata;
const CONNECTION_URL =
  "mongodb+srv://superuser_MIST:th1$expl41n$everything@cluster0-jq9yi.azure.mongodb.net/test?retryWrites=true&w=majority"; //enter mongoDB URL here
const DATABASE_NAME1 = "Members"; //enter Database Name here
const DATABASE_NAME2 = "Website"; //enter Database Name here
const COLLECTION_NAME = ""; //enter collection name here
const DATABASE_NAME = "Members"; //enter Database Name here

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

app.get("/nongeek", function(req, res) {
  res.sendFile(__dirname + "/public/nonGeek.html");
});

app.get("/geek", function(req, res) {
  res.sendFile(__dirname + "/public/underConstruction.html");
});

app.get("/team", function(req, res) {
  // res.sendFile(__dirname + "/public/team.html");
  collectionCC.find().toArray((err, result1) => {
    CCdata = result1;
    collectionMC.find().toArray((err, result2) => {
      MCdata = result2;
      collectionWC.find().toArray((err, result3) => {
        WCdata = result3;
        res.render("team", {
          CC: CCdata,
          MC: MCdata,
          WC: WCdata
        });
      });
    });
  });
});

app.get("/articles", function(req, res) {
  res.sendFile(__dirname + "/public/underConstruction.html");
});

app.get("/news", function(req, res) {
  res.sendFile(__dirname + "/public/news.html");
});

app.get("*", function(req, res) {
  res.send("I don't know what you're trying to do, but no, it will not work.");
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
  MongoClient.connect(
    CONNECTION_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (error, client) => {
      if (error) {
        throw error;
      }
      database1 = client.db(DATABASE_NAME1);
      database2 = client.db(DATABASE_NAME2);
      collectionCC = database1.collection("CoreCommittee");
      collectionMC = database1.collection("ManagementCommittee");
      collectionWC = database1.collection("WorkingCommittee");
      collectionPosts = database2.collection("articles");
      collectionArticles = database2.collection("articles");
      collectionNews = database2.collection("news");
      console.log("Connected to mongoDB Atlas");
    }
  );
});
