const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config({ path: '.env' });
const MongoClient = require("mongodb").MongoClient;
const getMail = require("./modules/emailSubscriberProvider");
const fs = require('fs');
const md5 = require('md5');
const CONNECTION_URL = process.env.DATABASE_URL;
const DATABASE_NAME1 = process.env.DATABASE_1;
const DATABASE_NAME2 = process.env.DATABASE_2;
const DATABASE_NAME3 = process.env.DATABASE_3;
let CCdata, MCdata, WCdata;

const transporter = nodemailer.createTransport({
  host: process.env.HOST_NAME,
  port: process.env.TRANSPORTER_MAILPORT,
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PASSWORD
  }
});

const app = express();
let date = new Date();


app.use(express.json()); // Make sure it comes back as json
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

app.post("/contactMailer", async function (req, res) {
  collectionBlacklist.findOne({ 'ipAddress': req.ip })
    .then(function (doc) {
      if (!doc) {
        console.log('IP is allowed');
        const mailOptions = {
          from: process.env.EMAIL_ID, // sender address
          to: process.env.TEAMS_EMAIL, // list of receivers
          subject: 'Message from wearemist website', // Subject line
          html: `<h4>${req.body.name}</h4><br><p>${req.body.message}</p><br><br><p>Message from ${req.body.name}, email ${req.body.email}.</p><br><br><br><p>All details are as follows: <br />${req.header('user-agent')}<br /> IP address of the sender is: <ul> <li>${req.ips}</li> <li>${req.ip}</li></ul>`// plain text body
        };
        transporter.sendMail(mailOptions, function (err, info) {
          if (err)
            console.log(err);
        });
        collectionBlacklist.insertOne( { ipAddress: req.ip } );
        console.log("Added to the blacklist");
        res.redirect("/nonGeek#section3");
      }
      else {
        console.log('IP is not allowed');
        res.status(400).send({
          message: 'not_allowed'
       });
      }
    });
});

app.get("/checkblackliststatus", async function(req, res) {
  collectionBlacklist.findOne({ 'ipAddress': req.ip })
    .then(function (doc) {
      if (!doc) {
        console.log(`Document was not found ${doc}`)
        result = "not_allowed";
        res.send("true");
      }
      else {
        console.log(`${doc} was found`)
        result = "allowed";
        res.send("false");
      }
    });
})

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

function randomString(length, chars) {
  let result = '';
  for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

app.post("/addToMailingList", function (req, res) {
  let timeOfHashing = new Date().getTime();
  let searchQuery = { email: `${req.body.subscriberEmail}` };
  let longStingLength = randomInteger(27, 35);
  let unsubscribeString = randomString(longStingLength, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') + md5(req.body.subscriberEmail) + md5(req.body.subscriberName) + md5(timeOfHashing);
  collectionMailingList.find(searchQuery).toArray((err, resultEmailExists) => {
    if (!resultEmailExists.length) {
      collectionMailingList.insertOne(
        { name: req.body.subscriberName, email: req.body.subscriberEmail, newsLetter: Boolean(req.body.newsYESorNO), eventsLetter: Boolean(req.body.eventsYESorNO), unsubscribeLink: unsubscribeString }
      );
      let getHTMLforSubscription = getMail.emailCreator(req.body.subscriberName, unsubscribeString);
      let mailOptions = {
        from: "sudo@wearemist.in",
        to: `${req.body.subscriberEmail}`,
        subject: 'Welcome onboard',
        html: `${getHTMLforSubscription}`
      };
      transporter.sendMail(mailOptions, function (err, info) {
        if (err)
          console.log(err);
        else
          console.log(`Sent the mail to ${req.body.subscriberEmail} `);
      });
      let completedSubscription = getMail.successSubscription();
      res.send(completedSubscription);
    }
    else {
      let failedSubscription = getMail.failedSubscription();
      res.send(failedSubscription);
    }
  });
});

app.get("/unsubscribe", function (req, res) {
  let unsubscribeString = req.query.unsubscribeRegistered;
  let searchQuery = { unsubscribeLink: `${unsubscribeString}` };
  collectionMailingList.find(searchQuery).toArray((err, resultEmailExists) => {
    if (!resultEmailExists.length) {
      res.sendFile(__dirname + "/public/errorPage.html");
    }
    else {
      collectionMailingList.deleteOne(searchQuery);
      let afterUnsubscribe = getMail.unsubscribeSuccessfully();
      res.send(afterUnsubscribe);
    }
  })
})

app.get("/getData", function (req, res) {
  let ip = req.ip;
  res.send(ip);
});

app.get("/getCCdata", function (req, res) {
  let nameListCC = "";
  collectionCC.find().toArray((err, result1) => {
    for (let val in result1) {
      nameListCC = nameListCC + result1[val].name + ",";
    }
    res.send(nameListCC);
  });
});

app.get("/getMCdata", function (req, res) {
  let nameListMC = "";
  collectionMC.find().toArray((err, result1) => {
    for (let val in result1) {
      nameListMC = nameListMC + result1[val].name + ",";
    }
    res.send(nameListMC);
  });
});


app.get("/getWCdata", function (req, res) {
  let nameListWC = "";
  collectionWC.find().toArray((err, result1) => {
    for (let val in result1) {
      nameListWC = nameListWC + result1[val].name + ",";
    }
    res.send(nameListWC);
  });
});

app.get("/getNewsdata", function (req, res) {
  let limit = 0;
  let newsList = "";
  collectionNews.find().sort({ sortingQuery: 1 }).toArray((err, news) => {
    newsPosts = news.reverse();
    for (let val in newsPosts) {
      newsList = newsList + news[val].newsHeading + "~";
      if (limit >= 9) {
        break;
      }
      limit += 1;
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
  let CnewsList = "";
  collectionClubNews.find().sort({ "sortingDate": -1 }).toArray((err, result1) => {
    for (let val in result1) {
      CnewsList = CnewsList + result1[val].heading + ",";
    }
    res.send(CnewsList);
  });
});

app.get("/getHistoryTimeline", function (req, res) {
  fs.readFile("./storeData/history.txt", (err, data) => {
    if (err) throw err;
    res.send(data);
  })
})

app.get("*", function (req, res) {
  res.sendFile(__dirname + "/public/errorPage.html");
});

function clearBlacklist() {
  console.log("deleting now");
  collectionBlacklist.deleteMany({});
}

app.listen(PORT, () => {
  setInterval(clearBlacklist, 43200000);
  console.log(`Server listening on port ${PORT}`);
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
      collectionBlacklist = database3.collection("blacklist");
      console.log("Connected to mongoDB Atlas");
    }
  );
});