import mongoose from 'mongoose';
import Service from '../models/Service.js';
import { initialServices } from '../data/initialData.js';

let inMemoryServices = [...initialServices.map((svc, idx) => ({ ...svc, _id: `svc_${idx + 1}` }))];

export const getServices = async (req, res) => {
  try {
    const { category, search } = req.query;

    if (mongoose.connection.readyState === 1) {
      let filter = {};
      if (category && category !== 'All') {
        filter.category = { $regex: category, $options: 'i' };
      }
      if (search) {
        filter.$or = [
          { name: { $regex: search, $options: 'i' } },
          { shortDesc: { $regex: search, $options: 'i' } },
          { fullDesc: { $regex: search, $options: 'i' } }
        ];
      }
      const services = await Service.find(filter);
      if (services.length > 0) {
        return res.json({ success: true, count: services.length, data: services });
      }
    }

    let filtered = [...inMemoryServices];
    if (category && category !== 'All') {
      filtered = filtered.filter(s => s.category.toLowerCase().includes(category.toLowerCase()));
    }
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        s => s.name.toLowerCase().includes(q) ||
             s.shortDesc.toLowerCase().includes(q) ||
             s.fullDesc.toLowerCase().includes(q)
      );
    }

    return res.json({ success: true, count: filtered.length, data: filtered });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ success: false, message: 'Server error fetching services' });
  }
};

export const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    if (mongoose.connection.readyState === 1) {
      if (mongoose.Types.ObjectId.isValid(id)) {
        const service = await Service.findById(id);
        if (service) return res.json({ success: true, data: service });
      }
    }
    const found = inMemoryServices.find(s => String(s._id) === String(id) || s.name.toLowerCase().includes(id.toLowerCase()));
    if (!found) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    res.json({ success: true, data: found });
  } catch (error) {
    console.error('Error fetching service by id:', error);
    res.status(500).json({ success: false, message: 'Error retrieving service' });
  }
};
