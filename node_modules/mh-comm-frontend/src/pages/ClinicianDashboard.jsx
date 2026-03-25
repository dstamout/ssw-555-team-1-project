import React from 'react';

export default function ClinicianDashboard() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial", maxWidth: "600px", margin: "auto" }}>

      <h2>Clinician Dashboard</h2>

      {/* Welcome */}
      <h3>Patient Overview</h3>
      <p>Monitor patient mood and activity</p>

      <hr />
      
      <h3>Quick Stats</h3>

      <div style={{ background: "#f5f5f5", padding: "10px", borderRadius: "8px" }}>
      <p><strong>Average Mood:</strong> 🙂 Good</p>
      <p><strong>Journal Entries:</strong> 12 this week</p>
      <p><strong>Active Patients:</strong> 5</p>
      </div>

      <hr />

      {/* Risk Alerts */}
      <h3>Risk Alerts</h3>

      <ul>
        <li>⚠ Patient A has low mood for 3 days</li>
        <li>⚠ Patient B flagged keywords in journal</li>
      </ul>

      <hr />

      {/* Placeholder for future charts */}
      <h3>Trends (Coming Soon)</h3>
      <p>Mood and habit charts will be displayed here.</p>

    </div>
  );
}
