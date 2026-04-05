import React, { useState } from 'react';
import { apiRequest, getDemoPatientId } from '../utils/apiClient.js';

export default function MoodJournal() {
  const [mood, setMood] = useState('neutral');
  const [intensity, setIntensity] = useState(5);
  const [notes, setNotes] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    const payload = {
      patientId: getDemoPatientId(),
      mood,
      intensity,
      notes
    };

    try {
      await apiRequest('/api/mood', 'POST', payload);
      alert('Saved (demo)');
    } catch (err) {
      console.error(err);
      alert('Error');
    }
  };

  return (
    <div className="page-container">
      <div className="card">
        <h1>Add Mood Entry</h1>
        <p>Record how you feel today and share notes for your clinician.</p>
      </div>

      <div className="card">
        <form onSubmit={submit}>
          <div className="form-group">
            <label>Mood</label>
            <select value={mood} onChange={(e) => setMood(e.target.value)}>
              <option value="happy">Happy</option>
              <option value="neutral">Neutral</option>
              <option value="sad">Sad</option>
              <option value="anxious">Anxious</option>
            </select>
          </div>

          <div className="form-group">
            <label>Intensity: {intensity}</label>
            <input
              type="range"
              min="0"
              max="10"
              value={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
            />
          </div>

          <div className="form-group">
            <label>Notes</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows="5" />
          </div>

          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}
