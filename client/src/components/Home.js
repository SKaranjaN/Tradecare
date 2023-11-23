import React from 'react';
import { useNavigate, useLocation, useRoutes } from 'react-router-dom';
import Nav from './nav';
import SideNav from './sidenav';
import Forms from './form';
import EditForm from './EditForm';

function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = location.state || {};
  console.log('Location:', location);

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div>
      <Nav userId={userId} />
      <SideNav userId={userId} />
      <Forms userId={userId} />
      <EditForm userId={userId} />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
