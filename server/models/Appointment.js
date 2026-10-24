import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
  {
    bookingReference: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    patientName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], default: 'Male' },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
    doctorName: { type: String, required: true },
    specialty: { type: String, required: true },
    appointmentDate: { type: String, required: true },
    timeSlot: { type: String, required: true },
    symptoms: { type: String, default: 'General Eye Checkup' },
    isFirstVisit: { type: Boolean, default: true },
    status: {
      type: String,
      enum: ['Confirmed', 'Pending', 'Completed', 'Cancelled'],
      default: 'Confirmed'
    },
    doctorNotes: { type: String, default: '' }
  },
  { timestamps: true }
);

const Appointment = mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchema);

export default Appointment;
