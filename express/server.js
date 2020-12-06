// see console logs in netlify: https://app.netlify.com/sites/express-502501/functions/server

"use strict";
const express = require("express");

var cors = require('cors')
const path = require("path");
const serverless = require("serverless-http");
const app = express();
const bodyParser = require("body-parser");
const { emailSender } = require("./utils/sendgrid");
// const { emailSender } = require("./utils/mailgun");

// base url for all express routes is: /.netlify/functions/server
// e.g. /.netlify/functions/server/mail/send

const router = express.Router();
router.get("/", (req, res) => {
  res.json({ app: "running" });
  res.end();
});

router.post("/mail/send", async (req, res) => {
  if (typeof req.body == "object") {
    const result = await emailSender(req.body);
    console.log("result", result);
    res.json(result).end();
  } else {
    res
      .json({ error: true })
      .status(400)
      .end();
  }
});


app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/.netlify/functions/server", router); // path must route to lambda
app.use("/", (req, res) => res.sendFile(path.join(__dirname, "../index.html")));

module.exports = app;
module.exports.handler = serverless(app);
