import React from 'react';
import './../App.css'

const FormError = () => {
  return (
    <div className="error-container">
      <div style={{ color: 'red' }}>All dropdowns must be selected</div>
    </div>
  );
};

export default FormError;