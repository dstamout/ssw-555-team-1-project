import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import PatientDashboard from './pages/PatientDashboard';
import ClinicianDashboard from './pages/ClinicianDashboard';
import MoodJournal from './pages/MoodJournal';
import Telehealth from './pages/Telehealth';

export default function App() {
  return (
    <div>
      <nav style={{ padding: 12, borderBottom: '1px solid #ddd' }}>
        <Link to="/">Home</Link> | <Link to="/login">Login</Link> | <Link to="/patient">Patient</Link> | <Link to="/clinician">Clinician</Link> | <Link to="/telehealth">Telehealth</Link>
      </nav>
      <main style={{ padding: 12 }}>
        <Routes>
          <Route path="/" element={<div>Welcome to MH Comm App</div>} />
          <Route path="/login" element={<Login />} />
          <Route path="/patient" element={<PatientDashboard />} />
          <Route path="/patient/mood" element={<MoodJournal />} />
          <Route path="/clinician" element={<ClinicianDashboard />} />
          <Route path="/telehealth" element={<Telehealth />} />
        </Routes>
      </main>
    </div>
  );
}
