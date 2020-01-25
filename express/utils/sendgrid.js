const api_key = process.env.SENDGRID_API_KEY;
const email_from = process.env.EMAIL_FROM;
const email_from_name = process.env.EMAIL_FROM_NAME;
axios = require("axios");

exports.emailSender = async function({
  email_to,
  email_bcc,
  email_subject,
  template_id,
  dynamic_template_data
}) {
  const data = {
    from: {
      email: email_from,
      name: email_from_name
    },
    personalizations: [
      {
        subject: email_subject,
        to: [
          {
            email: email_to
          }
        ],
        ...(email_bcc && {
          bcc: [
            {
              email: email_bcc
            }
          ]
        }),
        dynamic_template_data
      }
    ],
    template_id
  };

  try {
    const result = await axios({
      method: "post",
      url: "https://api.sendgrid.com/v3/mail/send",
      data,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${api_key}`
      }
    });
    return { error: false, status: 200, data: {} };
  } catch (error) {
    return {
      error: true,
      status: error.response.status,
      data: error.response.data
    };
  }
};
