import React from 'react';
import { GoogleLogin, GoogleLogout } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';

export default function GoogleButton() {
  async function createGoogleUser(response) {
    const decoded = jwt_decode(response.credential);

    const { sub, given_name, family_name, email } = decoded;

    const user = {
      _id: sub,
      firstName: given_name,
      lastName: family_name,
      email: email,
      sub: sub,
      number: 0,
    };

    const data = await fetch('/api/users/createGoogleUser', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(data);
  }
  return (
    <GoogleLogin
      onSuccess={createGoogleUser}
      theme="filled_black"
      shape="circle"
      logo_alignment="center"
      onScriptLoadError={() => console.log('Error')}
    ></GoogleLogin>
  );
}
