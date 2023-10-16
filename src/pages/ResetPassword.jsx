import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function ResetPassword() {
  const { userToken } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [showForm, setShowForm] = useState(false);

  async function verifyLink() {
    const response = await fetch('/api/users/reset-password-link', {
      method: 'POST',
      body: JSON.stringify({ userToken }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();

    if (!response.ok) {
      console.log(json.Message);
    }

    if (json.Message === 'Token expired') {
      navigate('/redirect-to-forgot-password');
      return;
    }

    if (response.ok) {
      setShowForm(true);
      console.log(json.Message);
    }
  }

  useEffect(() => {
    verifyLink();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    if (password !== passwordConfirmation) {
      setPasswordError(true);
      return;
    }

    const response = await fetch('/api/users/reset-password', {
      method: 'POST',
      body: JSON.stringify({ password, userToken }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) console.log(json.error);

    if (response.ok) {
      navigate('/login');
    }
  }

  return (
    showForm && (
      <div className="reset-password-container">
        <div className="reset-password-form-container">
          <form className="reset-password-form" onSubmit={handleSubmit}>
            <p className="reset-password-form-header">
              <strong>Reset Password</strong>
            </p>

            <label className="form-label" htmlFor="password">
              Password
            </label>

            <input
              className="input-box"
              type="password"
              id="password"
              value={password}
              maxLength="12"
              minLength="8"
              onChange={event => setPassword(event.target.value)}
              required
            />

            <label className="form-label" htmlFor="password-confirmation">
              Confirm Password
            </label>

            <input
              className="input-box"
              type="password"
              id="password-confirmation"
              value={passwordConfirmation}
              maxLength="12"
              minLength="8"
              onChange={event => setPasswordConfirmation(event.target.value)}
              style={{ border: passwordError ? '0.15rem solid #DC952F' : '' }}
              onClick={() => setPasswordError(false)}
              required
            />

            <button type="submit" className="form-btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    )
  );
}
