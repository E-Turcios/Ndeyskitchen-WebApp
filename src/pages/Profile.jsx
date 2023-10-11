import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';

export default function Profile() {
  const navigate = useNavigate();
  const [users, setUsers] = useState(null);

  const { dispatch } = useAuthContext();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/users/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem('token'),
        },
      });

      const json = await response.json();

      if (json.Message === 'Token expired') {
        navigate('/login');
      }

      if (!response.ok) {
        localStorage.removeItem('token');
        dispatch({ type: 'LOGOUT' });
      }

      setUsers(json);
      console.log(response.status);
    };
    fetchUsers();
  }, []);

  return (
    <div className="profile">
      <div className="users">
        {users && users.map(user => <p key={user._id}>{user.password}</p>)}
      </div>
    </div>
  );
}
