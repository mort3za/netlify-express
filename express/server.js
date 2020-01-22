"use strict";
const express = require("express");
const path = require("path");
const serverless = require("serverless-http");
const app = express();
const bodyParser = require("body-parser");
const { emailSender } = require("./utils/mailgun");

// base url for all express routes is: /.netlify/functions/server
// e.g. /.netlify/functions/server/mail/send

const router = express.Router();
router.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("<h1>Hello from Express.js!</h1>");
  res.end();
});

router.post("/", (req, res) => res.json({ postBody: req.body }));
router.post("/mail/send", (req, res) => {
  let result
  if (typeof req.body == 'object') {
    result = emailSender(req.body);
  }
  
  if (
    typeof result == "object" &&
    (result.message || "").toLowerCase().includes("Queued")
  ) {
    res.status(200).end();
  } else {
    res.status(400).end();
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/.netlify/functions/server", router); // path must route to lambda
app.use("/", (req, res) => res.sendFile(path.join(__dirname, "../index.html")));

module.exports = app;
module.exports.handler = serverless(app);
