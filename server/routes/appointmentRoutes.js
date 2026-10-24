import express from 'express';
import {
  createAppointment,
  getAppointments,
  getAppointmentByReference,
  updateAppointmentStatus,
  deleteAppointment
} from '../controllers/appointmentController.js';

const router = express.Router();

router.post('/', createAppointment);
router.get('/', getAppointments);
router.get('/lookup/:reference', getAppointmentByReference);
router.patch('/:id', updateAppointmentStatus);
router.delete('/:id', deleteAppointment);

export default router;
