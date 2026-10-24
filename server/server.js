import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import doctorRoutes from './routes/doctorRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import inquiryRoutes from './routes/inquiryRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import Doctor from './models/Doctor.js';
import Service from './models/Service.js';
import Review from './models/Review.js';
import Appointment from './models/Appointment.js';
import { initialDoctors, initialServices, initialReviews, sampleAppointments } from './data/initialData.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Database connection & auto-seed if empty
const initDB = async () => {
  const connected = await connectDB();
  if (connected) {
    try {
      const docCount = await Doctor.countDocuments();
      if (docCount === 0) {
        console.log('Seeding initial hospital data...');
        await Doctor.insertMany(initialDoctors);
        await Service.insertMany(initialServices);
        await Review.insertMany(initialReviews);
        await Appointment.insertMany(sampleAppointments);
        console.log('Database auto-seeded successfully!');
      }
    } catch (err) {
      console.warn('Auto-seed notice:', err.message);
    }
  }
};
initDB();

// API Routes
app.use('/api/doctors', doctorRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/reviews', reviewRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    hospital: 'Al Ayn Specialized Eye Hospital',
    timestamp: new Date().toISOString(),
    database: (Doctor.db && Doctor.db.readyState === 1) ? 'MongoDB Connected' : 'In-Memory Resilient Store Active'
  });
});

// Root route
app.get('/', (req, res) => {
  res.send('Al Ayn Eye Hospital API Server is running.');
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Al Ayn Eye Hospital Server running on port ${PORT} (http://localhost:${PORT})`);
});
