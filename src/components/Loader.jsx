import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

export default function Loader() {
  return (
    <div className="loader-container">
      <ClipLoader color={'#DC952F'} size={35} aria-label="Loading Spinner" />
    </div>
  );
}
