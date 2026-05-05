const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  senderId: { type: String, required: true },
  senderModel: { type: String, required: true, enum: ['Patient', 'Doctor'] },
  receiverId: { type: String, required: true },
  receiverModel: { type: String, required: true, enum: ['Patient', 'Doctor'] },
  content: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
