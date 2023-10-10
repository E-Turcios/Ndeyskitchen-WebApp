import React, { useState } from 'react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    const user = { email };

    const response = await fetch('/api/users/getUserEmail', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();

    if (json.error === 'User not found') {
      setEmailError(true);
    }

    if (response.ok) {
      console.log('User successfully found');
    }
  }

  return (
    <div className="forgot-password-container">
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <p className="forgot-password-form-header">
          <strong>Forgot Password</strong>
        </p>

        <label className="form-label" htmlFor="email">
          Enter Your email
        </label>

        <input
          className="input-box"
          type="email"
          id="email"
          value={email}
          maxLength="100"
          minLength="7"
          onChange={event => setEmail(event.target.value)}
          style={{ border: emailError ? '0.15rem solid #DC952F' : '' }}
          onClick={() => setEmailError(false)}
          required
        />

        <button type="submit" className="form-btn">
          Submit
        </button>
      </form>
    </div>
  );
}
