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

// Mock store for in-memory contacts
let emergencyContacts = [];

// POST /api/emergency/contact
// Add a trusted emergency contact
router.post('/contact', (req, res) => {
    try {
        const { name, phone, relation } = req.body;
        if (!name || !phone) {
            return res.status(400).json({ error: 'Name and phone are required.' });
        }
        
        const newContact = {
            id: Date.now().toString(),
            name,
            phone,
            relation: relation || 'Unknown'
        };
        
        emergencyContacts.push(newContact);
        res.status(201).json({ message: 'Emergency contact added securely.', contact: newContact });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add contact.' });
    }
});

// GET /api/emergency/contact
// Get user's trusted emergency contacts
router.get('/contact', (req, res) => {
    try {
        res.status(200).json({ contacts: emergencyContacts });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch contacts.' });
    }
});

module.exports = router;

// POST /api/emergency/alert
// Send an emergency email alert with location
router.post('/alert', async (req, res) => {
    try {
        const { location } = req.body;
        const locMsg = location 
          ? `User needs urgent help. Location: https://maps.google.com/?q=${location.lat},${location.lng}` 
          : `User needs urgent help. Please contact them immediately. Location not available.`;

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: 'khanera369@gmail.com',
          subject: 'EMERGENCY ALERT TRIGGERED',
          html: `
            <h2 style="color: red;">EMERGENCY ALERT</h2>
            <p><strong>A user has triggered the panic button.</strong></p>
            <p>${locMsg}</p>
          `,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Emergency alert sent successfully.' });
    } catch (error) {
        console.error('Error sending emergency alert email:', error);
        res.status(500).json({ success: false, error: 'Failed to send alert.' });
    }
});
