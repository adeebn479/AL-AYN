import React from 'react';
import { Eye, PhoneCall, Mail, MapPin, ShieldCheck, Heart } from 'lucide-react';

export default function Footer({ onNavigate, onOpenBooking, onOpenTrack }) {
  return (
    <footer className="footer-root">
      <div className="container footer-container">
        <div className="footer-brand-col">
          <div className="footer-brand">
            <div className="footer-logo-icon">
              <Eye size={24} />
            </div>
            <div>
              <h3>AL AYN EYE HOSPITAL</h3>
              <span className="footer-arabic">مستشفى العين التخصصي للعيون</span>
            </div>
          </div>
          <p className="footer-desc">
            A tertiary ophthalmic center of excellence delivering sub-micron precision 
            eye surgeries, blade-free refractive laser corrections, and compassionate care 
            to patients across the United Arab Emirates and the region.
          </p>
          <div className="footer-certifications">
            <span className="cert-pill">
              <ShieldCheck size={14} /> JCI Accredited
            </span>
            <span className="cert-pill">
              <ShieldCheck size={14} /> DoH Abu Dhabi Licensed
            </span>
            <span className="cert-pill">
              <ShieldCheck size={14} /> ISO 9001:2026 Certified
            </span>
          </div>
        </div>

        <div className="footer-links-col">
          <h4>Surgical Institutes</h4>
          <ul>
            <li><button onClick={() => onNavigate('services')}>Femto-LASIK & SMILE Pro</button></li>
            <li><button onClick={() => onNavigate('services')}>Micro-Incision Cataract (MICS)</button></li>
            <li><button onClick={() => onNavigate('services')}>Vitreoretinal & Macular Clinic</button></li>
            <li><button onClick={() => onNavigate('services')}>Glaucoma Laser & Shunts</button></li>
            <li><button onClick={() => onNavigate('services')}>Pediatric & Squint Center</button></li>
            <li><button onClick={() => onNavigate('services')}>Cornea Transplants & Keratoconus</button></li>
          </ul>
        </div>

        <div className="footer-links-col">
          <h4>Patient Services</h4>
          <ul>
            <li><button onClick={onOpenBooking}>Book Specialist Consultation</button></li>
            <li><button onClick={onOpenTrack}>Track Existing Appointment</button></li>
            <li><button onClick={() => onNavigate('vision-lab')}>Interactive Online Vision Lab</button></li>
            <li><button onClick={() => onNavigate('doctors')}>Meet Our Eye Surgeons</button></li>
            <li><button onClick={() => onNavigate('reviews')}>Patient Stories & Outcomes</button></li>
            <li><button onClick={() => onNavigate('emergency')}>24/7 Eye Trauma Protocol</button></li>
            <li><button onClick={() => onNavigate('admin')}>Staff & Clinician Portal</button></li>
          </ul>
        </div>

        <div className="footer-contact-col">
          <h4>Hospital Campus</h4>
          <ul className="footer-contact-list">
            <li>
              <MapPin size={16} />
              <span>Sheikh Zayed Bin Sultan St, Al Jimi District, Al Ain, Abu Dhabi, UAE</span>
            </li>
            <li>
              <PhoneCall size={16} />
              <span>Emergency 24/7: +971 3 700 8000</span>
            </li>
            <li>
              <PhoneCall size={16} />
              <span>Appointments: +971 3 700 8100</span>
            </li>
            <li>
              <Mail size={16} />
              <span>care@alayn-eyehospital.ae</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <div className="container bottom-content">
          <p>© {new Date().getFullYear()} Al Ayn Specialized Eye Hospital. All rights reserved. MERN Stack Application.</p>
          <div className="bottom-links">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Patient Rights Charter</span>
            <span>•</span>
            <span>Quality & Clinical Safety</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
