import React, { useState, useEffect } from 'react';

export default function CheckoutPageContent({
  user,
  userInformation,
  isLoading,
  onFormChange,
}) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    number: '',
    countryCode: '',
    residence: '',
  });

  useEffect(() => {
    if (!user || isLoading) return;

    const updatedForm = {
      firstName: userInformation.firstName || '',
      lastName: userInformation.lastName || '',
      email: userInformation.email || '',
      ...(userInformation.countryCode !== 'N/A' && {
        countryCode: userInformation.countryCode || '',
      }),
      ...(userInformation.number !== 'N/A' && {
        number: userInformation.number || '',
      }),
      ...(userInformation.residence !== 'N/A' && {
        residence: userInformation.residence || '',
      }),
    };

    setForm(updatedForm);
    onFormChange(updatedForm);
  }, [user, isLoading, userInformation]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm(prevForm => ({
      ...prevForm,
      [name]: value,
    }));

    onFormChange({
      ...form,
      [name]: value,
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
        value={form.firstName}
        onChange={handleChange}
        required
      />
      <input
        className="input-box"
        type="text"
        placeholder="Last name"
        name="lastName"
        maxLength="30"
        value={form.lastName}
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
        value={form.email}
        onChange={handleChange}
        required
      />

      <select
        id="country-code"
        className="input-box country-code"
        name="countryCode"
        value={form.countryCode}
        onChange={handleChange}
        required
      >
        <option value="" disabled selected hidden>
          Country code
        </option>
        <option value="+220">+220</option>
        <option value="+223">+223</option>
      </select>

      <input
        className="input-box"
        type="tel"
        placeholder="Phone number"
        name="number"
        maxLength="20"
        value={form.number}
        onChange={handleChange}
        required
      />
      <input
        className="input-box"
        type="text"
        placeholder="Address"
        name="residence"
        maxLength="50"
        value={form.residence}
        onChange={handleChange}
        required
      />
    </div>
  );
}
