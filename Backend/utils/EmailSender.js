const nodemailer = require("nodemailer");

const SendEmail = async (email, text, subject) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "syllabuksu@gmail.com",
      pass: "mlicanugfifosbdy",
    },
  });
  const mailOptions = {
    from: "SyllaBukSU",
    to: email,
    subject: subject,
    text: text,
  };
  try {
    const response = await transporter.sendMail(mailOptions);
    return response;
  } catch (err) {
    console.log(err);
  }
};
module.exports = { SendEmail };
