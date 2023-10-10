import { React, useState, useEffect } from 'react';

export default function ResetPassword() {
  const [check, setCheck] = useState('Error');
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(
        '/api/users/reset-password/:id/:token/:userToken',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: localStorage.getItem('token'),
          },
        }
      );

      const json = await response.json();

      if (!response.ok) console.log('NOT OK');

      if (response.ok) {
        setCheck('No Error');
        console.log('OK');
        //localStorage.removeItem('token');
      }

      console.log(json);
    };
    fetchUsers();
  }, []);

  return <h1>{check}</h1>;
}
