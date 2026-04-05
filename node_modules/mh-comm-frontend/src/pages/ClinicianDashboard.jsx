import React from 'react';

export default function ClinicianDashboard() {
  return (
    <div className="page-container">
      <div className="card">
        <h1>Clinician Dashboard</h1>
        <p>Monitor patient wellness, review trends, and manage care from one place.</p>
      </div>

      <div className="stats-grid">
        <div className="stats-card">
          <strong>Average Mood</strong>
          <p>🙂 Good</p>
        </div>
        <div className="stats-card">
          <strong>Journal Entries</strong>
          <p>12 this week</p>
        </div>
        <div className="stats-card">
          <strong>Active Patients</strong>
          <p>5</p>
        </div>
      </div>

      <div className="card">
        <h2>Risk Alerts</h2>
        <div className="alert-box">
          <p>⚠ <strong>Patient A</strong> has low mood for 3 days.</p>
          <p>⚠ <strong>Patient B</strong> flagged keywords in their journal.</p>
        </div>
      </div>

      <div className="card">
        <h2>Trends (Coming Soon)</h2>
        <p>Mood and habit charts will appear here once data tracking is connected.</p>
      </div>
    </div>
  );
}
