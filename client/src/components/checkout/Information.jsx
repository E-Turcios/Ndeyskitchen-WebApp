import { React } from 'react';

export default function CheckoutPageContent({ onFormChange }) {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function handleChange(event) {
    onFormChange({
      [event.target.name]: capitalizeFirstLetter(event.target.value),
    });
  }

  return (
    <div className="form-container">
      <p className="section">Information</p>
      <input
        className="input-box"
        type="text"
        placeholder="First name"
        name="firstName"
        maxLength="30"
        onChange={handleChange}
        required
      />
      <input
        className="input-box"
        type="text"
        placeholder="Last name"
        name="lastName"
        maxLength="30"
        onChange={handleChange}
        required
      />
      <input
        className="input-box"
        type="email"
        placeholder="Email"
        name="email"
        maxLength="100"
        minLength="7"
        onChange={handleChange}
        required
      />
      <input
        className="input-box"
        type="tel"
        placeholder="Phone number"
        name="number"
        maxLength="20"
        onChange={handleChange}
        required
      />
      <input
        className="input-box"
        type="text"
        placeholder="Address"
        name="residence"
        maxLength="50"
        onChange={handleChange}
        required
      />
    </div>
  );
}
