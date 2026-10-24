import mongoose from 'mongoose';
import Inquiry from '../models/Inquiry.js';

let inMemoryInquiries = [];

export const createInquiry = async (req, res) => {
  try {
    const { name, email, phone, subject, message, urgency } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and message.' });
    }

    const payload = {
      name,
      email,
      phone: phone || '',
      subject: subject || 'General Inquiry',
      message,
      urgency: urgency || 'Routine',
      status: 'New'
    };

    if (mongoose.connection.readyState === 1) {
      try {
        const item = await Inquiry.create(payload);
        return res.status(201).json({ success: true, message: 'Inquiry received. Our clinical coordinator will reach out shortly.', data: item });
      } catch (e) {
        console.warn('DB error, using memory fallback:', e.message);
      }
    }

    const created = { ...payload, _id: `inq_${Date.now()}`, createdAt: new Date().toISOString() };
    inMemoryInquiries.unshift(created);
    res.status(201).json({ success: true, message: 'Inquiry received. Our clinical coordinator will reach out shortly.', data: created });
  } catch (error) {
    console.error('Error saving inquiry:', error);
    res.status(500).json({ success: false, message: 'Server error processing inquiry' });
  }
};

export const getInquiries = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const items = await Inquiry.find().sort({ createdAt: -1 });
      if (items.length > 0) return res.json({ success: true, data: items });
    }
    res.json({ success: true, data: inMemoryInquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error fetching inquiries' });
  }
};
