import { useState, useEffect } from 'react';
import useAuthContext from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

export default function useFetchedUserData() {
  const [userInformation, setUserInformation] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { user, dispatch } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    async function getUserData() {
      if (!user) return;

      const response = await fetch('/api/users/get-user-data', {
        method: 'POST',
        body: JSON.stringify({ user: user }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();

      if (!response.ok) console.log(json.Message);

      if (
        json.Message === 'Token expired' ||
        json.Message === 'User not found'
      ) {
        localStorage.removeItem('token');
        dispatch({ type: 'LOGOUT' });
        navigate('/login');
      }

      setUserInformation(json);
      setIsLoading(false);
    }
    getUserData();
  }, []);

  return { userInformation, isLoading };
}
