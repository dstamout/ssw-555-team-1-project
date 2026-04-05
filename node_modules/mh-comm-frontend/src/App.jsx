import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import PatientDashboard from './pages/PatientDashboard';
import ClinicianDashboard from './pages/ClinicianDashboard';
import MoodJournal from './pages/MoodJournal';
import Telehealth from './pages/Telehealth';
import Appointments from './pages/Appointments';

export default function App() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="brand">MH Comm</div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/patient">Patient</Link>
          <Link to="/clinician">Clinician</Link>
          <Link to="/appointments">Appointments</Link>
          <Link to="/telehealth">Telehealth</Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={
            <div className="page-container">
              <h1>Welcome to MH Comm</h1>
              <p>Secure mental health tracking, appointments, and telehealth in one friendly space.</p>
            </div>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/patient" element={<PatientDashboard />} />
          <Route path="/patient/mood" element={<MoodJournal />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/clinician" element={<ClinicianDashboard />} />
          <Route path="/telehealth" element={<Telehealth />} />
        </Routes>
      </main>
    </div>
  );
}
