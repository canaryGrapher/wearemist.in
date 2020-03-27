const path = require("path");
const express = require("express");
const pug = require("pug");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config({ path: '.env' });
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
let CCdata, MCdata, WCdata;
const CONNECTION_URL = process.env.DATABASE_URL;
const DATABASE_NAME1 = "Members"; //enter Database Name here
const DATABASE_NAME2 = "Website"; //enter Database Name here
const DATABASE_NAME3 = "UserData";
var device = require("express-device");
const si = require("systeminformation");

var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PASSWORD
  }
});

const app = express();


app.use(express.json()); // Make sure it comes back as json
app.use(device.capture());
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.set('trust proxy', true); //setting up so that we get the IP of the user
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.set("view engine", "pug");
app.set("views", "./views");

const PORT = process.env.PORT || 3000;

app.get("/", function (req, res) {
  res.redirect("/home");
});

app.get("/home", function (req, res) {
  res.render("home");
});

app.get("/Geek", function (req, res) {
  res.sendFile(__dirname + "/public/GeekPage.html");
});

app.get("/nongeek", function (req, res) {
  res.sendFile(__dirname + "/public/nonGeek.html");
});

app.get("/geek", function (req, res) {
  res.sendFile(__dirname + "/public/underConstruction.html");
});

app.get("/team", function (req, res) {
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

app.get("/contributors", function (req, res) {
  res.sendFile(__dirname + "/public/contributors.html");
});

app.post("/contactMailer", function (req, res) {
  console.log(req.body);
  const mailOptions = {
    from: process.env.EMAIL_ID, // sender address
    to: process.env.SENDER_EMAIL, // list of receivers
    subject: 'Message from user website', // Subject line
    html: `<h1>${req.body.name}</h1><br><p>${req.body.message}</p><br><br><p>Message from ${req.body.name}, email ${req.body.email}.</p><br><br><br><p>All details are as follows: ${req.body}</p>`// plain text body
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err)
      console.log(err);
    else
      console.log("Sent the mail to yasharyan307@outlook.com ");
  });
  res.redirect("/nonGeek#section3");
});

app.get("/news", function (req, res) {
  collectionNews.find().toArray((err, news) => {
    newsPosts = news.reverse();
    res.render("news", {
      newsReports: newsPosts
    });
  });
});

app.post("/addToMailingList", function (req, res) {
  //do something to add these to the maling list after filtering
  console.log(req.body);
  // collectionMailingList.insertMany(req.body.subscriberEmail, function (err, res) {
  //   if (err) throw err;
  //   console.log("1 document inserted");
  //   res.render("subscriberDone");
  // });
  res.redirect("/news");
});

app.get("/getData", function (req, res) {
  var ip = req.connection.remoteAddress;
  var modifiedIP = ip.split(":");
  var lengthOfIP = modifiedIP.length;
  var lastElement = lengthOfIP - 1;
  var otherOption = "127.0.0.1";
  var sendingIP = modifiedIP[lastElement] || otherOption;
  res.send(sendingIP);
});

app.get("/getCCdata", function (req, res) {
  var nameListCC = "";
  collectionCC.find().toArray((err, result1) => {
    for (var val in result1) {
      nameListCC = nameListCC + result1[val].name + ",";
    }
    res.send(nameListCC);
  });
});

app.get("/getMCdata", function (req, res) {
  var nameListMC = "";
  collectionMC.find().toArray((err, result1) => {
    for (var val in result1) {
      nameListMC = nameListMC + result1[val].name + ",";
    }
    res.send(nameListMC);
  });
});


app.get("/getWCdata", function (req, res) {
  var nameListWC = "";
  collectionWC.find().toArray((err, result1) => {
    for (var val in result1) {
      nameListWC = nameListWC + result1[val].name + ",";
    }
    res.send(nameListWC);
  });
});

app.get("/getNewsdata", function (req, res) {
  var newsList = "";
  collectionNews.find().toArray((err, result1) => {
    for (var val in result1) {
      newsList = newsList + result1[val].newsHeading + ",";
    }
    res.send(newsList);
  });
});

app.get("*", function (req, res) {
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
      database3 = client.db(DATABASE_NAME3);
      collectionCC = database1.collection("CoreCommittee");
      collectionMC = database1.collection("ManagementCommittee");
      collectionWC = database1.collection("WorkingCommittee");
      collectionNews = database2.collection("news");
      collectionMailingList = database3.collection("mailingList");
      console.log("Connected to mongoDB Atlas");
    }
  );
});