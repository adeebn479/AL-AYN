import React, { useState } from 'react';
import { 
  Search, 
  Calendar, 
  Clock, 
  User, 
  CheckCircle, 
  AlertCircle, 
  X, 
  Trash2, 
  FileText, 
  ShieldCheck 
} from 'lucide-react';

export default function TrackAppointment({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [appointment, setAppointment] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [actionNotice, setActionNotice] = useState('');

  const handleLookup = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setActionNotice('');
    if (!query.trim()) {
      setErrorMsg('Please enter your Reference ID (e.g. AYN-2026-9041) or phone number.');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`/api/appointments/lookup/${encodeURIComponent(query.trim())}`);
      const data = await res.json();
      if (data.success && data.data) {
        setAppointment(data.data);
      } else {
        setAppointment(null);
        setErrorMsg(data.message || 'No appointment found with this reference number.');
      }
    } catch (err) {
      setErrorMsg('Error retrieving appointment record.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!appointment) return;
    if (!window.confirm('Are you sure you want to cancel this appointment?')) return;

    try {
      setLoading(true);
      const res = await fetch(`/api/appointments/${appointment._id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        setActionNotice('Your appointment has been cancelled successfully.');
        setAppointment(null);
      } else {
        setErrorMsg('Failed to cancel appointment.');
      }
    } catch (err) {
      setErrorMsg('Network error while cancelling appointment.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="track-modal-dialog glass-panel" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="badge badge-cyan">Patient Self-Service</span>
            <h3 className="modal-title">Track or Manage Your Appointment</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <form className="track-search-form" onSubmit={handleLookup}>
            <div className="input-wrap">
              <Search size={18} className="input-icon" />
              <input
                type="text"
                placeholder="Enter Booking Ref (e.g. AYN-2026-9041) or Phone..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="booking-input"
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Searching...' : 'Find Appointment'}
            </button>
          </form>

          {errorMsg && (
            <div className="form-error-banner">
              <AlertCircle size={16} />
              <span>{errorMsg}</span>
            </div>
          )}

          {actionNotice && (
            <div className="form-success-banner">
              <CheckCircle size={16} />
              <span>{actionNotice}</span>
            </div>
          )}

          {appointment && (
            <div className="track-result-card glass-panel">
              <div className="track-header-row">
                <span className="track-ref-chip">{appointment.bookingReference}</span>
                <span className={`status-pill status-${appointment.status.toLowerCase()}`}>
                  {appointment.status}
                </span>
              </div>

              <div className="track-grid">
                <div className="track-col">
                  <span className="t-label">Patient Name</span>
                  <strong className="t-val">{appointment.patientName}</strong>
                </div>
                <div className="track-col">
                  <span className="t-label">Eye Surgeon</span>
                  <strong className="t-val">{appointment.doctorName}</strong>
                </div>
                <div className="track-col">
                  <span className="t-label">Specialty</span>
                  <strong className="t-val">{appointment.specialty}</strong>
                </div>
                <div className="track-col">
                  <span className="t-label">Scheduled Time</span>
                  <strong className="t-val highlight">
                    {appointment.appointmentDate} at {appointment.timeSlot}
                  </strong>
                </div>
              </div>

              {appointment.symptoms && (
                <div className="track-notes-box">
                  <span className="t-label">Chief Complaint / Symptoms:</span>
                  <p>{appointment.symptoms}</p>
                </div>
              )}

              {appointment.doctorNotes && (
                <div className="track-notes-box doctor-note">
                  <span className="t-label">Doctor's Clinical Notes:</span>
                  <p>{appointment.doctorNotes}</p>
                </div>
              )}

              <div className="track-card-footer">
                <button 
                  className="btn btn-secondary btn-sm danger" 
                  onClick={handleCancel}
                  disabled={loading}
                >
                  <Trash2 size={14} /> Cancel Appointment
                </button>
                <button className="btn btn-primary btn-sm" onClick={onClose}>
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
