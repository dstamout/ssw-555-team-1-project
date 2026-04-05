import React, { useState, useEffect } from 'react';
import { apiRequest, getDemoPatientId } from '../utils/apiClient.js';

const getDemoClinicianId = () => {
  let id = localStorage.getItem('demoClinicianId');
  if (!id) {
    id = Array.from({ length: 24 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    localStorage.setItem('demoClinicianId', id);
  }
  return id;
};

export default function Appointments() {
  const [role, setRole] = useState('patient'); 
  const [appointments, setAppointments] = useState([]);
  const [clinicians, setClinicians] = useState([]);
  const [formData, setFormData] = useState({
    clinicianId: '',
    requestedDate: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const demoPatientId = getDemoPatientId();
  const demoClinicianId = getDemoClinicianId();

  useEffect(() => {
    if (role === 'clinician') {
      fetchClinicians();
    }
    fetchAppointments();
  }, [role]);

  const fetchClinicians = async () => {
    try {
      const response = await apiRequest('/api/users/clinicians/all', 'GET');
      if (response.ok) {
        const data = await response.json();
        setClinicians(data);
      }
    } catch (err) {
      console.error('Error fetching clinicians:', err);
    }
  };

  const fetchAppointments = async () => {
    try {
      const userId = role === 'clinician' ? demoClinicianId : demoPatientId;
      const response = await apiRequest(`/api/appointments?userId=${userId}&role=${role}`, 'GET');
      if (response.ok) {
        const data = await response.json();
        setAppointments(data);
      }
    } catch (err) {
      console.error('Error fetching appointments:', err);
    }
  };

  const handleRequest = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await apiRequest('/api/appointments', 'POST', {
        patientId: demoPatientId,
        clinicianId: formData.clinicianId,
        requestedDate: formData.requestedDate,
        notes: formData.notes,
      });

      if (response.ok) {
        alert('Appointment requested successfully!');
        setFormData({ clinicianId: '', requestedDate: '', notes: '' });
        fetchAppointments();
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Error requesting appointment');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      const response = await apiRequest(`/api/appointments/${id}/status`, 'PUT', { status });

      if (response.ok) {
        fetchAppointments();
      } else {
        alert('Error updating status');
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  return (
    <div className="page-container">
      <div className="card">
        <h1>Appointments</h1>
        <p>Request new sessions or review appointment status from the clinician side.</p>
      </div>

      <div className="card">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
          <div>
            <label>
              <input
                type="radio"
                value="patient"
                checked={role === 'patient'}
                onChange={(e) => setRole(e.target.value)}
              />
              Patient View
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="clinician"
                checked={role === 'clinician'}
                onChange={(e) => setRole(e.target.value)}
              />
              Clinician View
            </label>
          </div>
        </div>
      </div>

      {role === 'patient' && (
        <div className="card">
          <h2>Request Appointment</h2>
          <div className="form-group">
            <label>Clinician</label>
            <select
              value={formData.clinicianId}
              onChange={(e) => setFormData({ ...formData, clinicianId: e.target.value })}
              required
            >
              <option value="">Select Clinician</option>
              {clinicians.map((clinician) => (
                <option key={clinician._id} value={clinician._id}>
                  {clinician.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Requested Date</label>
            <input
              type="datetime-local"
              value={formData.requestedDate}
              onChange={(e) => setFormData({ ...formData, requestedDate: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows="4"
            />
          </div>
          <button type="submit" onClick={handleRequest} disabled={loading}>
            {loading ? 'Requesting...' : 'Request Appointment'}
          </button>
          {error && <p className="alert-box" style={{ marginTop: '16px' }}>{error}</p>}
        </div>
      )}

      <div className="card">
        <h2>Your Appointments</h2>
        {appointments.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          <ul className="card-list">
            {appointments.map((appt) => (
              <li key={appt._id} className="card-item">
                <p><strong>Date:</strong> {new Date(appt.requestedDate).toLocaleString()}</p>
                <p><strong>Status:</strong> <span className={`status-pill status-${appt.status}`}>{appt.status}</span></p>
                <p><strong>Notes:</strong> {appt.notes || 'None'}</p>
                {role === 'clinician' && appt.status === 'requested' && (
                  <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                    <button onClick={() => handleStatusUpdate(appt._id, 'approved')} className="secondary">Approve</button>
                    <button onClick={() => handleStatusUpdate(appt._id, 'declined')} className="secondary">Decline</button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}