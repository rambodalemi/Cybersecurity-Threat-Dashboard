import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export async function sendAlertEmail(subject: string, text: string, to?: string) {
  const mailOptions = {
    from: `Threat Detector <${process.env.EMAIL_USER}>`,
    to: to || process.env.ALERT_EMAIL,
    subject,
    text,
  }

  await transporter.sendMail(mailOptions)
}
