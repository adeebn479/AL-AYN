import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, CheckCircle, ShieldCheck, Plus, X } from 'lucide-react';

export default function PatientReviews() {
  const [reviews, setReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [newReview, setNewReview] = useState({
    patientName: '',
    location: 'Al Ain, UAE',
    treatment: 'SMILE Pro Laser Vision Correction',
    doctorName: 'Dr. Tariq Al-Mansoor',
    rating: 5,
    comment: ''
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/reviews');
      const data = await res.json();
      if (data.success && data.data) {
        setReviews(data.data);
      }
    } catch (e) {
      console.warn('Reviews API load error:', e);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.patientName || !newReview.comment) {
      alert('Please fill in your name and review comments.');
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview)
      });
      const data = await res.json();
      if (data.success && data.data) {
        setReviews(prev => [data.data, ...prev]);
        setIsModalOpen(false);
        setNewReview({
          patientName: '',
          location: 'Al Ain, UAE',
          treatment: 'SMILE Pro Laser Vision Correction',
          doctorName: 'Dr. Tariq Al-Mansoor',
          rating: 5,
          comment: ''
        });
      }
    } catch (err) {
      alert('Failed to post review');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section-padding reviews-section" id="reviews">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">
            <Star size={14} /> Patient Outcomes & Testimonials
          </span>
          <h2>Transforming Lives Through Restored Sight</h2>
          <p>
            Read authentic reviews from thousands of patients who regained crystal-clear 
            20/20 vision and optical freedom at Al Ayn Specialized Eye Hospital.
          </p>
          <div className="share-review-btn-wrap">
            <button className="btn btn-secondary btn-sm" onClick={() => setIsModalOpen(true)}>
              <Plus size={14} /> Share Your Experience
            </button>
          </div>
        </div>

        <div className="reviews-grid">
          {reviews.map((r, i) => (
            <div key={r._id || i} className="review-card glass-panel">
              <div className="review-stars-row">
                <div className="stars-cluster">
                  {[...Array(5)].map((_, sIdx) => (
                    <Star
                      key={sIdx}
                      size={16}
                      fill={sIdx < r.rating ? '#f59e0b' : '#e2e8f0'}
                      stroke="none"
                    />
                  ))}
                </div>
                {r.verified && (
                  <span className="verified-badge">
                    <ShieldCheck size={13} /> Verified Patient
                  </span>
                )}
              </div>

              <p className="review-comment">"{r.comment}"</p>

              <div className="review-meta">
                <div className="reviewer-info">
                  <strong>{r.patientName}</strong>
                  <span className="reviewer-loc">{r.location}</span>
                </div>
                <div className="review-treatment-tag">
                  <span className="t-name">{r.treatment}</span>
                  <span className="t-doc">Surgeon: {r.doctorName}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Write Review Modal */}
      {isModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="modal-dialog glass-panel" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Share Your Al Ayn Experience</h3>
              <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="review-form">
              <div className="form-field">
                <label className="form-label">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fatima Al-Mansoor"
                  value={newReview.patientName}
                  onChange={e => setNewReview({ ...newReview, patientName: e.target.value })}
                  className="booking-input"
                />
              </div>

              <div className="form-grid-2">
                <div className="form-field">
                  <label className="form-label">City / Country</label>
                  <input
                    type="text"
                    value={newReview.location}
                    onChange={e => setNewReview({ ...newReview, location: e.target.value })}
                    className="booking-input"
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Treatment Received</label>
                  <input
                    type="text"
                    value={newReview.treatment}
                    onChange={e => setNewReview({ ...newReview, treatment: e.target.value })}
                    className="booking-input"
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-field">
                  <label className="form-label">Consulting Doctor</label>
                  <input
                    type="text"
                    value={newReview.doctorName}
                    onChange={e => setNewReview({ ...newReview, doctorName: e.target.value })}
                    className="booking-input"
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Rating (1 to 5 Stars)</label>
                  <select
                    value={newReview.rating}
                    onChange={e => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                    className="booking-input"
                  >
                    <option value={5}>5 Stars - Outstanding</option>
                    <option value={4}>4 Stars - Very Good</option>
                    <option value={3}>3 Stars - Good</option>
                  </select>
                </div>
              </div>

              <div className="form-field">
                <label className="form-label">Your Comments & Visual Recovery Journey *</label>
                <textarea
                  rows="4"
                  required
                  placeholder="Tell future patients how the procedure felt, recovery time, and your vision today..."
                  value={newReview.comment}
                  onChange={e => setNewReview({ ...newReview, comment: e.target.value })}
                  className="booking-textarea"
                />
              </div>

              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? 'Submitting...' : 'Post Verified Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
