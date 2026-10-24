import React, { useState, useEffect } from 'react';
import { 
  Award, 
  Star, 
  Calendar, 
  GraduationCap, 
  Clock, 
  Globe, 
  Search, 
  CheckCircle, 
  X, 
  Info 
} from 'lucide-react';

export default function DoctorsDirectory({ onSelectDoctorForBooking }) {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDoctorModal, setActiveDoctorModal] = useState(null);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/doctors');
      const data = await res.json();
      if (data.success && data.data) {
        setDoctors(data.data);
      }
    } catch (err) {
      console.warn('Error fetching doctors from API, using fallback data:', err);
    } finally {
      setLoading(false);
    }
  };

  const specialties = [
    'All',
    'Cataract & Refractive',
    'Vitreoretinal',
    'Glaucoma',
    'Pediatric',
    'Oculoplastics'
  ];

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSpec =
      selectedSpecialty === 'All' ||
      doc.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase());
    const matchesQuery =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (doc.department && doc.department.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSpec && matchesQuery;
  });

  return (
    <section className="section-padding doctors-section" id="doctors">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <Award size={14} /> Medical Leadership & Faculty
          </span>
          <h2>Distinguished Eye Surgeons & Subspecialists</h2>
          <p>
            Our fellowship-trained consultant ophthalmologists hold prestigious international 
            credentials from Moorfields, Johns Hopkins, Harvard, and the Royal College of Ophthalmologists.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="doctors-filter-row">
          <div className="specialty-pills">
            {specialties.map((spec) => (
              <button
                key={spec}
                className={`spec-pill ${selectedSpecialty === spec ? 'active' : ''}`}
                onClick={() => setSelectedSpecialty(spec)}
              >
                {spec}
              </button>
            ))}
          </div>

          <div className="doctor-search-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search by doctor name or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="doctor-search-input"
            />
            {searchQuery && (
              <button 
                className="clear-search-btn"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="doctors-grid">
          {filteredDoctors.map((doc) => (
            <div key={doc._id || doc.name} className="doctor-card glass-panel">
              <div className="doctor-card-media">
                <img 
                  src={doc.photo || '/images/chief_surgeon.jpg'} 
                  alt={doc.name} 
                  className="doctor-card-img"
                />
                {doc.isFeatured && (
                  <span className="featured-badge">
                    <Star size={12} fill="#ffffff" /> Featured Surgeon
                  </span>
                )}
                <div className="doctor-rating-tag">
                  <Star size={14} className="star-icon" fill="#f59e0b" />
                  <span>{doc.rating}</span>
                  <span className="reviews-count">({doc.reviewsCount} reviews)</span>
                </div>
              </div>

              <div className="doctor-card-content">
                <span className="doctor-dept-pill">{doc.specialty}</span>
                <h3 className="doctor-name">{doc.name}</h3>
                <p className="doctor-title">{doc.title}</p>

                <div className="doctor-highlights">
                  <div className="highlight-row">
                    <GraduationCap size={15} />
                    <span>{doc.degrees ? doc.degrees.slice(0, 2).join(' • ') : 'MD / FRCOphth'}</span>
                  </div>
                  <div className="highlight-row">
                    <Award size={15} />
                    <span>{doc.experience} Years of Microsurgical Excellence</span>
                  </div>
                  <div className="highlight-row">
                    <Globe size={15} />
                    <span>Languages: {doc.languages ? doc.languages.join(', ') : 'English, Arabic'}</span>
                  </div>
                </div>

                <div className="available-days-box">
                  <Clock size={13} />
                  <span>Clinic Days: {doc.availableDays ? doc.availableDays.join(', ') : 'Mon - Sat'}</span>
                </div>

                <div className="doctor-card-footer">
                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={() => setActiveDoctorModal(doc)}
                  >
                    <Info size={14} /> View Bio
                  </button>
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={() => onSelectDoctorForBooking(doc)}
                  >
                    <Calendar size={14} /> Book with Dr. {doc.name.split(' ').slice(-1)[0]}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Doctor Bio Modal */}
      {activeDoctorModal && (
        <div className="modal-backdrop" onClick={() => setActiveDoctorModal(null)}>
          <div className="modal-dialog glass-panel" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="badge badge-cyan">{activeDoctorModal.specialty}</span>
                <h3 className="modal-title">{activeDoctorModal.name}</h3>
                <p className="modal-subtitle">{activeDoctorModal.title}</p>
              </div>
              <button 
                className="modal-close-btn" 
                onClick={() => setActiveDoctorModal(null)}
                aria-label="Close dialog"
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div className="doctor-modal-top">
                <img 
                  src={activeDoctorModal.photo || '/images/chief_surgeon.jpg'} 
                  alt={activeDoctorModal.name} 
                  className="doctor-modal-img"
                />
                <div className="doctor-modal-stats">
                  <div className="doc-stat">
                    <strong>{activeDoctorModal.experience}+</strong>
                    <span>Years Experience</span>
                  </div>
                  <div className="doc-stat">
                    <strong>{activeDoctorModal.rating} ★</strong>
                    <span>Patient Rating</span>
                  </div>
                  <div className="doc-stat">
                    <strong>${activeDoctorModal.consultationFee || 100}</strong>
                    <span>Consultation Fee</span>
                  </div>
                </div>
              </div>

              <div className="modal-section">
                <h4>Biography & Clinical Expertise</h4>
                <p>{activeDoctorModal.bio}</p>
              </div>

              <div className="modal-section">
                <h4>Degrees, Fellowships & Honors</h4>
                <div className="degrees-list">
                  {activeDoctorModal.degrees && activeDoctorModal.degrees.map((deg, i) => (
                    <span key={i} className="degree-tag">
                      <GraduationCap size={14} /> {deg}
                    </span>
                  ))}
                </div>
              </div>

              <div className="modal-section">
                <h4>Available Consultation Slots</h4>
                <div className="slots-chip-group">
                  {activeDoctorModal.availableSlots && activeDoctorModal.availableSlots.map((slot, i) => (
                    <span key={i} className="slot-chip">{slot}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="btn btn-secondary" 
                onClick={() => setActiveDoctorModal(null)}
              >
                Close
              </button>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  const doc = activeDoctorModal;
                  setActiveDoctorModal(null);
                  onSelectDoctorForBooking(doc);
                }}
              >
                <Calendar size={16} /> Schedule Appointment Now
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
