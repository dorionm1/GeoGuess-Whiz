import React, { useState } from 'react';
import './../../App.css'

const LogInForm = () => {
    const [formData, setFormData] = useState({
      username: '',
      password: ''
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        console.log('trying')
        const response = await fetch('/user-login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
          }),
        });

        if (response.ok) {
          sessionStorage.setItem('authenticatedUser', formData.username)
          window.location.href = '/';
        } else {
          throw new Error(`Error: ${response.statusText}`);
        }
      } catch (error) {
        console.error('Error during login:', error.message);
      }
    };
  
    return (
        <div className="signup-form-container">
          <h2 className="signup-heading">Log In</h2>
          <form onSubmit={handleSubmit} className="signup-form">
            <label htmlFor="username" className="signup-label">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="signup-input"
              required
            />
            
            <label htmlFor="password" className="signup-label">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="signup-input"
              required
            />
            
            <button type="submit" className="signup-submit-btn">Log In</button>
          </form>
        </div>
      );
    
  }
  
  export default LogInForm;