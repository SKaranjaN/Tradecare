import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/SignUp.css';

function SignUp() {
  const { token } = useParams();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Signup successful:', data);

        if (data.access_token) {
          console.log(`Token from server (Signup): ${data.access_token}`);
          alert('Account successfully created. Kindly verify your email to log in.');
          await handleEmailVerification(data.access_token);
        } else {
          alert('Account created! Check your email to verify your account.');
        }
      } else {
        const errorData = await response.json();
        console.error('Signup failed:', errorData);
        alert(`Signup failed: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert('Error during signup. Please try again.');
    }
  };

  const handleEmailVerification = async (verificationToken) => {
    try {
      console.log(`This is the token on the URL (Verification): ${verificationToken}`);

      const response = await fetch(`http://127.0.0.1:5000/verify-email/${verificationToken}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${verificationToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Email verification successful:', data);
        // alert('Email verified successfully. You can now log in.');
      } else {
        const errorData = await response.json();
        console.error('Email verification failed:', errorData);
        alert(`Email verification failed: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error during email verification:', error);
      alert('Error during email verification. Please try again.');
    }
  };

  useEffect(() => {
  console.log('UseEffect triggered');
  if (token) {
    console.log(`Token from URL (UseEffect): ${token}`);
    handleEmailVerification(token);
  }
}, []);

return (
  <div className='background'>
    <div className="sign-up-container">
    <h1 className="title">Sign Up</h1>
    <form className="form" onSubmit={handleSubmit}>
      <label className="label">
        First Name:
        <input
          className="input"
          type="text"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
        />
      </label>
      <br />
      <label className="label">
        Last Name:
        <input
          className="input"
          type="text"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
        />
      </label>
      <br />
      <label className="label">
        Email:
        <input
          className="input"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <br />
      <label className="label">
        Password:
        <input
          className="input"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </label>
      <br />
      <button className="button" type="submit">
        Sign Up
      </button>
      <br />
      <Link to={'/login'}>Login</Link>
    </form>
  </div>
  </div>
);
}

export default SignUp;