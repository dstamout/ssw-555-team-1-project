import React from 'react';

export default function Login() {
  const startGoogle = () => {
    window.location.href = 'http://localhost:4000/auth/google';
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={startGoogle}>Sign in with Google</button>
      <hr />
      <div>
        <p>Or register (demo):</p>
        <form onSubmit={(e) => e.preventDefault()}>
          <input name="email" placeholder="email" />
          <input name="password" type="password" placeholder="password" />
          <select name="role">
            <option value="patient">Patient</option>
            <option value="clinician">Clinician</option>
          </select>
          <button type="submit">Register (demo)</button>
        </form>
      </div>
    </div>
  );
}
