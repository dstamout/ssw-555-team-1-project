import React, { useState } from 'react';

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
      const response = await fetch('http://localhost:4000/api/jitsi/room', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomName, userName }),
      });
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
    <div style={{ padding: "20px", fontFamily: "Arial", maxWidth: "600px", margin: "auto" }}>
      <h2>Telehealth Video Call</h2>
      <p>Join a secure video session with your clinician</p>

      {!meetingUrl ? (
        <div>
          <label><strong>Room Name:</strong></label><br />
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="e.g. session-123"
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          /><br />

          <label><strong>Your Name:</strong></label><br />
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Your name"
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          /><br />

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <button 
            onClick={handleJoin} 
            disabled={loading}
            style={{ padding: "10px 20px", cursor: loading ? "not-allowed" : "pointer" }}
          >
            {loading ? 'Creating...' : 'Join Meeting'}
          </button>
        </div>
      ) : (
        <div>
          <p>Meeting started! Connecting...</p>
          <p><a href={meetingUrl} target="_blank" rel="noopener noreferrer">Open in new tab</a> if not loading</p>
          <iframe
            src={meetingUrl}
            width="100%"
            height="500px"
            frameBorder="0"
            allow="camera; microphone; fullscreen; display-capture"
            title="Jitsi Meet"
          ></iframe>
        </div>
      )}
    </div>
  );
}