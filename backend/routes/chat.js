const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { authenticate } = require('../middleware/auth');
const getDoctorReply = require('../utils/gemini');

const router = express.Router();

const DUMMY_DOCTOR_ID = 'dummy_doctor_123';

// --- IN-MEMORY DUMMY DATABASE ---
let messages = [];
let msgIdCounter = 1;

const dummyDoctors = [
  { _id: 'dummy_doctor_123', name: 'Dr. Health Bot', profileImage: '', specialization: 'General AI Assistant', type: 'Doctor' },
  { _id: 'doc_1', name: 'Dr. Sarah Jones', profileImage: '', specialization: 'Cardiologist', type: 'Doctor' },
  { _id: 'doc_2', name: 'Dr. Michael Chen', profileImage: '', specialization: 'Dermatologist', type: 'Doctor' }
];

const dummyPatients = [
  { _id: 'pat_1', name: 'Alice Smith', profileImage: '', type: 'Patient' },
  { _id: 'pat_2', name: 'Bob Johnson', profileImage: '', type: 'Patient' }
];

const Doctor = require('../modal/Doctor');
const Patient = require('../modal/Patient');

/* ================================
   Fetch contacts list (MUST COME FIRST)
================================ */

router.get('/contacts/list', authenticate, async (req, res) => {
  try {
    const isDoctor = req.auth.type === 'doctor';
    const currentUserId = req.auth.id;

    // Optional: Also find all real users so they can start chats freely
    let realContacts = [];
    try {
      if (isDoctor) {
        // Find all patients or patients they have appointments with.
        // For simplicity, return all patients
        const validPatients = await Patient.find({}).select('name profileImage');
        realContacts = validPatients.map(p => ({ ...p.toObject(), type: 'Patient' }));
      } else {
        const validDoctors = await Doctor.find({}).select('name profileImage specialization');
        realContacts = validDoctors.map(d => ({ ...d.toObject(), type: 'Doctor' }));
      }
    } catch (dbErr) {
      console.error("DB fetch for real contacts failed", dbErr);
    }

    const dummyContacts = isDoctor ? dummyPatients.map(p => ({...p})) : dummyDoctors.map(d => ({...d}));
    
    // Combine real contacts and dummy contacts
    const contactsMap = new Map();
    [...realContacts, ...dummyContacts].forEach(c => {
      if (!contactsMap.has(c._id.toString())) {
        contactsMap.set(c._id.toString(), c);
      }
    });

    const contacts = Array.from(contactsMap.values());

    res.ok(contacts, 'Contacts fetched successfully');

  } catch (error) {
    console.error('Fetch contacts error:', error);
    res.serverError('Failed to fetch contacts', [error.message]);
  }
});


/* ================================
   Get chat history
================================ */

router.get('/:userId', authenticate, async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.auth.id;

    // Fetch messages where this user is sender or receiver to the given contact ID
    const chatHistory = messages.filter(m => 
      (m.senderId === currentUserId && m.receiverId === userId) ||
      (m.senderId === userId && m.receiverId === currentUserId)
    );

    console.log(`[GET /:userId] ${currentUserId} fetching chat with ${userId}. Found ${chatHistory.length} messages.`);

    res.ok(chatHistory, 'Chat history fetched successfully');

  } catch (error) {
    console.error('Fetch chat history error:', error);
    res.serverError('Failed to fetch chat history', [error.message]);
  }
});


/* ================================
   Send message
================================ */

router.post(
  '/send',
  authenticate,
  [
    body('receiverId').notEmpty().withMessage('Receiver ID is required'),
    body('receiverModel').isIn(['Patient', 'Doctor']).withMessage('Receiver model must be Patient or Doctor'),
    body('content').notEmpty().withMessage('Message content is required'),
  ],
  validate,
  async (req, res) => {
    try {
      const { receiverId, receiverModel, content } = req.body;
      const senderId = req.auth.id;
      const senderModel = req.auth.type === 'patient' ? 'Patient' : 'Doctor';

      console.log(`[POST /send] ${senderId} (${senderModel}) sending to ${receiverId} (${receiverModel}): "${content}"`);

      const message = {
        _id: `msg_${msgIdCounter++}_${Date.now()}`,
        senderId,
        senderModel,
        receiverId,
        receiverModel,
        content,
        createdAt: new Date().toISOString()
      };

      messages.push(message);

      let replyMessage = null;

      /* Auto Reply Logic for AI Assistant ONLY */
      if (
        receiverId === DUMMY_DOCTOR_ID &&
        receiverModel === 'Doctor' &&
        senderModel === 'Patient'
      ) {
        
        const doctorReply = await getDoctorReply(content).catch(() => "I am an AI assistant. I'm having trouble connecting to my knowledge base, but please make sure to get plenty of rest.");

        replyMessage = {
          _id: `msg_${msgIdCounter++}_${Date.now()}`,
          senderId: DUMMY_DOCTOR_ID,
          senderModel: 'Doctor',
          receiverId: senderId,
          receiverModel: 'Patient',
          content: doctorReply,
          createdAt: new Date().toISOString()
        };

        messages.push(replyMessage);
      }

      res.ok(
        { sentMessage: message, replyMessage },
        'Message sent successfully'
      );

    } catch (error) {
      console.error('Send message error:', error);
      res.serverError('Failed to send message', [error.message]);
    }
  }
);

module.exports = router;