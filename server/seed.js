import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Doctor from './models/Doctor.js';
import Service from './models/Service.js';
import Review from './models/Review.js';
import Appointment from './models/Appointment.js';
import { initialDoctors, initialServices, initialReviews, sampleAppointments } from './data/initialData.js';

dotenv.config();

const seedData = async () => {
  try {
    const isConnected = await connectDB();
    if (!isConnected) {
      console.log('Skipping MongoDB database seed since MongoDB is not reachable.');
      process.exit(0);
    }

    console.log('Clearing existing data...');
    await Doctor.deleteMany({});
    await Service.deleteMany({});
    await Review.deleteMany({});
    await Appointment.deleteMany({});

    console.log('Seeding Doctors...');
    await Doctor.insertMany(initialDoctors);

    console.log('Seeding Services...');
    await Service.insertMany(initialServices);

    console.log('Seeding Patient Reviews...');
    await Review.insertMany(initialReviews);

    console.log('Seeding Sample Appointments...');
    await Appointment.insertMany(sampleAppointments);

    console.log('🎉 Data successfully seeded into Al Ayn MongoDB database!');
    process.exit(0);
  } catch (error) {
    console.error('Error during data seed:', error);
    process.exit(1);
  }
};

seedData();
