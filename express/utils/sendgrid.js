// https://github.com/sendgrid/sendgrid-nodejs/blob/master/use-cases/transactional-templates.md
const sgMail = require("@sendgrid/mail");
const api_key = process.env.SENDGRID_API_KEY;
const email_from = process.env.EMAIL_FROM;

console.log(
  `apikey: ${api_key.substring(0, 5)}...${api_key.substring(
    api_key.length - 2
  )}`
);

exports.emailSender = async function({
  email_to,
  email_subject,
  email_text,
  template_data
}) {
  const msg = {
    to: email_to,
    from: email_from,
    subject: email_subject,
    text: email_text
    // html: "<strong>and easy to do anywhere, even with Node.js</strong>"
    // templateId: "d-9a3ef6bc785244159ea9ab2f8bf2c8a6",
    // dynamic_template_data: {
    //   subject: "Testing Templates",
    //   name: "Some One",
    //   noun: "This_is_nouN"
    // }
  };

  try {
    sgMail.setApiKey(api_key);
    await sgMail.send(msg);
    return { message: "OK" };
  } catch (error) {
    const errors =
      error.response && error.response.body && error.response.body.errors;
    console.log("error =======>", errors);
    return {
      message:
        (errors.length > 0 && errors[0].message) ||
        "mailer service has a problem"
    };
  }
};
