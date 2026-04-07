import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiRequest, getDemoPatientId } from '../utils/apiClient.js';
import { getAuthUser, isAuthorized } from '../utils/auth.js';

export default function PatientDashboard() {
  const [mood, setMood] = useState(2);
  const [sleep, setSleep] = useState("");
  const [exercise, setExercise] = useState("");
  const [water, setWater] = useState("");
  const [medication, setMedication] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const user = getAuthUser();
    if (!user) {
      setStatusMessage('Access forbidden: please sign in as a patient.');
      setAuthorized(false);
      return;
    }
    if (!isAuthorized(['patient'])) {
      setStatusMessage(`Access forbidden: signed in as ${user.role}. Patient access only.`);
      setAuthorized(false);
      return;
    }
    setAuthorized(true);
  }, []);

  if (!authorized) {
    return (
      <div className="page-container">
        <div className="card">
          <h1>Access Forbidden</h1>
          <p>{statusMessage}</p>
        </div>
      </div>
    );
  }

  const moodLabels = ["😞 Very Low", "😕 Low", "😐 Okay", "🙂 Good", "😊 Great"];

  const handleSave = async () => {
    const habitData = {
      patientId: getDemoPatientId(),
      sleepHours: parseFloat(sleep) || 0,
      exerciseMinutes: parseInt(exercise) || 0,
      waterGlasses: parseInt(water) || 0,
      medicationTaken: medication,
    };
    try {
      const response = await apiRequest('/api/habits', 'POST', habitData);
      if (response.ok) {
        alert("Habits logged! Keep it up 💪");
        setSleep("");
        setExercise("");
        setWater("");
        setMedication(false);
      } else {
        alert("Error saving habits");
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="page-container">
      <div className="card">
        <h1>Welcome Back 👋</h1>
        <p>Track your mood and habits daily, and stay connected to your clinician.</p>
      </div>

      <div className="card">
        <h2>How are you feeling today?</h2>
        <div className="form-group" style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '44px' }}>{moodLabels[mood].split(' ')[0]}</span>
          <p>{moodLabels[mood]}</p>
        </div>
        <div className="form-group">
          <input
            type="range"
            min="0"
            max="4"
            step="1"
            value={mood}
            onChange={(e) => setMood(Number(e.target.value))}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Very Low</span>
            <span>Great</span>
          </div>
        </div>
      </div>

      <div className="card">
        <h2>Daily Habit Tracker</h2>
        <div className="form-group">
          <label>Sleep (hours)</label>
          <input
            type="number"
            placeholder="e.g. 7"
            value={sleep}
            onChange={(e) => setSleep(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Exercise (minutes)</label>
          <input
            type="number"
            placeholder="e.g. 30"
            value={exercise}
            onChange={(e) => setExercise(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Water (glasses)</label>
          <input
            type="number"
            placeholder="e.g. 8"
            value={water}
            onChange={(e) => setWater(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={medication}
              onChange={(e) => setMedication(e.target.checked)}
            />
            Medication taken today
          </label>
        </div>
        <button onClick={handleSave}>Log Today's Habits</button>
      </div>

      <div className="card">
        <h2>Quick Links</h2>
        <ul className="link-list">
          <li><Link to="/patient/mood">Add Mood / Journal</Link></li>
          <li>Messaging (coming soon)</li>
          <li><Link to="/telehealth">Telehealth</Link></li>
        </ul>
      </div>
    </div>
  );
}
