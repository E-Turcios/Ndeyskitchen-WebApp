import { useState, useEffect } from 'react';

export default function useUserUpdateInfoTokenVerifier() {
  const [token, setToken] = useState(false);

  const userUpdateInfoToken = localStorage.getItem('userUpdateInfoToken');

  useEffect(() => {
    async function verifyUserUpdateInfoToken() {
      const response = await fetch('/api/users/verify-user-update-token', {
        method: 'POST',
        body: JSON.stringify({ userUpdateInfoToken }),
        headers: { 'Content-Type': 'application/json' },
      });

      const json = await response.json();

      if (!response.ok) {
        console.log(json.Message);
        return;
      }

      setToken(true);
    }
    verifyUserUpdateInfoToken();
  }, []);
  return { token };
}
