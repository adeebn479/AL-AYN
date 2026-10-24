import React, { useState, useEffect } from 'react';
import { 
  Eye, 
  Sparkles, 
  Clock, 
  CheckCircle, 
  ArrowRight, 
  ShieldCheck, 
  Cpu, 
  Info, 
  X, 
  Calendar 
} from 'lucide-react';

export default function Services({ onSelectServiceForBooking }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/services');
      const data = await res.json();
      if (data.success && data.data) {
        setServices(data.data);
      }
    } catch (err) {
      console.warn('Error fetching services from API, using fallback data:', err);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', 'Refractive Surgery', 'Cataract Care', 'Retina & Vitreous', 'Glaucoma Care', 'Pediatric Ophthalmology', 'Cornea Care'];

  const filteredServices = activeCategory === 'All'
    ? services
    : services.filter(s => s.category.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <section className="section-padding services-section" id="services">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <Sparkles size={14} /> Surgical Specialties & Ophthalmic Centers
          </span>
          <h2>World-Class Eye Care & Advanced Laser Procedures</h2>
          <p>
            Equipped with the most sophisticated ophthalmic technology in the Middle East, 
            our specialized institutes treat everything from simple refractive errors to the most complex vitreoretinal disorders.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="category-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`cat-pill ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {filteredServices.map((service) => (
            <div key={service._id || service.name} className="service-card glass-panel">
              <div className="service-card-media">
                <img 
                  src={service.image || '/images/laser_surgery.jpg'} 
                  alt={service.name} 
                  className="service-card-img"
                />
                <span className="service-category-badge">{service.category}</span>
                {service.startingPrice && (
                  <span className="service-price-tag">From {service.startingPrice}</span>
                )}
              </div>

              <div className="service-card-body">
                <h3 className="service-name">{service.name}</h3>
                <p className="service-tagline">{service.tagline}</p>
                <p className="service-short-desc">{service.shortDesc}</p>

                <div className="service-metrics">
                  <div className="metric-chip">
                    <Clock size={13} />
                    <span>Duration: {service.duration}</span>
                  </div>
                  <div className="metric-chip">
                    <ShieldCheck size={13} />
                    <span>Recovery: {service.recoveryTime}</span>
                  </div>
                </div>

                <div className="service-tech-chip">
                  <Cpu size={14} />
                  <span>Tech: {service.technology || 'Advanced Ophthalmic Platform'}</span>
                </div>

                <div className="service-card-actions">
                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={() => setSelectedService(service)}
                  >
                    <Info size={14} /> Clinical Details
                  </button>
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={() => onSelectServiceForBooking(service)}
                  >
                    <Calendar size={14} /> Book Treatment
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Clinical Details Modal */}
      {selectedService && (
        <div className="modal-backdrop" onClick={() => setSelectedService(null)}>
          <div className="modal-dialog glass-panel" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="badge badge-cyan">{selectedService.category}</span>
                <h3 className="modal-title">{selectedService.name}</h3>
              </div>
              <button 
                className="modal-close-btn" 
                onClick={() => setSelectedService(null)}
                aria-label="Close dialog"
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div className="modal-hero-image">
                <img 
                  src={selectedService.image || '/images/laser_surgery.jpg'} 
                  alt={selectedService.name} 
                />
              </div>

              <div className="modal-section">
                <h4>Procedure Overview</h4>
                <p>{selectedService.fullDesc}</p>
              </div>

              {selectedService.benefits && selectedService.benefits.length > 0 && (
                <div className="modal-section">
                  <h4>Clinical Benefits</h4>
                  <ul className="benefits-list">
                    {selectedService.benefits.map((benefit, i) => (
                      <li key={i}>
                        <CheckCircle size={16} className="benefit-check" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedService.idealFor && selectedService.idealFor.length > 0 && (
                <div className="modal-section">
                  <h4>Ideal Candidates</h4>
                  <div className="tags-container">
                    {selectedService.idealFor.map((c, i) => (
                      <span key={i} className="candidate-tag">{c}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="modal-meta-grid">
                <div className="meta-item">
                  <span className="meta-label">Equipment:</span>
                  <span className="meta-val">{selectedService.technology}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Procedure Time:</span>
                  <span className="meta-val">{selectedService.duration}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Downtime:</span>
                  <span className="meta-val">{selectedService.recoveryTime}</span>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="btn btn-secondary" 
                onClick={() => setSelectedService(null)}
              >
                Close
              </button>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  const s = selectedService;
                  setSelectedService(null);
                  onSelectServiceForBooking(s);
                }}
              >
                <Calendar size={16} /> Book Consultation for this Treatment
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
