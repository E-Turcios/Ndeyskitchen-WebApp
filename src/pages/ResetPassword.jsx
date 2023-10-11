import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

export default function ResetPassword() {
  const { userToken } = useParams();
  const [isExpired, setIsExpired] = useState(true);

  const decode = jwt_decode(userToken);

  async function verifyLink() {
    const response = await fetch('/api/users/reset-password/', {
      method: 'POST',
      body: JSON.stringify({ userToken }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();

    if (!response.ok) console.log(response);

    if (response.ok) {
      setIsExpired(false);
      console.log(json.Message);
    }
  }

  verifyLink();
  return isExpired ? <h1>Link Expired</h1> : <h1>Link Not Expired</h1>;
}
