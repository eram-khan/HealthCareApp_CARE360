const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS ? process.env.EMAIL_PASS.replace(/\s+/g, '') : '',
  },
  tls: {
    rejectUnauthorized: false
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, supportType, message, anonymous } = req.body;

    if (!email || !message) {
      return res.status(400).json({ success: false, message: 'Email and message are required' });
    }

    const displayName = anonymous ? 'Anonymous' : (name || 'Not Provided');
    const displayPhone = anonymous ? 'Hidden (Anonymous)' : (phone || 'Not Provided');

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'khanera369@gmail.com',
      subject: `New Contact Request: ${supportType || 'General Inqiury'}`,
      html: `
        <h3>New Contact Request</h3>
        <p><strong>Name:</strong> ${displayName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${displayPhone}</p>
        <p><strong>Support Type:</strong> ${supportType || 'Not Specified'}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Error sending email' });
  }
});

module.exports = router;
