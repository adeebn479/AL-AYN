import React from 'react';
import { 
  Eye, 
  Calendar, 
  Sparkles, 
  Award, 
  ShieldCheck, 
  ArrowRight, 
  Activity, 
  CheckCircle2,
  Clock
} from 'lucide-react';

export default function Hero({ onOpenBooking, onNavigate }) {
  return (
    <section className="hero-section" id="overview">
      <div className="hero-bg-media">
        <img 
          src="/images/hospital_facade.jpg" 
          alt="Al Ayn Specialized Eye Hospital Exterior" 
          className="hero-img"
        />
        <div className="hero-gradient-overlay"></div>
      </div>

      <div className="container hero-container">
        <div className="hero-content">
          {/* Badge */}
          <div className="hero-badge animate-fade-in">
            <span className="hero-badge-dot"></span>
            <span className="hero-badge-text">Centre of Excellence in Ophthalmic Surgery & Laser Care</span>
            <ShieldCheck size={16} className="hero-badge-icon" />
          </div>

          {/* Heading */}
          <h1 className="hero-title">
            Precision Vision Care. <br />
            <span className="highlight-text">Clearer Tomorrow.</span>
          </h1>

          <p className="hero-description">
            Al Ayn Specialized Eye Hospital combines world-renowned ophthalmic surgeons 
            with cutting-edge Carl Zeiss & Alcon diagnostic suites. From blade-free SMILE Pro 
            laser vision correction to micro-incision cataract and vitreoretinal surgery, 
            experience international gold-standard healthcare.
          </p>

          {/* CTA Buttons */}
          <div className="hero-actions">
            <button className="btn btn-primary btn-lg" onClick={onOpenBooking}>
              <Calendar size={18} />
              <span>Schedule Eye Exam</span>
            </button>
            <button 
              className="btn btn-outline-white btn-lg" 
              onClick={() => onNavigate('vision-lab')}
            >
              <Eye size={18} />
              <span>Try Online Vision Lab</span>
            </button>
          </div>

          {/* Trust Highlights */}
          <div className="hero-trust-list">
            <div className="trust-item">
              <CheckCircle2 size={16} className="trust-icon" />
              <span>100% Blade-Free Laser</span>
            </div>
            <div className="trust-item">
              <CheckCircle2 size={16} className="trust-icon" />
              <span>JCI Gold Seal Quality</span>
            </div>
            <div className="trust-item">
              <CheckCircle2 size={16} className="trust-icon" />
              <span>24/7 Eye Trauma Emergency</span>
            </div>
          </div>
        </div>

        {/* Floating Quick Stats Card */}
        <div className="hero-card glass-panel-dark">
          <div className="hero-card-header">
            <div className="live-status-indicator">
              <span className="live-dot animate-pulse-slow"></span>
              <span>Hospital Live Status: Fully Operational</span>
            </div>
            <span className="card-badge">Al Ain, UAE</span>
          </div>

          <div className="hero-stats-grid">
            <div className="stat-box">
              <span className="stat-number">35,000+</span>
              <span className="stat-label">Successful Eye Surgeries</span>
            </div>
            <div className="stat-box">
              <span className="stat-number">99.8%</span>
              <span className="stat-label">Patient Satisfaction Rate</span>
            </div>
            <div className="stat-box">
              <span className="stat-number">18+</span>
              <span className="stat-label">Subspecialist Surgeons</span>
            </div>
            <div className="stat-box">
              <span className="stat-number">10 min</span>
              <span className="stat-label">Average SMILE Laser Time</span>
            </div>
          </div>

          <div className="hero-card-footer">
            <div className="emergency-callout">
              <Activity size={20} className="emergency-icon" />
              <div>
                <strong>Sudden vision change or eye trauma?</strong>
                <p>Walk straight into our emergency triage or call hotline.</p>
              </div>
            </div>
            <button 
              className="btn btn-sm btn-accent" 
              onClick={() => onNavigate('emergency')}
            >
              Emergency Info <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
