import React, { useState } from 'react';
import { apiRequest, getDemoPatientId } from '../utils/moodApi.js';

export default function MoodJournal() {
  const [mood, setMood] = useState('neutral');
  const [intensity, setIntensity] = useState(5);
  const [notes, setNotes] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    // FIXED: removed hardcoded patientId
    const payload = {
      patientId: getDemoPatientId(),
      mood,
      intensity,
      notes
    };

    try {
      // FIXED: using reusable API function
      await apiRequest('/api/mood', 'POST', payload);
      alert('Saved (demo)');
    } catch (err) {
      console.error(err);
      alert('Error');
    }
  };

  return (
    <div>
      <h3>Add Mood Entry</h3>
      <form onSubmit={submit}>
        <label>Mood</label>
        <select value={mood} onChange={(e) => setMood(e.target.value)}>
          <option value="happy">Happy</option>
          <option value="neutral">Neutral</option>
          <option value="sad">Sad</option>
          <option value="anxious">Anxious</option>
        </select>
        <br />
        <label>Intensity: {intensity}</label>
        <input
          type="range"
          min="0"
          max="10"
          value={intensity}
          onChange={(e) => setIntensity(Number(e.target.value))}
        />
        <br />
        <label>Notes</label>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
        <br />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
