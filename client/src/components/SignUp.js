import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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
        alert('Email verified successfully. You can now log in.');
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
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;