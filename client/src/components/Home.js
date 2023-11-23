import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Nav from './nav';
import SideNav from './sidenav';

function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = location.state || {};

  const handleLogout = () => {
    navigate('/login');
  };
  console.log(`home${userId}`)
  return (
    <div>
      <Nav />
      <SideNav userId={userId} />
      <h1>Home Page</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
