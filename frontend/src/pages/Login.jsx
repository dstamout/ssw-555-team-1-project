import React from 'react';

export default function Login() {
  const startGoogle = () => {
    window.location.href = 'http://localhost:4000/auth/google';
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

      <div className="card">
        <h2>Demo Registration</h2>
        <p>Use this demo form for local testing.</p>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label>Email</label>
            <input name="email" placeholder="email" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input name="password" type="password" placeholder="password" />
          </div>
          <div className="form-group">
            <label>Role</label>
            <select name="role">
              <option value="patient">Patient</option>
              <option value="clinician">Clinician</option>
            </select>
          </div>
          <button type="submit" className="secondary">Register (demo)</button>
        </form>
      </div>
    </div>
  );
}
