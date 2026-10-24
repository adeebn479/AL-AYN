import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Calendar, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Search, 
  Edit3, 
  Trash2, 
  RefreshCw, 
  MessageSquare, 
  ShieldCheck, 
  Eye 
} from 'lucide-react';

export default function AdminPortal({ onBackToHome }) {
  const [appointments, setAppointments] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('appointments');
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [noteText, setNoteText] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [appRes, inqRes] = await Promise.all([
        fetch('/api/appointments'),
        fetch('/api/inquiries')
      ]);
      const appData = await appRes.json();
      const inqData = await inqRes.json();

      if (appData.success && appData.data) setAppointments(appData.data);
      if (inqData.success && inqData.data) setInquiries(inqData.data);
    } catch (err) {
      console.warn('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setAppointments(prev => prev.map(a => (String(a._id) === String(id) ? { ...a, status: newStatus } : a)));
      }
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleSaveNotes = async (id) => {
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ doctorNotes: noteText })
      });
      const data = await res.json();
      if (data.success) {
        setAppointments(prev => prev.map(a => (String(a._id) === String(id) ? { ...a, doctorNotes: noteText } : a)));
        setEditingNoteId(null);
        setNoteText('');
      }
    } catch (err) {
      alert('Failed to save doctor note');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this appointment record?')) return;
    try {
      const res = await fetch(`/api/appointments/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setAppointments(prev => prev.filter(a => String(a._id) !== String(id)));
      }
    } catch (err) {
      alert('Failed to remove appointment');
    }
  };

  const filteredAppointments = appointments.filter(a => {
    const matchesStatus = statusFilter === 'All' || a.status === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      a.bookingReference.toLowerCase().includes(q) ||
      a.patientName.toLowerCase().includes(q) ||
      a.phone.toLowerCase().includes(q) ||
      a.doctorName.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  const totalCount = appointments.length;
  const confirmedCount = appointments.filter(a => a.status === 'Confirmed').length;
  const completedCount = appointments.filter(a => a.status === 'Completed').length;
  const pendingCount = appointments.filter(a => a.status === 'Pending').length;

  return (
    <section className="section-padding admin-dashboard-section" id="admin">
      <div className="container">
        {/* Top Header Bar */}
        <div className="admin-header-bar">
          <div>
            <div className="admin-badge">
              <ShieldCheck size={14} /> Hospital Staff & Doctor Portal
            </div>
            <h2>Al Ayn Clinical Management System</h2>
            <p>Live patient scheduling, medical consultations, and triage administration.</p>
          </div>
          <div className="admin-actions-right">
            <button className="btn btn-secondary btn-sm" onClick={fetchData} title="Refresh Live Data">
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh
            </button>
            <button className="btn btn-primary btn-sm" onClick={onBackToHome}>
              ← Back to Patient View
            </button>
          </div>
        </div>

        {/* Metric KPI Cards */}
        <div className="admin-kpi-grid">
          <div className="kpi-card glass-panel">
            <div className="kpi-icon-wrap primary">
              <Users size={20} />
            </div>
            <div className="kpi-details">
              <span className="kpi-label">Total Appointments</span>
              <strong className="kpi-value">{totalCount}</strong>
            </div>
          </div>

          <div className="kpi-card glass-panel">
            <div className="kpi-icon-wrap emerald">
              <CheckCircle size={20} />
            </div>
            <div className="kpi-details">
              <span className="kpi-label">Confirmed Slots</span>
              <strong className="kpi-value">{confirmedCount}</strong>
            </div>
          </div>

          <div className="kpi-card glass-panel">
            <div className="kpi-icon-wrap cyan">
              <Eye size={20} />
            </div>
            <div className="kpi-details">
              <span className="kpi-label">Completed Consults</span>
              <strong className="kpi-value">{completedCount}</strong>
            </div>
          </div>

          <div className="kpi-card glass-panel">
            <div className="kpi-icon-wrap amber">
              <Clock size={20} />
            </div>
            <div className="kpi-details">
              <span className="kpi-label">Pending / In Review</span>
              <strong className="kpi-value">{pendingCount}</strong>
            </div>
          </div>
        </div>

        {/* Tab Switching: Appointments vs Inquiries */}
        <div className="admin-tabs-row">
          <div className="admin-tabs">
            <button
              className={`admin-tab-btn ${activeTab === 'appointments' ? 'active' : ''}`}
              onClick={() => setActiveTab('appointments')}
            >
              <Calendar size={16} /> Appointments ({appointments.length})
            </button>
            <button
              className={`admin-tab-btn ${activeTab === 'inquiries' ? 'active' : ''}`}
              onClick={() => setActiveTab('inquiries')}
            >
              <MessageSquare size={16} /> Patient Inquiries ({inquiries.length})
            </button>
          </div>

          {activeTab === 'appointments' && (
            <div className="admin-filter-bar">
              <div className="status-filter-pills">
                {['All', 'Confirmed', 'Pending', 'Completed', 'Cancelled'].map((st) => (
                  <button
                    key={st}
                    className={`st-pill ${statusFilter === st ? 'active' : ''}`}
                    onClick={() => setStatusFilter(st)}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <div className="admin-search-wrap">
                <Search size={14} />
                <input
                  type="text"
                  placeholder="Search patient, doctor, ref..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="admin-search-input"
                />
              </div>
            </div>
          )}
        </div>

        {/* TAB 1: APPOINTMENTS TABLE */}
        {activeTab === 'appointments' && (
          <div className="admin-table-wrapper glass-panel">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Booking Ref</th>
                  <th>Patient Info</th>
                  <th>Specialist & Dept</th>
                  <th>Date & Time</th>
                  <th>Status</th>
                  <th>Clinical Notes</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="empty-table-cell">
                      No appointment records found matching your filter.
                    </td>
                  </tr>
                ) : (
                  filteredAppointments.map((app) => (
                    <tr key={app._id}>
                      <td>
                        <span className="ref-tag">{app.bookingReference}</span>
                      </td>
                      <td>
                        <div className="patient-cell">
                          <strong>{app.patientName}</strong>
                          <span className="p-sub">{app.phone}</span>
                          <span className="p-sub">{app.age} yrs • {app.gender}</span>
                        </div>
                      </td>
                      <td>
                        <div className="doctor-cell">
                          <strong>{app.doctorName}</strong>
                          <span className="p-sub">{app.specialty}</span>
                        </div>
                      </td>
                      <td>
                        <div className="time-cell">
                          <span className="date-text">{app.appointmentDate}</span>
                          <span className="slot-badge">{app.timeSlot}</span>
                        </div>
                      </td>
                      <td>
                        <select
                          className={`status-select status-${app.status.toLowerCase()}`}
                          value={app.status}
                          onChange={(e) => handleUpdateStatus(app._id, e.target.value)}
                        >
                          <option value="Confirmed">Confirmed</option>
                          <option value="Pending">Pending</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="notes-col">
                        {editingNoteId === app._id ? (
                          <div className="inline-note-edit">
                            <textarea
                              rows="2"
                              value={noteText}
                              onChange={(e) => setNoteText(e.target.value)}
                              placeholder="Add doctor diagnosis or prescription..."
                            />
                            <div className="inline-note-btns">
                              <button 
                                className="btn btn-primary btn-sm"
                                onClick={() => handleSaveNotes(app._id)}
                              >
                                Save
                              </button>
                              <button 
                                className="btn btn-secondary btn-sm"
                                onClick={() => setEditingNoteId(null)}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="note-display">
                            <p>{app.doctorNotes || <em className="text-muted">No notes yet</em>}</p>
                            <button
                              className="edit-note-btn"
                              title="Edit Clinical Note"
                              onClick={() => {
                                setEditingNoteId(app._id);
                                setNoteText(app.doctorNotes || '');
                              }}
                            >
                              <Edit3 size={13} />
                            </button>
                          </div>
                        )}
                      </td>
                      <td>
                        <button
                          className="delete-row-btn"
                          title="Remove Record"
                          onClick={() => handleDelete(app._id)}
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 2: INQUIRIES LIST */}
        {activeTab === 'inquiries' && (
          <div className="inquiries-grid">
            {inquiries.length === 0 ? (
              <div className="empty-inquiries glass-panel">
                <p>No contact messages currently logged.</p>
              </div>
            ) : (
              inquiries.map((inq) => (
                <div key={inq._id} className="inquiry-card glass-panel">
                  <div className="inquiry-header">
                    <div>
                      <h4>{inq.name}</h4>
                      <span className="inq-contact">{inq.email} • {inq.phone}</span>
                    </div>
                    <span className={`badge ${inq.urgency === 'Emergency' ? 'badge-amber' : 'badge-cyan'}`}>
                      {inq.urgency}
                    </span>
                  </div>
                  <div className="inquiry-body">
                    <strong>Subject: {inq.subject}</strong>
                    <p>{inq.message}</p>
                  </div>
                  <div className="inquiry-footer">
                    <span className="inq-date">{new Date(inq.createdAt).toLocaleDateString()}</span>
                    <a href={`mailto:${inq.email}`} className="btn btn-secondary btn-sm">
                      Reply via Email
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
}
