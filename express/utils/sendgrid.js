// https://github.com/sendgrid/sendgrid-nodejs/blob/master/use-cases/transactional-templates.md
const sgMail = require("@sendgrid/mail");
const api_key = process.env.SENDGRID_API_KEY;
const email_from = process.env.EMAIL_FROM;

console.log("key", api_key.substring(0, 5), "--", api_key.substring(api_key.length - 3));

exports.emailSender = async function({
  email_to,
  email_subject,
  email_text,
  template_data
}) {
  // const msg = {
  //   to: email_to,
  //   from: email_from,
  //   subject: email_subject,
  //   text: email_text,
  //   html: "<strong>and easy to do anywhere, even with Node.js</strong>"
  //   // templateId: "d-9a3ef6bc785244159ea9ab2f8bf2c8a6",
  //   // dynamic_template_data: {
  //   //   subject: "Testing Templates",
  //   //   name: "Some One",
  //   //   noun: "This_is_nouN"
  //   // }
  // };

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
    sgMail.setApiKey(api_key);
    const result = await sgMail.send(msg);
    console.log("success ========>", result.response);
    return { message: "OK" };
  } catch (error) {
    console.log(
      "error =======>",
      error.response && error.response.body && error.response.body.errors
    );
    return { message: "mailer service has a problem" };
  }
};
