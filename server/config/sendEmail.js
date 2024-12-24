import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
  console.log("Provide SMTP_USER and SMTP_PASS in the .env file");
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: process.env.SMTP_PORT || 587,
  secure: false, // Use true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER, // Your email
    pass: process.env.SMTP_PASS, // Your email password or app password
  },
});

const sendEmail = async ({ sendTo, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: sendTo,
      subject: subject,
      html: html,
    });
    console.log("Email sent: ", info.messageId);
    return info;
  } catch (error) {
    console.log("Error sending email: ", error);
    throw error;
  }
};

export default sendEmail;
