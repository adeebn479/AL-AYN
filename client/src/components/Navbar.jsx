import React, { useState, useEffect } from 'react';
import { 
  Eye, 
  PhoneCall, 
  Calendar, 
  Clock, 
  MapPin, 
  Menu, 
  X, 
  ShieldCheck, 
  Search,
  Activity,
  UserCheck
} from 'lucide-react';

export default function Navbar({ onNavigate, activeSection, onOpenBooking, onOpenTrack }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'overview', label: 'Home' },
    { id: 'services', label: 'Treatments & Laser' },
    { id: 'vision-lab', label: 'Vision Lab', badge: 'Interactive' },
    { id: 'doctors', label: 'Surgeons' },
    { id: 'technology', label: 'Technology' },
    { id: 'reviews', label: 'Patient Stories' },
    { id: 'emergency', label: 'Emergency 24/7' },
  ];

  const handleNavClick = (id) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar-wrapper">
      {/* Top Emergency & Info Ticker */}
      <div className="top-bar">
        <div className="container top-bar-container">
          <div className="top-info-left">
            <span className="emergency-pill">
              <span className="emergency-dot animate-pulse-slow"></span>
              24/7 Eye Trauma & Emergency
            </span>
            <a href="tel:+97137008000" className="top-phone">
              <PhoneCall size={14} /> +971 3 700 8000
            </a>
            <span className="top-divider">|</span>
            <span className="top-address">
              <MapPin size={14} /> Al Jimi District, Al Ain, Abu Dhabi, UAE
            </span>
          </div>
          <div className="top-info-right">
            <span className="accreditation-pill">
              <ShieldCheck size={14} /> JCI Gold Seal Accredited
            </span>
            <button 
              className="track-link-btn"
              onClick={onOpenTrack}
              title="Look up your booking by Reference Number"
            >
              <Search size={13} /> Track Appointment
            </button>
            <button 
              className="admin-link-btn"
              onClick={() => handleNavClick('admin')}
              title="Doctor & Clinical Portal"
            >
              <UserCheck size={13} /> Staff Portal
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className={`main-navbar ${isScrolled ? 'nav-scrolled' : ''}`}>
        <div className="container nav-content">
          {/* Logo / Brand */}
          <div className="brand" onClick={() => handleNavClick('overview')}>
            <div className="brand-logo-icon">
              <Eye size={28} className="eye-iris" />
              <div className="lens-ring"></div>
            </div>
            <div className="brand-text">
              <span className="brand-title">AL AYN</span>
              <span className="brand-subtitle">Specialized Eye Hospital</span>
              <span className="brand-arabic">مستشفى العين التخصصي للعيون</span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <ul className="nav-items desktop-only">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                  onClick={() => handleNavClick(link.id)}
                >
                  {link.label}
                  {link.badge && <span className="nav-item-badge">{link.badge}</span>}
                </button>
              </li>
            ))}
          </ul>

          {/* CTA Actions */}
          <div className="nav-actions desktop-only">
            <button className="btn btn-primary" onClick={onOpenBooking}>
              <Calendar size={16} />
              <span>Book Eye Exam</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu glass-panel">
            <ul className="mobile-nav-list">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    className={`mobile-nav-link ${activeSection === link.id ? 'active' : ''}`}
                    onClick={() => handleNavClick(link.id)}
                  >
                    <span>{link.label}</span>
                    {link.badge && <span className="nav-item-badge">{link.badge}</span>}
                  </button>
                </li>
              ))}
              <li className="mobile-nav-divider"></li>
              <li>
                <button
                  className="mobile-nav-link"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenTrack();
                  }}
                >
                  <Search size={16} /> Track Appointment
                </button>
              </li>
              <li>
                <button
                  className="mobile-nav-link"
                  onClick={() => {
                    handleNavClick('admin');
                  }}
                >
                  <UserCheck size={16} /> Staff & Doctor Portal
                </button>
              </li>
            </ul>
            <div className="mobile-cta-container">
              <button
                className="btn btn-primary btn-full"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
              >
                <Calendar size={18} /> Book Eye Consultation
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
