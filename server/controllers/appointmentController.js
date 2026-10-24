import mongoose from 'mongoose';
import Appointment from '../models/Appointment.js';
import { sampleAppointments } from '../data/initialData.js';

let inMemoryAppointments = [
  ...sampleAppointments.map((app, idx) => ({
    ...app,
    _id: `app_${idx + 1}`,
    createdAt: new Date().toISOString()
  }))
];

const generateBookingRef = () => {
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return `AYN-${new Date().getFullYear()}-${randomDigits}`;
};

export const createAppointment = async (req, res) => {
  try {
    const {
      patientName,
      email,
      phone,
      age,
      gender,
      doctorId,
      doctorName,
      specialty,
      appointmentDate,
      timeSlot,
      symptoms,
      isFirstVisit
    } = req.body;

    if (!patientName || !phone || !doctorName || !appointmentDate || !timeSlot) {
      return res.status(400).json({
        success: false,
        message: 'Please provide patient name, phone, doctor, appointment date, and time slot.'
      });
    }

    const bookingReference = generateBookingRef();

    const appointmentPayload = {
      bookingReference,
      patientName,
      email: email || '',
      phone,
      age: Number(age) || 30,
      gender: gender || 'Male',
      doctorId: mongoose.Types.ObjectId.isValid(doctorId) ? doctorId : undefined,
      doctorName,
      specialty: specialty || 'General Ophthalmology',
      appointmentDate,
      timeSlot,
      symptoms: symptoms || 'Vision consultation',
      isFirstVisit: isFirstVisit !== false,
      status: 'Confirmed',
      doctorNotes: ''
    };

    if (mongoose.connection.readyState === 1) {
      try {
        const newAppointment = await Appointment.create(appointmentPayload);
        return res.status(201).json({
          success: true,
          message: 'Appointment scheduled successfully!',
          data: newAppointment
        });
      } catch (dbErr) {
        console.warn('MongoDB insert failed, falling back to memory store:', dbErr.message);
      }
    }

    const createdInMemory = {
      ...appointmentPayload,
      _id: `app_${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    inMemoryAppointments.unshift(createdInMemory);

    return res.status(201).json({
      success: true,
      message: 'Appointment scheduled successfully!',
      data: createdInMemory
    });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ success: false, message: 'Server error creating appointment' });
  }
};

export const getAppointments = async (req, res) => {
  try {
    const { status, doctorName, search } = req.query;

    if (mongoose.connection.readyState === 1) {
      let filter = {};
      if (status && status !== 'All') {
        filter.status = status;
      }
      if (doctorName && doctorName !== 'All') {
        filter.doctorName = { $regex: doctorName, $options: 'i' };
      }
      if (search) {
        filter.$or = [
          { bookingReference: { $regex: search, $options: 'i' } },
          { patientName: { $regex: search, $options: 'i' } },
          { phone: { $regex: search, $options: 'i' } }
        ];
      }
      const appointments = await Appointment.find(filter).sort({ createdAt: -1 });
      if (appointments.length > 0) {
        return res.json({ success: true, count: appointments.length, data: appointments });
      }
    }

    let filtered = [...inMemoryAppointments];
    if (status && status !== 'All') {
      filtered = filtered.filter(a => a.status === status);
    }
    if (doctorName && doctorName !== 'All') {
      filtered = filtered.filter(a => a.doctorName.toLowerCase().includes(doctorName.toLowerCase()));
    }
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        a => a.bookingReference.toLowerCase().includes(q) ||
             a.patientName.toLowerCase().includes(q) ||
             a.phone.toLowerCase().includes(q)
      );
    }

    return res.json({ success: true, count: filtered.length, data: filtered });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ success: false, message: 'Server error fetching appointments' });
  }
};

export const getAppointmentByReference = async (req, res) => {
  try {
    const { reference } = req.params;
    const cleanRef = reference.trim().toUpperCase();

    if (mongoose.connection.readyState === 1) {
      const found = await Appointment.findOne({
        $or: [
          { bookingReference: cleanRef },
          { phone: cleanRef }
        ]
      });
      if (found) return res.json({ success: true, data: found });
    }

    const inMem = inMemoryAppointments.find(
      a => a.bookingReference.toUpperCase() === cleanRef || a.phone.includes(reference)
    );
    if (!inMem) {
      return res.status(404).json({ success: false, message: 'No appointment found with this reference number or phone.' });
    }
    return res.json({ success: true, data: inMem });
  } catch (error) {
    console.error('Error retrieving appointment by reference:', error);
    res.status(500).json({ success: false, message: 'Error checking appointment status' });
  }
};

export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, doctorNotes } = req.body;

    if (mongoose.connection.readyState === 1) {
      if (mongoose.Types.ObjectId.isValid(id)) {
        const updated = await Appointment.findByIdAndUpdate(
          id,
          { ...(status && { status }), ...(doctorNotes !== undefined && { doctorNotes }) },
          { new: true }
        );
        if (updated) return res.json({ success: true, data: updated });
      }
    }

    const index = inMemoryAppointments.findIndex(a => String(a._id) === String(id) || a.bookingReference === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }
    if (status) inMemoryAppointments[index].status = status;
    if (doctorNotes !== undefined) inMemoryAppointments[index].doctorNotes = doctorNotes;

    return res.json({ success: true, data: inMemoryAppointments[index] });
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ success: false, message: 'Server error updating appointment' });
  }
};

export const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1) {
      if (mongoose.Types.ObjectId.isValid(id)) {
        await Appointment.findByIdAndDelete(id);
        return res.json({ success: true, message: 'Appointment cancelled successfully' });
      }
    }

    inMemoryAppointments = inMemoryAppointments.filter(a => String(a._id) !== String(id) && a.bookingReference !== id);
    return res.json({ success: true, message: 'Appointment cancelled successfully' });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({ success: false, message: 'Server error cancelling appointment' });
  }
};
