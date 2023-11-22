// Home.js
import React from 'react';
import { useAuth } from './AuthContext'; // Adjust the path based on your project structure
import { Navigate } from 'react-router-dom';

function Home() {
  const { isLoggedIn, logout } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={logout}>Logout</button>
      {/* Other content for the home page */}
    </div>
  );
}

export default Home;
