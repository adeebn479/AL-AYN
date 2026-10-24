import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import VisionLab from './components/VisionLab';
import DoctorsDirectory from './components/DoctorsDirectory';
import TechnologySection from './components/TechnologySection';
import PatientReviews from './components/PatientReviews';
import EmergencySection from './components/EmergencySection';
import AppointmentBooking from './components/AppointmentBooking';
import TrackAppointment from './components/TrackAppointment';
import AdminPortal from './components/AdminPortal';
import Footer from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('overview');
  const [isAdminView, setIsAdminView] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isTrackOpen, setIsTrackOpen] = useState(false);

  // Pre-selection states for booking
  const [preselectedDoctor, setPreselectedDoctor] = useState(null);
  const [preselectedService, setPreselectedService] = useState(null);
  const [prefilledNotes, setPrefilledNotes] = useState('');

  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    if (sectionId === 'admin') {
      setIsAdminView(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (isAdminView) {
      setIsAdminView(false);
    }

    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 50);
  };

  const handleOpenBooking = () => {
    setPreselectedDoctor(null);
    setPreselectedService(null);
    setPrefilledNotes('');
    setIsBookingOpen(true);
  };

  const handleSelectDoctorForBooking = (doc) => {
    setPreselectedDoctor(doc);
    setPreselectedService(null);
    setPrefilledNotes('');
    setIsBookingOpen(true);
  };

  const handleSelectServiceForBooking = (service) => {
    setPreselectedService(service);
    setPreselectedDoctor(null);
    setPrefilledNotes('');
    setIsBookingOpen(true);
  };

  const handleBookWithFindings = (summaryString) => {
    setPreselectedDoctor(null);
    setPreselectedService(null);
    setPrefilledNotes(summaryString);
    setIsBookingOpen(true);
  };

  return (
    <div className="app-root">
      <Navbar
        onNavigate={handleNavigate}
        activeSection={isAdminView ? 'admin' : activeSection}
        onOpenBooking={handleOpenBooking}
        onOpenTrack={() => setIsTrackOpen(true)}
      />

      <main className="main-content">
        {isAdminView ? (
          <AdminPortal onBackToHome={() => setIsAdminView(false)} />
        ) : (
          <>
            <Hero 
              onOpenBooking={handleOpenBooking} 
              onNavigate={handleNavigate} 
            />
            <Services 
              onSelectServiceForBooking={handleSelectServiceForBooking} 
            />
            <VisionLab 
              onBookWithFindings={handleBookWithFindings} 
            />
            <DoctorsDirectory 
              onSelectDoctorForBooking={handleSelectDoctorForBooking} 
            />
            <TechnologySection />
            <PatientReviews />
            <EmergencySection />
          </>
        )}
      </main>

      <Footer
        onNavigate={handleNavigate}
        onOpenBooking={handleOpenBooking}
        onOpenTrack={() => setIsTrackOpen(true)}
      />

      {/* Appointment Booking Modal */}
      <AppointmentBooking
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedDoctor={preselectedDoctor}
        preselectedService={preselectedService}
        prefilledNotes={prefilledNotes}
      />

      {/* Track & Lookup Appointment Modal */}
      <TrackAppointment
        isOpen={isTrackOpen}
        onClose={() => setIsTrackOpen(false)}
      />
    </div>
  );
}
