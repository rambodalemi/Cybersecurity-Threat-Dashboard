import nodemailer from "nodemailer"

export async function sendAlertEmail(subject: string, text: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER!,
      pass: process.env.EMAIL_PASS!, // Use an App Password
    },
  })

  await transporter.sendMail({
    from: process.env.EMAIL_USER!,
    to: process.env.ALERT_EMAIL!,
    subject,
    text,
  })
}
