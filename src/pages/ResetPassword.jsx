import { React, useState, useEffect } from 'react';

export default function ResetPassword() {
  async function handleSubmit(event) {
    event.preventDefault();

    const user = { email };

    const response = await fetch('/api/users/forgot-password', {
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
      localStorage.setItem('token', json.token);
      setIsVerified(true);
      console.log('User successfully found');
    }

    console.log(json.token);
  }

  return <h1>Hello</h1>;
}
