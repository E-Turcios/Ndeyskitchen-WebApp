import React from 'react';

export default function ProfilePageInformation({
  tag,
  data,
  name,
  formValue,
  handleFormChange,
}) {
  return (
    <div className="profile-content">
      {!formValue && (
        <>
          <p className="profile-content-tag">{tag} </p>
          <p className="profile-content-data">{data}</p>
        </>
      )}

      {formValue && (
        <>
          <p className="profile-content-tag">{tag} </p>
          <input
            type="text"
            className="profile-content-tag information-edit-input"
            value={formValue}
            name={name}
            onChange={handleFormChange}
          />
        </>
      )}
    </div>
  );
}
