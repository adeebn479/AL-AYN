import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    specialty: { type: String, required: true },
    degrees: [{ type: String }],
    experience: { type: Number, required: true },
    rating: { type: Number, default: 4.9 },
    reviewsCount: { type: Number, default: 120 },
    photo: { type: String, required: true },
    bio: { type: String, required: true },
    languages: [{ type: String }],
    consultationFee: { type: Number, default: 100 },
    availableDays: [{ type: String }],
    availableSlots: [{ type: String }],
    isFeatured: { type: Boolean, default: false },
    department: { type: String }
  },
  { timestamps: true }
);

const Doctor = mongoose.models.Doctor || mongoose.model('Doctor', doctorSchema);

export default Doctor;
