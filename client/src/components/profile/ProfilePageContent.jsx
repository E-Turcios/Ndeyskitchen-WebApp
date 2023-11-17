import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfilePageInformation from './ProfilePageInformation';
import useAuthContext from '../../hooks/useAuthContext';

export default function ProfilePageContent({ userInformation }) {
  const [form, setForm] = useState({
    number: userInformation.number,
    residence: userInformation.residence,
  });
  const [isButtonClicked, setIsButtonClicked] = useState({
    editButton: false,
    saveButton: false,
  });

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

  function handleButtonClick(event) {
    const buttonName = event.target.dataset.name;

    setIsButtonClicked({
      ...isButtonClicked,
      editButton: buttonName === 'editButton',
      saveButton: buttonName === 'saveButton',
    });
  }

  useEffect(() => {
    if (!isButtonClicked.saveButton) return;

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

      navigate('/profile');
    }

    updateAddress();
  }, [isButtonClicked.saveButton]);

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
      isButtonClicked: isButtonClicked.editButton,
    },
    {
      tag: 'Address',
      name: 'residence',
      data: `${userInformation.residence}`,
      isButtonClicked: isButtonClicked.editButton,
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
            isButtonClicked={field.isButtonClicked}
            formValue={form[field.name]}
            handleFormChange={handleFormChange}
          />
        ))}

        <div className="edit-save-container">
          {isButtonClicked.editButton === false && (
            <p
              className="edit-btn"
              data-name="editButton"
              onClick={handleButtonClick}
            >
              Edit
            </p>
          )}

          {isButtonClicked.editButton && (
            <button data-name="saveButton" onClick={handleButtonClick}>
              Save
            </button>
          )}
        </div>
      </div>

      <div className="delete-container">
        <p
          className="edit-btn delete-btn"
          data-name="editButton"
          onClick={() => setIsDeleteButtonClicked(!isDeleteButtonClicked)}
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
              onClick={() => setIsDeleteButtonClicked(!isDeleteButtonClicked)}
            >
              No
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
