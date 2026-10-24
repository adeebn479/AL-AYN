import mongoose from 'mongoose';
import Review from '../models/Review.js';
import { initialReviews } from '../data/initialData.js';

let inMemoryReviews = [...initialReviews.map((r, i) => ({ ...r, _id: `rev_${i + 1}` }))];

export const getReviews = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const items = await Review.find().sort({ createdAt: -1 });
      if (items.length > 0) return res.json({ success: true, count: items.length, data: items });
    }
    res.json({ success: true, count: inMemoryReviews.length, data: inMemoryReviews });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error retrieving reviews' });
  }
};

export const createReview = async (req, res) => {
  try {
    const { patientName, location, treatment, doctorName, rating, comment } = req.body;
    if (!patientName || !treatment || !rating || !comment) {
      return res.status(400).json({ success: false, message: 'Please complete all required review fields.' });
    }

    const payload = {
      patientName,
      location: location || 'UAE',
      treatment,
      doctorName: doctorName || 'Al Ayn Specialist',
      rating: Number(rating),
      comment,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      verified: true
    };

    if (mongoose.connection.readyState === 1) {
      try {
        const item = await Review.create(payload);
        return res.status(201).json({ success: true, message: 'Thank you for your review!', data: item });
      } catch (e) {
        console.warn('DB error, using memory fallback:', e.message);
      }
    }

    const created = { ...payload, _id: `rev_${Date.now()}` };
    inMemoryReviews.unshift(created);
    res.status(201).json({ success: true, message: 'Thank you for your review!', data: created });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error saving review' });
  }
};
