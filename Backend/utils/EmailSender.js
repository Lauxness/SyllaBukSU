const nodemailer = require("nodemailer");

const SendEmail = async (email, pin) => {
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
    subject: "One Time Pin",
    text: pin,
  };
  try {
    const response = await transporter.sendMail(mailOptions);
    return response;
  } catch (err) {
    console.log(err);
  }
};
module.exports = { SendEmail };
