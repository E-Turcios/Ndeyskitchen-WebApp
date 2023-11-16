import { React, useState } from 'react';
import ProfilePageInformation from './ProfilePageInformation';

export default function ProfilePageContent({ userInformation }) {
  const [isButtonClicked, setIsButtonClicked] = useState({
    editButton: false,
    saveButton: false,
  });

  function handleButtonClick(event) {
    const buttonName = event.target.dataset.name;

    setIsButtonClicked({
      editButton: buttonName === 'editButton',
      saveButton: buttonName === 'saveButton',
    });
  }

  return (
    <div className="profile-content-container">
      <p className="cart-header profile-content-header">Your profile</p>
      <div className="profile-content-information">
        {isButtonClicked.editButton === true && (
          <>
            <ProfilePageInformation
              tag={'Phone number'}
              data={`${userInformation.number}`}
              isButtonClicked={isButtonClicked}
            />
            <ProfilePageInformation
              tag={'Address'}
              data={`${userInformation.residence}`}
            />
          </>
        )}

        {isButtonClicked.editButton === false && (
          <>
            <ProfilePageInformation
              tag={'Name'}
              data={`${
                userInformation.firstName + ' ' + userInformation.lastName
              }`}
              isButtonClicked={isButtonClicked.editButton}
            />
            <ProfilePageInformation
              tag={'Email'}
              data={`${userInformation.email}`}
              isButtonClicked={isButtonClicked.editButton}
            />
            <ProfilePageInformation
              tag={'Country Code'}
              data={`${userInformation.countryCode}`}
              isButtonClicked={isButtonClicked.editButton}
            />
            <ProfilePageInformation
              tag={'Phone number'}
              data={`${userInformation.number}`}
              isButtonClicked={isButtonClicked.editButton}
            />
            <ProfilePageInformation
              tag={'Address'}
              data={`${userInformation.residence}`}
              isButtonClicked={isButtonClicked.editButton}
            />
          </>
        )}

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
    </div>
  );
}
