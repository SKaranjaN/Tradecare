import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);

      // Check if the email exists
      const userResponse = await fetch(`http://127.0.0.1:5000/users?email=${email}`);
      const userData = await userResponse.json();

      console.log('User Data:', userData);

      if (!userResponse.ok) {
        // Handle invalid response from the server
        alert('Error checking email existence. Please try again.');
        return;
      }

      if (userData.exists !== undefined && !userData.exists) {
        // Email doesn't exist
        alert('Email does not exist.');
        return;
      }

      if (userData.email_verified !== undefined && !userData.email_verified) {
        // Email exists but not verified
        alert('Please verify your email before logging in.');
        return;
      }

      // Proceed with the login
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const { access_token, user } = data;
      
        // Save the token in localStorage or secure storage
        localStorage.setItem('access_token', access_token);
      
        if (user.email_verified) {
          // Navigate to the home page after successful login
          navigate('/home');
        } else {
          alert('Unexpected: Email exists but not verified.');
        }
      } else if (response.status === 401) {
        // Invalid email or password
        alert('Invalid email or password.');
      } else {
        // Handle other error cases
        alert('Please verify your email first.');
      }
    } catch (error) {
      console.error('Login failed:', error.message);
      alert('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form>
        <label>Email:</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button type="button" onClick={handleLogin} disabled={loading}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
