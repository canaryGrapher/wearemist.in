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
  res.redirect("/boot");
});

app.get("/home", function (req, res) {
  res.redirect("/boot");
});

app.get("/boot", function (req, res) {
  res.render("home");
});

app.get("/Geek", function (req, res) {
  res.sendFile(__dirname + "/public/geek.html");
});

app.get("/nongeek", function (req, res) {
  res.sendFile(__dirname + "/public/nonGeek.html");
});

app.get("/team", function (req, res) {
  res.sendFile(__dirname + "/public/team.html");
});

app.get("/teaminfo", function (req, res) {
  collectionCC.find().toArray((err, result1) => {
    CCdata = result1;
    collectionMC.find().toArray((err, result2) => {
      MCdata = result2;
      collectionWC.find().toArray((err, result3) => {
        WCdata = result3;
        res.send({ CC: CCdata, MC: MCdata, WC: WCdata });
      });
    });
  });
});

app.get("/credits", function (req, res) {
  res.sendFile(__dirname + "/public/credits.html");
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
  });
  res.redirect("/nonGeek#section3");
});

app.get("/news", function (req, res) {
  res.sendFile(__dirname + "/public/news.html");
});

app.get("/getNews", async function (req, res) {
  let sentTrimmedNewsData = [];
  let lowerLimit = parseInt(req.query.loadingIndex) * 5;
  let upperLimit = (lowerLimit + 5) - 1;
  let totalDocs = await collectionNews.countDocuments();
  if (upperLimit >= totalDocs) {
    upperLimit = totalDocs - 1;
  }
  collectionNews.find().sort({ sortingQuery: 1 }).toArray((err, news) => {
    newsPosts = news.reverse();
    if (req.query.loadingIndex != "NA") {
      for (let iteratingThroughAllNews = lowerLimit; iteratingThroughAllNews <= upperLimit; iteratingThroughAllNews++) {
        let newsArticle = newsPosts[iteratingThroughAllNews];
        sentTrimmedNewsData.push(newsArticle);
      }
      if (lowerLimit >= totalDocs) {
        res.send({ "message": 'eof' });
      }
      else {
        res.send(sentTrimmedNewsData);
      }
    }
    else {
      res.send(newsPosts);
    }
  });

});

app.get("/getClubNews", function (req, res) {
  collectionClubNews.find().sort({ "sortingDate": 1 }).toArray((err, clubNews) => {
    clubNewsPosts = clubNews.reverse();
    res.send(clubNewsPosts);
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
      res.send(`<!DOCTYPE html><html><head> <title>Subscription | MIST</title> <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' /> <link rel="apple-touch-icon-precomposed" sizes="57x57" href="./images/favicon/apple-touch-icon-57x57.png" /> <link rel="apple-touch-icon-precomposed" sizes="114x114" href="./images/favicon/apple-touch-icon-114x114.png" /> <link rel="apple-touch-icon-precomposed" sizes="72x72" href="./images/favicon/apple-touch-icon-72x72.png" /> <link rel="apple-touch-icon-precomposed" sizes="144x144" href="./images/favicon/apple-touch-icon-144x144.png" /> <link rel="apple-touch-icon-precomposed" sizes="60x60" href="./images/favicon/apple-touch-icon-60x60.png" /> <link rel="apple-touch-icon-precomposed" sizes="120x120" href="./images/favicon/apple-touch-icon-120x120.png" /> <link rel="apple-touch-icon-precomposed" sizes="76x76" href="./images/favicon/apple-touch-icon-76x76.png" /> <link rel="apple-touch-icon-precomposed" sizes="152x152" href="./images/favicon/apple-touch-icon-152x152.png" /> <link rel="icon" type="image/png" href="./images/favicon/favicon-196x196.png" sizes="196x196" /> <link rel="icon" type="image/png" href="./images/favicon/favicon-96x96.png" sizes="96x96" /> <link rel="icon" type="image/png" href="./images/favicon/favicon-32x32.png" sizes="32x32" /> <link rel="icon" type="image/png" href="./images/favicon/favicon-16x16.png" sizes="16x16" /> <link rel="icon" type="image/png" href="./images/favicon/favicon-128.png" sizes="128x128" /> <meta name="application-name" content="&nbsp;" /> <meta name="msapplication-TileColor" content="#FFFFFF" /> <meta name="msapplication-TileImage" content="./images/favicon/mstile-144x144.png" /> <meta name="msapplication-square70x70logo" content="./images/favicon/mstile-70x70.png" /> <meta name="msapplication-square150x150logo" content="./images/favicon/mstile-150x150.png" /> <meta name="msapplication-wide310x150logo" content="./images/favicon/mstile-310x150.png" /> <meta name="msapplication-square310x310logo" content="./images/favicon/mstile-310x310.png" /></head><body> <style> @import url('https://fonts.googleapis.com/css?family=Cedarville+Cursive&display=swap'); * { padding: 0; border: 0; margin: 0; } body { overflow: hidden; user-select: none; background-attachment: fixed; background-position: center; background-size: cover; background-image: url("./images/backgrounds/subscribed.jpg"); } #container { width: 100vw; height: 100vh; display: flex; flex-direction: column; justify-content: center; background-color: rgba(0, 0, 0, 0.24); } #banner { min-width: fit-content; width: 45vw; position: absolute; right: 0; margin-right: 10%; margin-top: auto; margin-bottom: auto; text-align: center; color: #fff; } h1 { font-size: 8vh; font-family: 'Cedarville Cursive', cursive; } h2 { font-weight: bolder; } p { font-size: 20px; } body { display: flex; justify-content: center; align-items: center; width: 100vw; height: 100vh; } .button { display: block; width: 10vw; min-width: 200px; max-width: 100%; margin: 15px auto; margin-bottom: 0; overflow: hidden; position: relative; transform: translatez(0); text-decoration: none; box-sizing: border-box; font-size: 20px; font-weight: normal; box-shadow: 0 9px 18px rgba(0, 0, 0, 0.2); } .glowButton { text-align: center; border-radius: 50px; padding: 26px; color: white; background: #BD3381; transition: all 0.2s ease-out 0s; } .gradient { display: block; position: absolute; top: 0; right: 0; width: 100%; height: 100%; bottom: auto; margin: auto; z-index: -1; background: radial-gradient(90px circle at top center, rgba(238, 88, 63, .8) 30%, rgba(255, 255, 255, 0)); transition: all 0s ease-out 0s; transform: translatex(-140px); animation: 18s linear 0s infinite move; } @keyframes move { 0% { transform: translatex(-140px); } 25% { transform: translatex(140px); opacity: 0.3; } 50% { transform: translatex(140px); opacity: 1; background: radial-gradient(90px circle at bottom center, rgba(238, 88, 63, .5) 30%, rgba(255, 255, 255, 0)); } 75% { transform: translatex(-140px); opacity: 0.3; } 100% { opacity: 1; transform: translatex(-140px); background: radial-gradient(90px circle at top center, rgba(63, 197, 238, 0.5) 30%, rgba(255, 255, 255, 0)); } } @media screen and (max-width: 500px) { #banner { width: 100%; margin-right: auto; margin-left: auto; } h1 { font-size: 50px; font-family: 'Cedarville Cursive', cursive; } h2 { font-size: 20px; } } </style> <div id="container"> <div id="banner"> <h1>Congratulations!</h1> <h2>You have been subscribed successfully</h2> <p>We'll keep in touch</p> <a href="/news" class="button glowButton"><span class="gradient"></span>Go back</a> </div> </div></body></html>`);
    }
    else {
      res.send(`<!DOCTYPE html><html><head> <title>Subscription | MIST</title> <link rel="apple-touch-icon-precomposed" sizes="57x57" href="./images/favicon/apple-touch-icon-57x57.png" /> <link rel="apple-touch-icon-precomposed" sizes="114x114" href="./images/favicon/apple-touch-icon-114x114.png" /> <link rel="apple-touch-icon-precomposed" sizes="72x72" href="./images/favicon/apple-touch-icon-72x72.png" /> <link rel="apple-touch-icon-precomposed" sizes="144x144" href="./images/favicon/apple-touch-icon-144x144.png" /> <link rel="apple-touch-icon-precomposed" sizes="60x60" href="./images/favicon/apple-touch-icon-60x60.png" /> <link rel="apple-touch-icon-precomposed" sizes="120x120" href="./images/favicon/apple-touch-icon-120x120.png" /> <link rel="apple-touch-icon-precomposed" sizes="76x76" href="./images/favicon/apple-touch-icon-76x76.png" /> <link rel="apple-touch-icon-precomposed" sizes="152x152" href="./images/favicon/apple-touch-icon-152x152.png" /> <link rel="icon" type="image/png" href="./images/favicon/favicon-196x196.png" sizes="196x196" /> <link rel="icon" type="image/png" href="./images/favicon/favicon-96x96.png" sizes="96x96" /> <link rel="icon" type="image/png" href="./images/favicon/favicon-32x32.png" sizes="32x32" /> <link rel="icon" type="image/png" href="./images/favicon/favicon-16x16.png" sizes="16x16" /> <link rel="icon" type="image/png" href="./images/favicon/favicon-128.png" sizes="128x128" /> <meta name="application-name" content="&nbsp;" /> <meta name="msapplication-TileColor" content="#FFFFFF" /> <meta name="msapplication-TileImage" content="./images/favicon/mstile-144x144.png" /> <meta name="msapplication-square70x70logo" content="./images/favicon/mstile-70x70.png" /> <meta name="msapplication-square150x150logo" content="./images/favicon/mstile-150x150.png" /> <meta name="msapplication-wide310x150logo" content="./images/favicon/mstile-310x150.png" /> <meta name="msapplication-square310x310logo" content="./images/favicon/mstile-310x310.png" /></head><body> <style> @import url('https://fonts.googleapis.com/css?family=Cedarville+Cursive&display=swap'); * { padding: 0; border: 0; margin: 0; } body { overflow: hidden; user-select: none; background-attachment: fixed; background-position: center; background-size: cover; background-image: url("./images/backgrounds/alreadySubscribed.jpg"); } #container { width: 100vw; height: 100vh; display: flex; flex-direction: column; justify-content: center; background-color: rgba(0, 0, 0, 0.24); } #banner { min-width: fit-content; width: 45vw; position: absolute; right: 0; margin-right: 10%; margin-top: auto; margin-bottom: auto; text-align: center; color: #fff; } h1 { font-size: 20vh; font-family: 'Cedarville Cursive', cursive; } p { font-size: 20px; } .button { display: block; width: 10vw; min-width: 200px; max-width: 100%; margin: 15px auto; margin-bottom: 0; overflow: hidden; position: relative; transform: translatez(0); text-decoration: none; box-sizing: border-box; font-size: 20px; font-weight: normal; box-shadow: 0 9px 18px rgba(0, 0, 0, 0.2); } .glowButton { text-align: center; border-radius: 50px; padding: 26px; color: white; background: #BD3381; transition: all 0.2s ease-out 0s; } .gradient { display: block; position: absolute; top: 0; right: 0; width: 100%; height: 100%; bottom: auto; margin: auto; z-index: -1; background: radial-gradient(90px circle at top center, rgba(238, 88, 63, .8) 30%, rgba(255, 255, 255, 0)); transition: all 0s ease-out 0s; transform: translatex(-140px); animation: 18s linear 0s infinite move; } @keyframes move { 0% { transform: translatex(-140px); } 25% { transform: translatex(140px); opacity: 0.3; } 50% { transform: translatex(140px); opacity: 1; background: radial-gradient(90px circle at bottom center, rgba(238, 88, 63, .5) 30%, rgba(255, 255, 255, 0)); } 75% { transform: translatex(-140px); opacity: 0.3; } 100% { opacity: 1; transform: translatex(-140px); background: radial-gradient(90px circle at top center, rgba(63, 197, 238, 0.5) 30%, rgba(255, 255, 255, 0)); } } </style> <div id="container"> <div id="banner"> <h1>Oops!</h1> <p>You are there in our mailing list, we are already friends.</p> <a href="/news" class="button glowButton"><span class="gradient"></span>Go back</a> </div> </div></body></html>`);
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
  collectionNews.find({ $query: {}, $orderby: { sortingQuery: -1 } }).toArray((err, result1) => {
    for (var val in result1) {
      newsList = newsList + result1[val].newsHeading + "~";
    }
    res.send(newsList);
  });
});

app.get("/verifyWriter", function (req, res) {
  collectionWriters.findOne({ 'name': req.query.writername })
    .then(function (doc) {
      if (!doc) {
        res.send("false");
      }
      else {
        res.send("true");
      }
    });

});

app.get("/getClubNewsdata", function (req, res) {
  var CnewsList = "";
  collectionClubNews.find().sort({ "sortingDate": -1 }).toArray((err, result1) => {
    for (var val in result1) {
      CnewsList = CnewsList + result1[val].heading + ",";
    }
    res.send(CnewsList);
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
      collectionClubNews = database2.collection("clubNews");
      collectionWriters = database2.collection("verifiedWriters");
      collectionMailingList = database3.collection("mailingList");
      console.log("Connected to mongoDB Atlas");
    }
  );
});