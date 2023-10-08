import React from 'react';
import useAuthContext from '../hooks/useAuthContext';

export default function Home() {
  const { dispatch } = useAuthContext();
  const { user } = useAuthContext();

  const logOut = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <div>
      {user && <button onClick={logOut}>Home/Logout</button>}
      {!user && <h1>No user</h1>}
    </div>
  );
}
