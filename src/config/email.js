const nodemailer = require("nodemailer");
require("dotenv").config();
const { smtp_username, smtp_password } = require("../utils/secret");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: smtp_username,
    pass: smtp_password,
  },
});

const emailWithNodemailer = async (emailData) => {
  try {
    const mailOptions = {
      from: smtp_username, // sender address
      to: emailData.email, // list of receivers
      subject: emailData.subject, // Subject line // plain text body
      html: emailData.html, // html body
    };
    const info = await transporter.sendMail(mailOptions);
    console.log(`send success :${info}`);
  } catch (error) {
    console.log(`error form email ${error}`);
  }
};

module.exports = { emailWithNodemailer };
