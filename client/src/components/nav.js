import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <div>
      <h1>Nav</h1>
      <Link to="/home">Home</Link>
    </div>
  );
}

export default Nav;