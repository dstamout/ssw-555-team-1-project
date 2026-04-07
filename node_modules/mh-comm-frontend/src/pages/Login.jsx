import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../utils/apiClient';
import { getAuthUser, logout } from '../utils/auth.js';

export default function Login() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ email: '', password: '', role: 'patient' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(getAuthUser());
  const navigate = useNavigate();

  const startGoogle = () => {
    window.location.href = 'http://localhost:4000/auth/google';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    const endpoint = mode === 'register' ? '/auth/signup' : '/auth/login';
    const payload = {
      email: form.email.trim(),
      password: form.password,
      role: form.role
    };

    try {
      const response = await apiRequest(endpoint, 'POST', payload);
      const data = await response.json();

      if (!response.ok) {
        setMessage(data.msg || 'Authentication failed.');
        setLoading(false);
        return;
      }

      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }
      if (data.user) {
        localStorage.setItem('authUser', JSON.stringify(data.user));
      }

      setMessage(mode === 'register' ? 'Registration successful!' : 'Login successful!');
      const destination = data.user?.role === 'clinician' ? '/clinician' : '/patient';
      navigate(destination);
    } catch (err) {
      setMessage('Server error. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="card">
        <h1>Login</h1>
        <p>Access your mental health dashboard and telehealth sessions.</p>
      </div>

      <div className="card">
        <button onClick={startGoogle}>Sign in with Google</button>
      </div>

      {currentUser && (
        <div className="card">
          <h2>Current session</h2>
          <p>
            Signed in as <strong>{currentUser.email}</strong> ({currentUser.role})
          </p>
          <button
            type="button"
            className="secondary"
            onClick={() => {
              logout();
              setCurrentUser(null);
              setMessage('Signed out successfully.');
            }}
          >
            Sign out
          </button>
        </div>
      )}

      <div className="card">
        <div className="toggle-buttons">
          <button type="button" className={mode === 'login' ? 'active' : ''} onClick={() => setMode('login')}>
            Login
          </button>
          <button type="button" className={mode === 'register' ? 'active' : ''} onClick={() => setMode('register')}>
            Register
          </button>
        </div>

        <h2>{mode === 'register' ? 'Register a new account' : 'Sign in to your account'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="email@example.com"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="password"
              required
            />
          </div>
          {mode === 'register' && (
            <div className="form-group">
              <label>Role</label>
              <select name="role" value={form.role} onChange={handleChange}>
                <option value="patient">Patient</option>
                <option value="clinician">Clinician</option>
              </select>
            </div>
          )}
          <button type="submit" className="secondary" disabled={loading}>
            {loading ? 'Working...' : mode === 'register' ? 'Register' : 'Login'}
          </button>
        </form>

        {message && <p className="status-message">{message}</p>}
      </div>
    </div>
  );
}
