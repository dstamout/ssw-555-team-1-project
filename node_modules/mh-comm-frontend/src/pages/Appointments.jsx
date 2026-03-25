import React, { useState, useEffect } from 'react';

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

  const getDemoId = (key) => {
    let id = localStorage.getItem(key);
    if (!id) {
      id = Array.from({ length: 24 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      localStorage.setItem(key, id);
    }
    return id;
  };
  const demoPatientId = getDemoId('demoPatientId');
  const demoClinicianId = getDemoId('demoClinicianId');

  useEffect(() => {
    if (role === 'clinician') {
      fetchClinicians();
    }
    fetchAppointments();
  }, [role]);

  const fetchClinicians = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/users/clinicians/all');
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
      const response = await fetch(`http://localhost:4000/api/appointments?userId=${userId}&role=${role}`);
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
      const response = await fetch('http://localhost:4000/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientId: demoPatientId,
          clinicianId: formData.clinicianId,
          requestedDate: formData.requestedDate,
          notes: formData.notes,
        }),
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
      const response = await fetch(`http://localhost:4000/api/appointments/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

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
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <h1>Appointments</h1>

      <div style={{ marginBottom: '20px' }}>
        <label>
          <input
            type="radio"
            value="patient"
            checked={role === 'patient'}
            onChange={(e) => setRole(e.target.value)}
          />
          Patient View
        </label>
        <label style={{ marginLeft: '20px' }}>
          <input
            type="radio"
            value="clinician"
            checked={role === 'clinician'}
            onChange={(e) => setRole(e.target.value)}
          />
          Clinician View
        </label>
      </div>

      {role === 'patient' && (
        <div>
          <h2>Request Appointment</h2>
          <form onSubmit={handleRequest}>
            <div>
              <label>Clinician:</label>
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
            <div>
              <label>Requested Date:</label>
              <input
                type="datetime-local"
                value={formData.requestedDate}
                onChange={(e) => setFormData({ ...formData, requestedDate: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Notes:</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows="3"
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? 'Requesting...' : 'Request Appointment'}
            </button>
          </form>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      )}

      <h2>Your Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <ul>
          {appointments.map((appt) => (
            <li key={appt._id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc' }}>
              <p><strong>Date:</strong> {new Date(appt.requestedDate).toLocaleString()}</p>
              <p><strong>Status:</strong> {appt.status}</p>
              <p><strong>Notes:</strong> {appt.notes || 'None'}</p>
              {role === 'clinician' && appt.status === 'requested' && (
                <div>
                  <button onClick={() => handleStatusUpdate(appt._id, 'approved')}>Approve</button>
                  <button onClick={() => handleStatusUpdate(appt._id, 'declined')} style={{ marginLeft: '10px' }}>Decline</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}