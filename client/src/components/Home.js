import React from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from './nav';

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div>
      <Nav />
      <h1>Home Page</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
