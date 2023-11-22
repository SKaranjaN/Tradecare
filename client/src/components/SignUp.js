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

        // Check if there is a token for email verification
        if (token) {
          await handleEmailVerification(token);
        } else {
          // Display success alert for regular sign-up
          alert('Account created! Check your email to verify your account.');
        }

        // Handle successful signup, e.g., redirect to login page
      } else {
        const errorData = await response.json();
        console.error('Signup failed:', errorData);
        // Display error alert
        alert(`Signup failed: ${errorData.error}`);
        // Handle failed signup, e.g., display error message
      }
    } catch (error) {
      console.error('Error during signup:', error);
      // Display error alert
      alert('Error during signup. Please try again.');
      // Handle other errors
    }
  };

  const handleEmailVerification = async (verificationToken) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/verify-email/${verificationToken}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${verificationToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Email verification successful:', data);
        // Display success alert for email verification
        alert('Email verified successfully. You can now log in.');
        // Handle successful email verification, e.g., redirect to login page
      } else {
        const errorData = await response.json();
        console.error('Email verification failed:', errorData);
        // Display error alert for email verification
        alert(`Email verification failed: ${errorData.error}`);
        // Handle failed email verification, e.g., display error message
      }
    } catch (error) {
      console.error('Error during email verification:', error);
      // Display error alert for email verification
      alert('Error during email verification. Please try again.');
      // Handle other errors
    }
  };

  useEffect(() => {
    // If there is a token, perform email verification
    if (token) {
      handleEmailVerification(token);
    }
  }, [token]);

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
