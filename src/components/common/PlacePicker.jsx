import React, { useState } from 'react';

export default function PlacePicker({ label, onChange }) {
  const [address, setAddress] = useState('');

  const handleInputChange = (e) => {
    setAddress(e.target.value);
    if (onChange) onChange(e.target.value);
  };

  return (
    <input
      type="text"
      className="form-control"
      placeholder="Address. Airport. Hotel. etc."
      value={address}
      onChange={handleInputChange}
    />
  );
}
