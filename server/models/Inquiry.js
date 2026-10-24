import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    urgency: {
      type: String,
      enum: ['Routine', 'Within 24 Hours', 'Emergency'],
      default: 'Routine'
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Resolved'],
      default: 'New'
    }
  },
  { timestamps: true }
);

const Inquiry = mongoose.models.Inquiry || mongoose.model('Inquiry', inquirySchema);

export default Inquiry;
