import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function VerifyEmail() {
  const { userToken } = useParams();
  const navigate = useNavigate();

  console.log(userToken);

  async function validateEmail() {
    const response = await fetch('/api/users', {
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
    if (response.ok) {
      navigate('/login');
    }
  }

  useEffect(() => {
    validateEmail();
  }, []);
  return <div>Your email is being verified</div>;
}
