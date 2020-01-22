var api_key = process.env.MAILGUN_API_KEY;
const domain = process.env.MAILGUN_DOMAIN;
var mailgun = require("mailgun-js")({ apiKey: api_key, domain: domain });
const email_from = process.env.EMAIL_FROM;

exports.emailSender = function({ email_to, email_subject, email_text }) {
  const data = {
    from: email_from,
    to: email_to,
    subject: email_subject,
    text: email_text
  };

  mailgun.messages().send(data, function(error, body) {
    console.log(body);
    return body;
  });
};
