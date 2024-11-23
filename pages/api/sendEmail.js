// pages/api/sendEmail.js
import nodemailer from 'nodemailer'

export default async function handler(req, res) {
  const { email, matches } = req.body
  const transporter = nodemailer.createTransport({
    service: 'gmail',  // You can use any email service
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password',
    },
  })

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Your Course to Apprenticeship Match Results',
    text: `Here are your top matches:\n\n${matches.map(match => `${match.job.title}: ${match.commonSkills.length} common skills`).join('\n')}`,
  }

  try {
    await transporter.sendMail(mailOptions)
    res.status(200).json({ message: 'Email sent successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to send email' })
  }
}
