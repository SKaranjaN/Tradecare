import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [emailVerified, setEmailVerified] = useState(true); // Set to true for testing
  const [userExists, setUserExists] = useState(true); // Set to true for testing

  const handleLogin = async () => {
    try {
      // Check if the email exists
      const userResponse = await fetch(`http://127.0.0.1:5000/users?email=${email}`);
      const userData = await userResponse.json();

      if (userResponse.ok && userData.length > 0) {
        // Email exists, check if it's verified
        setEmailVerified(userData[0].email_verified);

        if (emailVerified) {
          // Set the loggedIn state to true upon successful login
          setLoggedIn(true);
        }
      } else {
        // Email doesn't exist
        setUserExists(false);
      }
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  // Redirect to the home page if loggedIn is true
  if (loggedIn) {
    return <Navigate to="/home" />;
  }

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
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
      {!userExists && <p>Email does not exist.</p>}
      {!emailVerified && <p>Please verify your email before logging in.</p>}
    </div>
  );
}

export default Login;
