import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    tagline: { type: String },
    shortDesc: { type: String, required: true },
    fullDesc: { type: String, required: true },
    icon: { type: String, default: 'Eye' },
    image: { type: String },
    duration: { type: String, default: '30-45 mins' },
    recoveryTime: { type: String, default: '24-48 hours' },
    benefits: [{ type: String }],
    idealFor: [{ type: String }],
    technology: { type: String },
    startingPrice: { type: String }
  },
  { timestamps: true }
);

const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);

export default Service;
