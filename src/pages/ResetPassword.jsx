import { React, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ResetPassword() {
  const { userToken } = useParams();

  async function verifyLink() {
    const response = await fetch('/api/users/reset-password/', {
      method: 'POST',
      body: JSON.stringify({ userToken }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();

    if (!response.ok) console.log('Well damn');

    if (response.ok) console.log(json.Message);
  }

  verifyLink();
  return <h1>Hello</h1>;
}
