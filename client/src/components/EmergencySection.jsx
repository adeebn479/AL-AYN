import React, { useState } from 'react';
import { 
  AlertTriangle, 
  PhoneCall, 
  Clock, 
  MapPin, 
  Send, 
  ShieldAlert, 
  CheckCircle, 
  Droplet 
} from 'lucide-react';

export default function EmergencySection() {
  const [inquiry, setInquiry] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
    urgency: 'Routine'
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inquiry.name || !inquiry.email || !inquiry.message) return;

    try {
      setSubmitting(true);
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiry)
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setInquiry({
          name: '',
          email: '',
          phone: '',
          subject: 'General Inquiry',
          message: '',
          urgency: 'Routine'
        });
      }
    } catch (e) {
      alert('Could not submit inquiry');
    } finally {
      setSubmitting(false);
    }
  };

  const emergencies = [
    {
      title: "Sudden Loss of Sight",
      symptom: "Painless or painful sudden darkening or curtain falling across vision.",
      action: "Requires urgent retinal or vascular evaluation within 60 to 90 minutes."
    },
    {
      title: "Chemical Eye Splash",
      symptom: "Household chemicals, detergents, or industrial solvents in eye.",
      action: "Flush immediately with clean water for 15 straight minutes; proceed directly to triage."
    },
    {
      title: "Severe Pain & Halos",
      symptom: "Intense ocular ache, vomiting, dilated fixed pupil, colorful rainbow halos.",
      action: "Possible acute angle closure glaucoma; needs immediate pressure lowering."
    },
    {
      title: "Foreign Body or Trauma",
      symptom: "High-speed metal shards, sports impact, or lacerations.",
      action: "Do not rub eye, do not remove object; protect eye with clean shield and come in."
    }
  ];

  return (
    <section className="section-padding emergency-section" id="emergency">
      <div className="container">
        {/* Red Flag Warning Box */}
        <div className="emergency-hero-banner glass-panel-dark">
          <div className="emergency-hero-left">
            <span className="emergency-kicker">
              <span className="emergency-blink-dot animate-pulse-slow"></span>
              Emergency Eye Trauma Center • Open 24 Hours / 365 Days
            </span>
            <h2>Experiencing an Eye Emergency?</h2>
            <p>
              Ophthalmic emergencies require immediate specialized intervention to prevent 
              irreversible optic nerve or retinal damage. Our trauma surgical team is on-site 24/7.
            </p>
            <div className="emergency-contact-box">
              <a href="tel:+97137008000" className="btn btn-accent btn-lg">
                <PhoneCall size={20} />
                <span>Call Emergency Unit: +971 3 700 8000</span>
              </a>
              <span className="location-callout">
                <MapPin size={16} /> Al Jimi District, Al Ain (Direct Emergency Ambulance Ramp)
              </span>
            </div>
          </div>

          <div className="emergency-protocols">
            <h4>Common Ocular Emergencies</h4>
            <div className="protocols-list">
              {emergencies.map((em, i) => (
                <div key={i} className="protocol-item">
                  <div className="protocol-icon-col">
                    <AlertTriangle size={18} className="warn-icon" />
                  </div>
                  <div>
                    <strong>{em.title}</strong>
                    <p className="p-sym">{em.symptom}</p>
                    <span className="p-act">{em.action}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact & Inquiries Form */}
        <div className="contact-grid">
          <div className="contact-info-card glass-panel">
            <h3>Get in Touch With Al Ayn Eye Hospital</h3>
            <p>
              Have a non-emergency clinical question, insurance coverage inquiry, or international patient query? 
              Our clinical care coordinators are here to assist you.
            </p>

            <div className="contact-details-list">
              <div className="detail-item">
                <PhoneCall size={18} />
                <div>
                  <strong>Direct Outpatient Line:</strong>
                  <p>+971 3 700 8100</p>
                </div>
              </div>
              <div className="detail-item">
                <Clock size={18} />
                <div>
                  <strong>Outpatient Clinics Operating Hours:</strong>
                  <p>Saturday – Thursday: 08:00 AM – 09:00 PM</p>
                  <p>Friday: 02:00 PM – 09:00 PM (Emergency 24/7)</p>
                </div>
              </div>
              <div className="detail-item">
                <MapPin size={18} />
                <div>
                  <strong>Hospital Campus Location:</strong>
                  <p>Sheikh Zayed Bin Sultan St, Al Jimi, Al Ain, Abu Dhabi, UAE</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-card glass-panel">
            <h3>Send a Clinical Message or Inquiry</h3>
            {submitted ? (
              <div className="contact-success-state">
                <CheckCircle size={40} className="success-icon" />
                <h4>Message Received!</h4>
                <p>
                  Thank you for reaching out to Al Ayn Eye Hospital. Our patient relations desk will contact you within 24 hours.
                </p>
                <button className="btn btn-secondary btn-sm" onClick={() => setSubmitted(false)}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="inquiry-form">
                <div className="form-field">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sultan Al-Ketbi"
                    value={inquiry.name}
                    onChange={(e) => setInquiry({ ...inquiry, name: e.target.value })}
                    className="booking-input"
                  />
                </div>

                <div className="form-grid-2">
                  <div className="form-field">
                    <label className="form-label">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="sultan@example.com"
                      value={inquiry.email}
                      onChange={(e) => setInquiry({ ...inquiry, email: e.target.value })}
                      className="booking-input"
                    />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+971 50 000 0000"
                      value={inquiry.phone}
                      onChange={(e) => setInquiry({ ...inquiry, phone: e.target.value })}
                      className="booking-input"
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-field">
                    <label className="form-label">Subject</label>
                    <select
                      value={inquiry.subject}
                      onChange={(e) => setInquiry({ ...inquiry, subject: e.target.value })}
                      className="booking-input"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Laser Vision Correction / SMILE">Laser Vision Correction / SMILE</option>
                      <option value="Cataract Surgery & Premium Lenses">Cataract Surgery & Premium Lenses</option>
                      <option value="Insurance Coverage Verification">Insurance Coverage Verification</option>
                      <option value="International Medical Tourism">International Medical Tourism</option>
                    </select>
                  </div>
                  <div className="form-field">
                    <label className="form-label">Urgency Level</label>
                    <select
                      value={inquiry.urgency}
                      onChange={(e) => setInquiry({ ...inquiry, urgency: e.target.value })}
                      className="booking-input"
                    >
                      <option value="Routine">Routine</option>
                      <option value="Within 24 Hours">Within 24 Hours</option>
                      <option value="Emergency">Urgent Clinical Concern</option>
                    </select>
                  </div>
                </div>

                <div className="form-field">
                  <label className="form-label">Inquiry Message *</label>
                  <textarea
                    rows="3"
                    required
                    placeholder="Describe your inquiry, insurance provider, or symptoms..."
                    value={inquiry.message}
                    onChange={(e) => setInquiry({ ...inquiry, message: e.target.value })}
                    className="booking-textarea"
                  />
                </div>

                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  <Send size={16} />
                  <span>{submitting ? 'Sending Message...' : 'Submit Inquiry'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
