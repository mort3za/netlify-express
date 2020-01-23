// const sgMail = require("@sendgrid/mail");
const api_key = process.env.SENDGRID_API_KEY;
const email_from = process.env.EMAIL_FROM;
axios = require("axios");

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
    // subject: email_subject,
    // text: email_text,
    // html: email_html,
    templateId: template_id,
    dynamic_template_data: template_data
  };

  const data = {
    from: {
      email: "my4@example.com",
      name: "Morteza"
    },
    personalizations: [
      {
        to: [
          {
            email: "m.ziaeemehr@gmail.com"
          }
        ],
        dynamic_template_data: {
          noun: "Mort"
        }
      }
    ],
    template_id: "d-9a3ef6bc785244159ea9ab2f8bf2c8a6"
  };

  try {
    const result = await axios({
      method: 'post',
      url: "https://api.sendgrid.com/v3/mail/send",
      data,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${api_key}`
      }
    });
    return { message: "OK" };
  } catch (error) {
    const errors =
      error &&
      error.response &&
      error.response.body &&
      error.response.body.errors;
    console.log("error =======>", errors || (error && error.response) || error);
    return {
      error: true,
      message:
        (errors && errors.length > 0 && errors[0].message) ||
        "mailer service has a problem"
    };
  }
};
