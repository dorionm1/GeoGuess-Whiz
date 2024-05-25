import React, { useState } from 'react';
import '../../styling/App.css';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    emailaddress: '',
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

    const newUser = {
      ...formData,
    };

    try {
      const response = await fetch('/create-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      setFormData({
        firstname: '',
        lastname: '',
        emailaddress: '',
        username: '',
        password: ''
      });

      sessionStorage.setItem('authenticatedUser', formData.username)
      window.location.href = '/';
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className="signup-form-container">
      <h2 className="signup-heading">Sign Up</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <label htmlFor="firstname" className="signup-label">First Name:</label>
        <input
          type="text"
          id="firstname"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          className="signup-input"
          required
        />
        
        <label htmlFor="lastname" className="signup-label">Last Name:</label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          className="signup-input"
          required
        />
        
        <label htmlFor="emailaddress" className="signup-label">Email Address:</label>
        <input
          type="email"
          id="emailaddress"
          name="emailaddress"
          value={formData.emailaddress}
          onChange={handleChange}
          className="signup-input"
          required
        />
        
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
        
        <input type="submit" value="Sign Up" className="signup-submit-btn" />
      </form>
    </div>
  );
}

export default SignUpForm;