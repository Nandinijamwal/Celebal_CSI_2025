import React, { useState } from 'react';
import './App.css';

function App() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phoneCode: '',
    phoneNumber: '',
    country: '',
    city: '',
    pan: '',
    aadhar: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const countries = {
    India: ['Delhi', 'Mumbai', 'Bangalore'],
    USA: ['New York', 'Los Angeles', 'Chicago'],
  };

  // Validation logic for a single field
  const validateField = (name, value) => {
    switch (name) {
      case 'firstName':
      case 'lastName':
      case 'username':
        if (!value.trim()) return 'Required';
        return '';

      case 'email':
        if (!value.trim()) return 'Required';
        if (!value.includes('@')) return 'Email must contain @';
        return '';

      case 'password':
        if (!value) return 'Required';
        return '';

      case 'phoneCode':
        if (!value.trim()) return 'Required';
        return '';

      case 'phoneNumber':
        if (!value.trim()) return 'Required';
        if (!/^\d{10}$/.test(value)) return 'Must be exactly 10 digits';
        return '';

      case 'country':
        if (!value) return 'Select country';
        return '';

      case 'city':
        if (!value) return 'Select city';
        return '';

      case 'pan':
        if (!value.trim()) return 'Required';
        if (!/^\d{10}$/.test(value)) return 'Must be exactly 10 digits';
        return '';

      case 'aadhar':
        if (!value.trim()) return 'Required';
        if (!/^\d{16}$/.test(value)) return 'Must be exactly 16 digits';
        return '';

      default:
        return '';
    }
  };

  // Validate entire form (used for submit button disabling)
  const validateForm = () => {
    const validationErrors = {};
    for (const field in form) {
      const error = validateField(field, form[field]);
      if (error) validationErrors[field] = error;
    }
    return validationErrors;
  };

  const isFormValid = Object.keys(validateForm()).length === 0;

  // On input change, validate that field live
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));

    // Validate current field live
    const errorMsg = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMsg,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="form">
        <h2>Submission Successful 🎉</h2>
        <ul>
          {Object.entries(form).map(([key, val]) => (
            <li key={key}>
              <strong>{key}</strong>: {val}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Registration Form</h2>

      {/* Text Inputs */}
      {['firstName', 'lastName', 'username', 'email', 'pan', 'aadhar'].map((field) => (
        <div key={field}>
          <input
            name={field}
            placeholder={field.replace(/([A-Z])/g, ' $1')}
            value={form[field]}
            onChange={handleChange}
          />
          {errors[field] && <span className="error">{errors[field]}</span>}
        </div>
      ))}

      {/* Password */}
      <div>
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <button type="button" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? 'Hide' : 'Show'}
        </button>
        {errors.password && <span className="error">{errors.password}</span>}
      </div>

      {/* Phone Number */}
      <div>
        <input
          name="phoneCode"
          placeholder="+91"
          value={form.phoneCode}
          onChange={handleChange}
          style={{ width: '60px' }}
        />
        {errors.phoneCode && <span className="error">{errors.phoneCode}</span>}

        <input
          name="phoneNumber"
          placeholder="Phone Number"
          value={form.phoneNumber}
          onChange={handleChange}
          style={{ width: 'calc(100% - 70px)', marginLeft: '10px' }}
        />
        {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
      </div>

      {/* Country */}
      <div>
        <select
          name="country"
          value={form.country}
          onChange={(e) => {
            const selectedCountry = e.target.value;
            // Reset city when country changes
            setForm((prevForm) => ({
              ...prevForm,
              country: selectedCountry,
              city: '',
            }));
            // Validate country live
            const errorMsg = validateField('country', selectedCountry);
            setErrors((prevErrors) => ({
              ...prevErrors,
              country: errorMsg,
              city: 'Select city', // reset city error because city is reset
            }));
          }}
        >
          <option value="">Select Country</option>
          {Object.keys(countries).map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {errors.country && <span className="error">{errors.country}</span>}
      </div>

      {/* City */}
      <div>
        <select
          name="city"
          value={form.city}
          onChange={handleChange}
        >
          <option value="">Select City</option>
          {(countries[form.country] || []).map((ct) => (
            <option key={ct} value={ct}>
              {ct}
            </option>
          ))}
        </select>
        {errors.city && <span className="error">{errors.city}</span>}
      </div>

      <button type="submit" disabled={!isFormValid}>
        Submit
      </button>
    </form>
  );
}

export default App;
