import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function PatientDashboard() {
  const [mood, setMood] = useState(2);
  const [sleep, setSleep] = useState("");
  const [exercise, setExercise] = useState("");
  const [water, setWater] = useState("");

  const moodLabels = ["😞 Very Low", "😕 Low", "😐 Okay", "🙂 Good", "😊 Great"];

  const handleSave = () => {
    alert("Habits logged! Keep it up 💪");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial", maxWidth: "600px", margin: "auto" }}>

      {/* Welcome Banner */}
      <h1>Welcome Back 👋</h1>
      <p>Track your mood and habits daily</p>

      <hr />

      {/* Mood Slider */}
      <h3>How are you feeling today?</h3>

      <div style={{ textAlign: "center" }}>
        <span style={{ fontSize: "40px" }}>
          {moodLabels[mood].split(" ")[0]}
        </span>
        <p>{moodLabels[mood]}</p>
      </div>

      <input
        type="range"
        min="0"
        max="4"
        step="1"
        value={mood}
        onChange={(e) => setMood(Number(e.target.value))}
        style={{ width: "100%" }}
      />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Very Low</span>
        <span>Great</span>
      </div>

      <hr />

      {/* Habit Tracker */}
      <h3>Daily Habits</h3>

      <label>Sleep (hours)</label><br />
      <input 
        type="number" 
        value={sleep}
        onChange={(e) => setSleep(e.target.value)}
      /><br /><br />

      <label>Exercise (minutes)</label><br />
      <input 
        type="number" 
        value={exercise}
        onChange={(e) => setExercise(e.target.value)}
      /><br /><br />

      <label>Water (glasses)</label><br />
      <input 
        type="number" 
        value={water}
        onChange={(e) => setWater(e.target.value)}
      /><br /><br />

      <button onClick={handleSave}>
        Log Today's Habits
      </button>

      <hr />

      {/* Navigation */}
      <h3>More Features</h3>
      <ul>
        <li><Link to="/patient/mood">Add Mood / Journal</Link></li>
        <li>Messaging (coming soon)</li>
        <li>Telehealth (coming soon)</li>
      </ul>

    </div>
  );
}
