import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import PasswordInput from '../components/PasswordInput';
import Image from '../components/Image';
import jwt_decode from 'jwt-decode';

export default function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setPasswordConfirmation] = useState('');
  const [number, setNumber] = useState('');
  const [countryCode, setCountryCode] = useState('');
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
      countryCode,
    };

    if (password === confirmPassword) {
      const response = await fetch('/api/users/verify-email-link', {
        method: 'POST',
        body: JSON.stringify({ user }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();

      if (!response.ok) {
        console.log(json.Message);
        return;
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

    if (response.ok || response.status === 400) {
      navigate('/login');
    }
  }

  return (
    <div className="signup-container">
      <a className="home-link" href="/">
        <Image className="img" src={'ndeys-kitchen.png'} />
      </a>
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

        <select
          className="input-box country-code"
          value={countryCode}
          onChange={event => setCountryCode(event.target.value)}
          required
        >
          <option value="" disabled selected hidden>
            Country code
          </option>
          <option value="+220">+220</option>
          <option value="+223">+223</option>
        </select>
        <input
          className="input-box"
          type="tel"
          inputMode="numeric"
          maxLength="20"
          placeholder="Phone number"
          onChange={event => setNumber(event.target.value.trim())}
          value={number}
          required
        />
        <input
          className="input-box"
          type="text"
          maxLength="50"
          placeholder="Address"
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

      <div className="google-button">
        <GoogleLogin
          className="google-btn"
          useOneTap
          onSuccess={createGoogleUser}
          theme="outline"
          shape="circle"
          width="20px"
          logo_alignment="center"
          onScriptLoadError={() => console.log('Error')}
        ></GoogleLogin>
      </div>
    </div>
  );
}
