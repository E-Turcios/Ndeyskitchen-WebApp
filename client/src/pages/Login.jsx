import { useState, React } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import PasswordInput from '../components/PasswordInput';
import Image from '../components/Image';
import useAuthContext from '../hooks/useAuthContext';
import jwt_decode from 'jwt-decode';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    const user = { email, password };
    setIsLoading(true);

    const response = await fetch('api/users/get-user', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();

    if (json.error === 'User not found') {
      setEmailError(true);
      setPasswordError(true);
    }

    if (json.error === 'Password incorrect') {
      setPasswordError(true);
    }

    if (response.ok) {
      localStorage.setItem('token', json.token);
      dispatch({ type: 'LOGIN', payload: json.token });
      setIsLoading(false);
      navigate('/');
    }
    console.log(json);
  }

  async function getGoogleUser(data) {
    const decode = jwt_decode(data.credential);
    const { email, sub } = decode;

    const user = {
      email: email,
      sub: sub,
    };

    const response = await fetch('api/users/get-google-user', {
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

    localStorage.setItem('token', json.token);
    dispatch({ type: 'LOGIN', payload: json });

    if (
      (json.information.residence === 'N/A' ||
        json.information.number === 'N/A') &&
      json.userUpdateInfoToken
    ) {
      localStorage.setItem('userUpdateInfoToken', json.userUpdateInfoToken);
      navigate('/update-address-and-number');
      return;
    }
    navigate('/');
  }

  return (
    <div className="login-container">
      <a className="home-link" href="/">
        <Image className="img" src={'ndeys-kitchen.png'} />
      </a>

      <div className="login-form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <p className="login-form-header">
            <strong>Login</strong>
          </p>

          <label className="form-label" htmlFor="email">
            Email
          </label>

          <input
            className="input-box"
            type="email"
            id="email"
            onChange={event => setEmail(event.target.value)}
            value={email}
            maxLength="100"
            minLength="7"
            style={{ border: emailError ? '0.15rem solid #DC952F' : '' }}
            onClick={() => setEmailError(false)}
            required
          />
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <PasswordInput
            id="password"
            setValue={setPassword}
            value={password}
            error={passwordError}
            setErrorValue={setPasswordError}
          />

          <p className="forgot-password">
            <a className="forgot-password" href="/forgot-password">
              Forgot password
            </a>
          </p>

          <button disabled={isLoading} type="submit" className="form-btn">
            Login
          </button>
          <p className="form-link">
            Don't have an account? <a href="/Signup">Signup here</a>
          </p>
        </form>

        <GoogleLogin
          onSuccess={getGoogleUser}
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
