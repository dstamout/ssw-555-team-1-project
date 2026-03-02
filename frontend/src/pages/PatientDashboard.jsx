import React from 'react';
import { Link } from 'react-router-dom';

export default function PatientDashboard() {
  return (
    <div>
      <h2>Patient Dashboard</h2>
      <p>Quick actions:</p>
      <ul>
        <li><Link to="/patient/mood">Add mood / journal</Link></li>
        <li><a href="#">Messages (Rocket.Chat integration coming)</a></li>
        <li><a href="#">Telehealth (Jitsi placeholder)</a></li>
      </ul>
    </div>
  );
}
