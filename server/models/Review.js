import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    patientName: { type: String, required: true },
    location: { type: String, default: 'Abu Dhabi / Al Ain' },
    treatment: { type: String, required: true },
    doctorName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    date: { type: String, required: true },
    verified: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);

export default Review;
