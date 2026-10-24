import mongoose from 'mongoose';
import Doctor from '../models/Doctor.js';
import { initialDoctors } from '../data/initialData.js';

let inMemoryDoctors = [...initialDoctors.map((doc, idx) => ({ ...doc, _id: `doc_${idx + 1}` }))];

export const getDoctors = async (req, res) => {
  try {
    const { specialty, featured, search } = req.query;

    if (mongoose.connection.readyState === 1) {
      let filter = {};
      if (specialty && specialty !== 'All') {
        filter.specialty = { $regex: specialty, $options: 'i' };
      }
      if (featured === 'true') {
        filter.isFeatured = true;
      }
      if (search) {
        filter.$or = [
          { name: { $regex: search, $options: 'i' } },
          { specialty: { $regex: search, $options: 'i' } },
          { department: { $regex: search, $options: 'i' } }
        ];
      }
      const doctors = await Doctor.find(filter).sort({ experience: -1 });
      if (doctors.length > 0) {
        return res.json({ success: true, count: doctors.length, data: doctors });
      }
    }

    // In-memory fallback
    let filtered = [...inMemoryDoctors];
    if (specialty && specialty !== 'All') {
      filtered = filtered.filter(d => d.specialty.toLowerCase().includes(specialty.toLowerCase()));
    }
    if (featured === 'true') {
      filtered = filtered.filter(d => d.isFeatured);
    }
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        d => d.name.toLowerCase().includes(q) ||
             d.specialty.toLowerCase().includes(q) ||
             (d.department && d.department.toLowerCase().includes(q))
      );
    }

    return res.json({ success: true, count: filtered.length, data: filtered });
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ success: false, message: 'Server error fetching doctors' });
  }
};

export const getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;
    if (mongoose.connection.readyState === 1) {
      if (mongoose.Types.ObjectId.isValid(id)) {
        const doctor = await Doctor.findById(id);
        if (doctor) return res.json({ success: true, data: doctor });
      }
    }
    const found = inMemoryDoctors.find(d => String(d._id) === String(id) || d.name.toLowerCase().includes(id.toLowerCase()));
    if (!found) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }
    res.json({ success: true, data: found });
  } catch (error) {
    console.error('Error fetching doctor by id:', error);
    res.status(500).json({ success: false, message: 'Error retrieving doctor' });
  }
};
