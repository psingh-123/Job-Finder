const nodemailer = require("nodemailer");
  
const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false, 
    },
    });

    // ✅ Check SMTP connection before sending
    await transporter.verify();
    console.log("✅ SMTP server is ready to take messages");

    const mailOptions = {
      from: `"Job Finder" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully");
  } catch (err) {
    console.error("❌ Email sending error:", err);
  }
};

module.exports = sendEmail;
