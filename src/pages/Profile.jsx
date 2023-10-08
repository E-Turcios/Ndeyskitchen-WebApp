import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/users/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem('token'),
        },
      });

      const userData = await response.json();

      if (!response.ok) navigate('/login');

      setUsers(userData);
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
