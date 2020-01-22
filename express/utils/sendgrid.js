// https://github.com/sendgrid/sendgrid-nodejs/blob/master/use-cases/transactional-templates.md
const sgMail = require("@sendgrid/mail");

export default function() {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: "m.ziaeemehr@gmail.com",
    from: "test@example.com",
    // subject: "Sending with Twilio SendGrid is Fun",
    // text: "and easy to do anywhere, even with Node.js",
    // html: "<strong>and easy to do anywhere, even with Node.js</strong>"
    templateId: "d-9a3ef6bc785244159ea9ab2f8bf2c8a6",
    dynamic_template_data: {
      subject: "Testing Templates",
      name: "Some One",
      noun: "This_is_nouN"
    }
  };
  return sgMail.send(msg);
}
