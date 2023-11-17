import { React, useState } from 'react';
import ProfilePageInformation from './ProfilePageInformation';

export default function ProfilePageContent({ userInformation }) {
  const [isButtonClicked, setIsButtonClicked] = useState({
    editButton: false,
    saveButton: false,
  });
  const [isDeleteButtonClicked, setIsDeleteButtonClicked] = useState(false);

  function handleButtonClick(event) {
    const buttonName = event.target.dataset.name;

    setIsButtonClicked({
      editButton: buttonName === 'editButton',
      saveButton: buttonName === 'saveButton',
    });
  }

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
      data: `${userInformation.number}`,
      isButtonClicked: isButtonClicked.editButton,
    },
    {
      tag: 'Address',
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
            isButtonClicked={field.isButtonClicked}
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
      <p
        className="edit-btn delete-btn"
        data-name="editButton"
        onClick={() => setIsDeleteButtonClicked(true)}
      >
        Delete account
      </p>
    </div>
  );
}
