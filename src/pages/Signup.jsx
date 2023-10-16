import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PasswordInput from '../components/PasswordInput';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';

export default function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setPasswordConfirmation] = useState('');
  const [number, setNumber] = useState('');
  const [residence, setResidence] = useState('');
  const [isSent, setIsSent] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    const user = {
      firstName,
      lastName,
      email,
      password,
      number,
      residence,
    };

    if (password === confirmPassword) {
      const response = await fetch('/api/users/verify-email-link', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();

      if (!response.ok) {
        console.log(json.Message);
      }

      if (json.Message === 'Email being verified') setIsSent(true);
    }
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  async function createGoogleUser(data) {
    const decoded = jwt_decode(data.credential);

    const { sub, given_name, family_name, email } = decoded;

    console.log(decoded);

    const user = {
      firstName: given_name,
      lastName: family_name,
      email: email,
      sub: sub,
      number: 0,
    };

    const response = await fetch('/api/users/createGoogleUser', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();

    if (response.ok || response.status === 400) {
      navigate('/login');
    }
  }

  return (
    <div className="singup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <p className="signup-form-header">
          <strong>Signup</strong>
        </p>
        <input
          className="input-box"
          type="text"
          placeholder="First name"
          onChange={event =>
            setFirstName(capitalizeFirstLetter(event.target.value.trim()))
          }
          value={firstName}
          maxLength="30"
          minLength="2"
          style={{ textTransform: 'capitalize' }}
          required
        />
        <input
          className="input-box"
          type="text"
          placeholder="Last name"
          onChange={event =>
            setLastName(capitalizeFirstLetter(event.target.value.trim()))
          }
          value={lastName}
          maxLength="30"
          minLength="2"
          style={{ textTransform: 'capitalize' }}
          required
        />
        <input
          className="input-box"
          type="email"
          placeholder="Email"
          onChange={event => setEmail(event.target.value.trim())}
          value={email}
          maxLength="100"
          minLength="7"
          required
        />
        <PasswordInput
          placeholder="Password"
          setValue={setPassword}
          value={password}
        />
        <PasswordInput
          placeholder="Confirm password"
          setValue={setPasswordConfirmation}
          value={confirmPassword}
        />
        <input
          className="input-box"
          type="tel"
          maxLength="10"
          minLength="10"
          placeholder="Phone number"
          onChange={event => setNumber(event.target.value.trim())}
          value={number}
          required
        />
        <input
          className="input-box"
          type="text"
          maxLength="50"
          placeholder="Residence"
          onChange={event =>
            setResidence(capitalizeFirstLetter(event.target.value))
          }
          value={residence}
          required
        />
        {isSent && (
          <p className="check-email">
            Check your email for verification.{' '}
            <a onClick={handleSubmit}>Re-send</a>
          </p>
        )}
        <button type="submit" className="form-btn">
          Signup
        </button>
        <p className="form-link">
          Already have an account? <a href="/Login">Login here</a>
        </p>
      </form>

      <GoogleLogin
        onSuccess={createGoogleUser}
        theme="outline"
        shape="circle"
        width="20px"
        logo_alignment="center"
        onScriptLoadError={() => console.log('Error')}
      ></GoogleLogin>
    </div>
  );
}
