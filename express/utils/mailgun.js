var api_key = process.env.MAILGUN_API_KEY;
const domain = process.env.MAILGUN_DOMAIN;
var mailgun = require("mailgun-js")({ apiKey: api_key, domain: domain });
const email_from = process.env.EMAIL_FROM;

exports.emailSender = function({
  email_to,
  email_subject,
  email_text,
  template_data
}) {
  const data = {
    from: email_from,
    to: email_to,
    subject: email_subject,
    text: email_text
  };

  return new Promise((resolve, reject) => {
    try {
      mailgun.messages().send(data, function(error, body) {
        logger(body);
        if (
          typeof body == "object" &&
          (body.message || "").toLowerCase().includes("queued")
        ) {
          resolve();
        } else {
          reject();
        }
      });
    } catch (error) {
      reject();
    }
  });
};

function logger(body) {
  console.log(`time:${new Date().getTime()}, message:${body.message}`);
}
