import React, { useState } from 'react';

export default function MoodJournal() {
  const [mood, setMood] = useState('neutral');
  const [intensity, setIntensity] = useState(5);
  const [notes, setNotes] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    // demo: send to backend
    // ❌ BAD SMELL #1: Hardcoded patientId
    const payload = { patientId: 'demo', mood, intensity, notes };
    try {
      // ❌ BAD SMELL #2: Duplicate fetch logic
      await fetch('http://localhost:4000/api/mood', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
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
        <select value={mood} onChange={e => setMood(e.target.value)}>
          <option value="happy">Happy</option>
          <option value="neutral">Neutral</option>
          <option value="sad">Sad</option>
          <option value="anxious">Anxious</option>
        </select>
        <br />
        <label>Intensity: {intensity}</label>
        <input type="range" min="0" max="10" value={intensity} onChange={e => setIntensity(Number(e.target.value))} />
        <br />
        <label>Notes</label>
        <textarea value={notes} onChange={e => setNotes(e.target.value)} />
        <br />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
