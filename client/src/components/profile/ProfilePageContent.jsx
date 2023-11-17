import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfilePageInformation from './ProfilePageInformation';
import useAuthContext from '../../hooks/useAuthContext';

export default function ProfilePageContent({ userInformation }) {
  const [form, setForm] = useState({
    number: userInformation.number,
    residence: userInformation.residence,
  });
  const [isSaveButtonClicked, setIsSaveButtonClicked] = useState(false);

  const [isDeleteButtonClicked, setIsDeleteButtonClicked] = useState(false);
  const [isYesButtonClicked, setIsYesButtonClicked] = useState(false);

  const { user, dispatch } = useAuthContext();
  const navigate = useNavigate();

  function handleFormChange(event) {
    event.preventDefault();
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  useEffect(() => {
    if (!isSaveButtonClicked) return;

    if (
      form.number === userInformation.number &&
      form.residence === userInformation.residence
    )
      return;

    async function updateAddress() {
      const response = await fetch(
        '/api/users/update-user-address-and-number',
        {
          method: 'POST',
          body: JSON.stringify({ user, form }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const json = await response.json();

      if (!response.ok) {
        console.log(json.Message);
        return;
      }
    }

    updateAddress();
  }, [isSaveButtonClicked]);

  useEffect(() => {
    if (!isYesButtonClicked) return;

    async function deleteUser() {
      const response = await fetch('/api/users/delete-user', {
        method: 'POST',
        body: JSON.stringify({ user }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();

      if (!response.ok) {
        console.log(json.Message);
        return;
      }

      localStorage.removeItem('token');
      dispatch({ type: 'LOGOUT' });
      navigate('/');
    }

    deleteUser();
  }, [isYesButtonClicked]);

  const userFields = [
    {
      tag: 'Name',
      data: `${userInformation.firstName + ' ' + userInformation.lastName}`,
    },
    {
      tag: 'Email',
      data: `${userInformation.email}`,
    },
    {
      tag: 'Country Code',
      data: `${userInformation.countryCode}`,
    },
    {
      tag: 'Phone number',
      name: 'number',
      data: `${userInformation.number}`,
    },
    {
      tag: 'Address',
      name: 'residence',
      data: `${userInformation.residence}`,
    },
  ];

  return (
    <div className="profile-content-container">
      <p className="cart-header profile-content-header">Profile</p>
      <div className="profile-content-information">
        {userFields.map((field, index) => (
          <ProfilePageInformation
            key={index}
            tag={field.tag}
            data={field.data}
            name={field.name}
            formValue={form[field.name]}
            handleFormChange={handleFormChange}
          />
        ))}

        <div className="edit-save-container">
          <button onClick={() => setIsSaveButtonClicked(true)}>Save</button>
        </div>
      </div>

      <div className="delete-container">
        <p
          className="edit-btn delete-btn"
          data-name="editButton"
          onClick={() => setIsDeleteButtonClicked(true)}
        >
          Delete account
        </p>

        {isDeleteButtonClicked && (
          <p className="edit-btn confirmation">
            Are you sure?{' '}
            <span
              className="button-yes"
              onClick={() => setIsYesButtonClicked(true)}
            >
              Yes
            </span>{' '}
            <span
              className="button-no"
              onClick={() => setIsDeleteButtonClicked(false)}
            >
              No
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
