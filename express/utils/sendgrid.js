const sgMail = require("@sendgrid/mail");
const api_key = process.env.SENDGRID_API_KEY;
const email_from = process.env.EMAIL_FROM;

console.log(
  `apikey: ${api_key.substring(0, 4)}...${api_key.substring(
    api_key.length - 1
  )}`
);

exports.emailSender = async function({
  email_to,
  email_subject,
  email_text,
  email_html,
  template_id,
  template_data
}) {
  const msg = {
    to: email_to,
    from: email_from,
    subject: email_subject,
    text: email_text,
    html: email_html,
    templateId: template_id,
    dynamic_template_data: template_data
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
      error: true,
      message:
        (errors && errors.length > 0 && errors[0].message) ||
        "mailer service has a problem"
    };
  }
};
