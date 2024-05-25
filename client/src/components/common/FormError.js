import React from 'react';
import '../../styling/App.css';

const FormError = ({ errorText }) => {
  return (
    <div className="error-container">
      <div style={{ color: 'red' }}>{errorText}</div>
    </div>
  );
};

export default FormError;