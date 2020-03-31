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
    user: "messagefromuserwebsite@gmail.com",
    pass: "t#i$_account4SALE"
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

app.get("/team", function (req, res) {
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
  const mailOptions = {
    from: "messagefromuserwebsite@gmail.com", // sender address
    to: "yasharyan307@outlook.com", // list of receivers
    subject: 'Message from wearemist', // Subject line
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
  searchQuery = { email: `${req.body.subscriberEmail}` };
  collectionMailingList.find(searchQuery).toArray((err, resultEmailExists) => {
    if (!resultEmailExists.length) {
      collectionMailingList.insertOne(
        { name: req.body.subscriberName, email: req.body.subscriberEmail, newsLetter: Boolean(req.body.newsYESorNO), eventsLetter: Boolean(req.body.eventsYESorNO) }
      );
      const mailOptions = {
        from: "messagefromuserwebsite@gmail.com", // sender address
        to: `${req.body.subscriberEmail}`, // list of receivers
        subject: 'Welcome onboard', // Subject line
        html: `<!DOCTYPE html><html lang="en"><head> <title>Welcome!</title></head><body> <style> * { border: 0; padding: 0; margin: 0; } body { font-family: arial, "helvetica neue", helvetica, sans-serif; font-weight: normal; } #container { margin: auto; width: 100vw; } .heading { font-size: 5vh; line-height: 150%; text-align: center; margin-top: 5vh; } img { height: 60px; display: block; padding-top: 30px; margin-left: auto; margin-right: auto; } .Thanks { margin-top: 20px; text-align: center; margin-top: 3%; } .message { width: 55%; margin: 20px auto 20px auto; } a { text-decoration: none; color: #017297; text-decoration: underline; } .feedback { width: 55%; color: #0099cc; margin: 3% auto; text-align: center; } .last { width: 55%; margin: 40px auto auto auto; text-align: center; color: #949494; } #websiteLink { color: #949494; } @media screen and (max-width: 1100px) { img { height: 150px; padding-top: 100px; } .Thanks { margin-top: 10%; } .message { margin-top: 100px; width: 95vw; margin-bottom: 200px; } .feedback { width: 95vw; } .last { width: 95vw; font-size: 15px; padding-bottom: 100px; } } </style> </div> <div id="container"> <div id="contentLogo"> <div id="contentImage"><img src="http://drive.google.com/uc?export=view&id=1T96CLtCEN_KQPS_KbMU3bwrx6OUp71tW"> </div> </div> <p class="heading">Manipal Information Security Team</p> <p class="Thanks">Thanks for subscribing to our newsletter, ${req.body.subscriberName}!</p> <p class="message"> We are glad you joined us. We promise we won't spam you. We'll only send what is important for you. MIST is dedicated to Information Security and we respect privacy. So we won't be selling your details to any third party applications. Your information is in safe hands. Also, don't forget to whitelist us.<br><br>Thanks, <br>MIST</p> <p class="feedback">We love feedbacks, and if you have any, please mail us, or you can even use the message box on our <a href="https://wearemist.herokuapp.com/nonGeek">homepage</a>.</p> <p class="last">You are receiving this email because you subscribed to <a href="https://wearemist.herokuapp.in" id="websiteLink">wearemist.in</a> <br>© 2020 MIST, All rights reserved.</p></body></html>`
      };
      transporter.sendMail(mailOptions, function (err, info) {
        if (err)
          console.log(err);
        else
          console.log(`Sent the mail to ${req.body.subscriberEmail} `);
      });
      res.sendFile(__dirname + "/public/signinConfirmed.html");
    }
    else {
      res.sendFile(__dirname + "/public/alreadyregistered.html");
    }
  });

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
  res.sendFile(__dirname + "/public/errorPage.html");
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