var api_key = process.env.MAILGUN_API_KEY;
const domain = process.env.MAILGUN_DOMAIN;
var mailgun = require("mailgun-js")({ apiKey: api_key, domain: domain });

exports.emailSender = function() {
  const data = {
    from: `Mailgun Sandbox <postmaster@${domain}>`,
    to: "m.ziaeemehr@gmail.com",
    subject: "Hello from MG",
    text: "Testing some Mailgun awesomness!"
  };

  mailgun.messages().send(data, function(error, body) {
    console.log(body);
    return body;
  });
}
