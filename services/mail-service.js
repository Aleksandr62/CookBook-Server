require("dotenv").config();
const nodemailer = require("nodemailer");

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: process.env.SMTP_SECURE || false,
      requireTLS: process.env.SMTP_TLS || true,
      auth: {
        user: process.env.SMTP_USER,
        password: process.env.SMTP_PASSWORD
      }
    });
  }
  async sendActivationMail(to, link) {
    const res = await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: "Активация аккаунта на " + process.env.API_URL,
      text: "",
      html: `
        <div>
        <h3>Для активации перейдите по ссылке:</h3>
          <a href="${link}">${link}</a>
        </div>
      `
    });
    console.log(res)
  }
}

module.exports = new MailService();
