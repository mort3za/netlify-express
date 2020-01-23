// https://github.com/sendgrid/sendgrid-nodejs/blob/master/use-cases/transactional-templates.md
const sgMail = require("@sendgrid/mail");
const email_from = process.env.EMAIL_FROM;
const api_key = process.env.SENDGRID_API_KEY;

exports.emailSender = function({
  email_to,
  email_subject,
  email_text,
  template_data
}) {
  sgMail.setApiKey(api_key);
  const msg = {
    to: email_to,
    from: email_from,
    subject: email_subject,
    text: email_text,
    html: "<strong>and easy to do anywhere, even with Node.js</strong>"
    // templateId: "d-9a3ef6bc785244159ea9ab2f8bf2c8a6",
    // dynamic_template_data: {
    //   subject: "Testing Templates",
    //   name: "Some One",
    //   noun: "This_is_nouN"
    // }
  };

  return new Promise((resolve, reject) => {
    try {
      // sgMail
      //   .send(msg)
      //   .then(result => {
      //     resolve();
      //     return result;
      //   })
      //   .catch(error => {
      //     console.log("catch in sgMail.send", error);
      //   });
      const msg = {
        to: "m.ziaeemehr@gmail.com",
        from: "my3@example.com",
        subject: "Hello world 3",
        text: "Hello plain world!",
        html: "<p>Hello <b>HTML</b> world!</p>"
      };
      sgMail.send(msg);
    } catch (error) {
      reject({ message: "mailer service has a problem" });
    }
  });
};
