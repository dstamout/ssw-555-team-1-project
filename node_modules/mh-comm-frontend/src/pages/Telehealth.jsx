import React, { useState } from 'react';
import { apiRequest } from '../utils/apiClient.js';

export default function Telehealth() {
  const [roomName, setRoomName] = useState('');
  const [userName, setUserName] = useState('');
  const [meetingUrl, setMeetingUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleJoin = async () => {
    if (!roomName) {
      setError('Please enter a room name');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await apiRequest('/api/jitsi/room', 'POST', { roomName, userName });
      if (response.ok) {
        const data = await response.json();
        setMeetingUrl(data.url);
      } else {
        setError('Error creating video room');
      }
    } catch (error) {
      setError('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="card">
        <h1>Telehealth Video Call</h1>
        <p>Start or join a secure session with your clinician in just a few clicks.</p>
      </div>

      {!meetingUrl ? (
        <div className="card">
          <div className="form-group">
            <label>Room Name</label>
            <input
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder="e.g. session-123"
            />
          </div>
          <div className="form-group">
            <label>Your Name</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Your name"
            />
          </div>
          {error && <p className="alert-box">{error}</p>}
          <button onClick={handleJoin} disabled={loading}>
            {loading ? 'Creating...' : 'Join Meeting'}
          </button>
        </div>
      ) : (
        <div className="card">
          <p>Meeting started! If the call does not load, open it in a new tab.</p>
          <p><a href={meetingUrl} target="_blank" rel="noopener noreferrer">Open meeting in new tab</a></p>
          <iframe
            src={meetingUrl}
            width="100%"
            height="500px"
            frameBorder="0"
            allow="camera; microphone; fullscreen; display-capture"
            title="Jitsi Meet"
            style={{ borderRadius: '18px' }}
          ></iframe>
        </div>
      )}
    </div>
  );
}