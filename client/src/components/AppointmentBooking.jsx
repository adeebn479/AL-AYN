import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  X, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Printer, 
  QrCode 
} from 'lucide-react';

export default function AppointmentBooking({ 
  isOpen, 
  onClose, 
  preselectedDoctor, 
  preselectedService, 
  prefilledNotes 
}) {
  const [step, setStep] = useState(1);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successBooking, setSuccessBooking] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    doctorId: '',
    doctorName: '',
    specialty: '',
    appointmentDate: '',
    timeSlot: '',
    patientName: '',
    email: '',
    phone: '',
    age: '',
    gender: 'Male',
    symptoms: '',
    isFirstVisit: true
  });

  // Fetch doctors on mount
  useEffect(() => {
    fetch('/api/doctors')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setDoctors(data.data);
        }
      })
      .catch(err => console.warn('Could not load doctors list', err));
  }, []);

  // Handle preselected items
  useEffect(() => {
    if (preselectedDoctor) {
      setFormData(prev => ({
        ...prev,
        doctorId: preselectedDoctor._id,
        doctorName: preselectedDoctor.name,
        specialty: preselectedDoctor.specialty,
        timeSlot: preselectedDoctor.availableSlots ? preselectedDoctor.availableSlots[0] : '10:00 AM'
      }));
    } else if (preselectedService) {
      setFormData(prev => ({
        ...prev,
        specialty: preselectedService.category,
        symptoms: `Interested in ${preselectedService.name}.`
      }));
    }
    if (prefilledNotes) {
      setFormData(prev => ({
        ...prev,
        symptoms: prev.symptoms ? `${prev.symptoms} | ${prefilledNotes}` : prefilledNotes
      }));
    }
  }, [preselectedDoctor, preselectedService, prefilledNotes]);

  // Set default appointment date to tomorrow if empty
  useEffect(() => {
    if (!formData.appointmentDate) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const yyyy = tomorrow.getFullYear();
      const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
      const dd = String(tomorrow.getDate()).padStart(2, '0');
      setFormData(prev => ({ ...prev, appointmentDate: `${yyyy}-${mm}-${dd}` }));
    }
  }, [formData.appointmentDate]);

  const handleDoctorChange = (docId) => {
    const selected = doctors.find(d => String(d._id) === String(docId));
    if (selected) {
      setFormData(prev => ({
        ...prev,
        doctorId: selected._id,
        doctorName: selected.name,
        specialty: selected.specialty,
        timeSlot: selected.availableSlots && selected.availableSlots.length > 0 ? selected.availableSlots[0] : '09:30 AM'
      }));
    }
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (step === 1) {
      if (!formData.doctorName && doctors.length > 0) {
        // default to first doctor
        setFormData(prev => ({
          ...prev,
          doctorId: doctors[0]._id,
          doctorName: doctors[0].name,
          specialty: doctors[0].specialty,
          timeSlot: doctors[0].availableSlots ? doctors[0].availableSlots[0] : '10:00 AM'
        }));
      }
      setStep(2);
    } else if (step === 2) {
      if (!formData.appointmentDate || !formData.timeSlot) {
        setErrorMsg('Please choose an appointment date and preferred time slot.');
        return;
      }
      setStep(3);
    }
  };

  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.patientName || !formData.phone) {
      setErrorMsg('Please provide your full name and contact phone number.');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success && data.data) {
        setSuccessBooking(data.data);
        setStep(4);
      } else {
        setErrorMsg(data.message || 'Booking submission failed. Please try again.');
      }
    } catch (err) {
      setErrorMsg('Network error connecting to booking server. Please check connection.');
    } finally {
      setLoading(false);
    }
  };

  const currentDoctor = doctors.find(d => String(d._id) === String(formData.doctorId)) || doctors[0];
  const availableSlots = (currentDoctor && currentDoctor.availableSlots) || [
    '09:00 AM', '10:30 AM', '11:45 AM', '02:00 PM', '04:00 PM', '05:30 PM'
  ];

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="booking-modal-dialog glass-panel" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="booking-modal-header">
          <div className="booking-title-wrap">
            <span className="badge badge-cyan">Al Ayn Patient Portal</span>
            <h3>Schedule Specialist Eye Consultation</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {/* Steps Progress Bar */}
        {step < 4 && (
          <div className="booking-stepper">
            <div className={`step-node ${step >= 1 ? 'active' : ''}`}>
              <span className="node-num">1</span>
              <span className="node-label">Select Specialist</span>
            </div>
            <div className="step-line"></div>
            <div className={`step-node ${step >= 2 ? 'active' : ''}`}>
              <span className="node-num">2</span>
              <span className="node-label">Date & Time</span>
            </div>
            <div className="step-line"></div>
            <div className={`step-node ${step >= 3 ? 'active' : ''}`}>
              <span className="node-num">3</span>
              <span className="node-label">Patient Details</span>
            </div>
          </div>
        )}

        {errorMsg && (
          <div className="form-error-banner">
            <AlertCircle size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* STEP 1: SELECT SPECIALIST */}
        {step === 1 && (
          <div className="step-content">
            <h4 className="step-title">Choose Your Consulting Eye Surgeon</h4>
            <div className="doctor-select-grid">
              {doctors.map((doc) => {
                const isSelected = String(formData.doctorId) === String(doc._id) || formData.doctorName === doc.name;
                return (
                  <div
                    key={doc._id}
                    className={`doctor-picker-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleDoctorChange(doc._id)}
                  >
                    <img src={doc.photo || '/images/chief_surgeon.jpg'} alt={doc.name} className="picker-doc-avatar" />
                    <div className="picker-doc-info">
                      <h5>{doc.name}</h5>
                      <span className="picker-spec">{doc.specialty}</span>
                      <span className="picker-exp">{doc.experience} yrs exp • ★ {doc.rating}</span>
                    </div>
                    {isSelected && <CheckCircle size={20} className="check-badge" />}
                  </div>
                );
              })}
            </div>

            <div className="step-actions right">
              <button className="btn btn-primary" onClick={handleNextStep}>
                Continue to Date & Time <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: DATE & TIME */}
        {step === 2 && (
          <div className="step-content">
            <h4 className="step-title">Select Consultation Date & Time Slot</h4>
            
            <div className="selected-doc-summary">
              <strong>Consulting with:</strong> {formData.doctorName || 'Senior Eye Consultant'} ({formData.specialty})
            </div>

            <div className="date-picker-box">
              <label className="form-label">
                <Calendar size={16} /> Preferred Appointment Date:
              </label>
              <input
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={formData.appointmentDate}
                onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
                className="booking-input"
                required
              />
            </div>

            <div className="slot-selection-box">
              <label className="form-label">
                <Clock size={16} /> Available Clinical Slots:
              </label>
              <div className="slots-grid">
                {availableSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    className={`slot-choice-btn ${formData.timeSlot === slot ? 'active' : ''}`}
                    onClick={() => setFormData({ ...formData, timeSlot: slot })}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div className="step-actions between">
              <button className="btn btn-secondary" onClick={() => setStep(1)}>
                <ArrowLeft size={16} /> Back
              </button>
              <button className="btn btn-primary" onClick={handleNextStep}>
                Enter Patient Info <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: PATIENT INFORMATION */}
        {step === 3 && (
          <form className="step-content" onSubmit={handleSubmitBooking}>
            <h4 className="step-title">Patient Contact & Health Information</h4>

            <div className="form-grid-2">
              <div className="form-field">
                <label className="form-label">Patient Full Name *</label>
                <div className="input-wrap">
                  <User size={16} className="input-icon" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rashid Al-Nuaimi"
                    value={formData.patientName}
                    onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                    className="booking-input"
                  />
                </div>
              </div>

              <div className="form-field">
                <label className="form-label">Phone Number (with Country Code) *</label>
                <div className="input-wrap">
                  <Phone size={16} className="input-icon" />
                  <input
                    type="tel"
                    required
                    placeholder="+971 50 123 4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="booking-input"
                  />
                </div>
              </div>

              <div className="form-field">
                <label className="form-label">Email Address (for Confirmation & Reminders)</label>
                <div className="input-wrap">
                  <Mail size={16} className="input-icon" />
                  <input
                    type="email"
                    placeholder="patient@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="booking-input"
                  />
                </div>
              </div>

              <div className="form-field-row-split">
                <div className="form-field">
                  <label className="form-label">Age</label>
                  <input
                    type="number"
                    min="1"
                    max="110"
                    placeholder="30"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="booking-input"
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="booking-input"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-field">
              <label className="form-label">Primary Symptoms / Reason for Visit / Vision Notes</label>
              <textarea
                rows="3"
                placeholder="e.g. Blurry distance vision, considering SMILE laser, dry eyes, or routine dilated checkup..."
                value={formData.symptoms}
                onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                className="booking-textarea"
              />
            </div>

            <div className="first-visit-check">
              <label>
                <input
                  type="checkbox"
                  checked={formData.isFirstVisit}
                  onChange={(e) => setFormData({ ...formData, isFirstVisit: e.target.checked })}
                />
                <span>This is my first time visiting Al Ayn Specialized Eye Hospital</span>
              </label>
            </div>

            <div className="step-actions between">
              <button type="button" className="btn btn-secondary" onClick={() => setStep(2)}>
                <ArrowLeft size={16} /> Back
              </button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Confirming Appointment...' : 'Confirm Appointment Booking'}
              </button>
            </div>
          </form>
        )}

        {/* STEP 4: CONFIRMATION PASS */}
        {step === 4 && successBooking && (
          <div className="booking-pass-container">
            <div className="pass-card glass-panel">
              <div className="pass-header">
                <CheckCircle size={36} className="pass-success-icon" />
                <div>
                  <h3>Appointment Confirmed!</h3>
                  <p>Your ophthalmic consultation has been scheduled successfully.</p>
                </div>
              </div>

              <div className="pass-ref-banner">
                <span className="ref-title">Booking Reference Number:</span>
                <span className="ref-code">{successBooking.bookingReference}</span>
                <span className="ref-note">Please save this code for check-in and tracking</span>
              </div>

              <div className="pass-details-grid">
                <div className="pass-row">
                  <span className="pass-label">Patient Name:</span>
                  <span className="pass-value">{successBooking.patientName}</span>
                </div>
                <div className="pass-row">
                  <span className="pass-label">Consulting Doctor:</span>
                  <span className="pass-value">{successBooking.doctorName}</span>
                </div>
                <div className="pass-row">
                  <span className="pass-label">Department:</span>
                  <span className="pass-value">{successBooking.specialty}</span>
                </div>
                <div className="pass-row">
                  <span className="pass-label">Date & Time:</span>
                  <span className="pass-value highlight">
                    {successBooking.appointmentDate} at {successBooking.timeSlot}
                  </span>
                </div>
                <div className="pass-row">
                  <span className="pass-label">Hospital Location:</span>
                  <span className="pass-value">Outpatient Clinics, Al Jimi, Al Ain, UAE</span>
                </div>
              </div>

              <div className="pass-instructions">
                <strong>Patient Preparation Guide:</strong>
                <ul>
                  <li>Please arrive 15 minutes prior to your slot for optical biometry registration.</li>
                  <li>If pupillary dilation is required, bring sunglasses and arrange transport.</li>
                  <li>Bring previous eyeglass prescriptions or medical records if available.</li>
                </ul>
              </div>

              <div className="pass-actions">
                <button className="btn btn-secondary" onClick={() => window.print()}>
                  <Printer size={16} /> Print Confirmation
                </button>
                <button className="btn btn-primary" onClick={onClose}>
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
