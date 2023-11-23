import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Nav.css';

function Nav({ userId })  {
    return (
        <div className="nav-container">
          <h1 className="nav-title">Nav</h1>
          <nav className="nav-links">
            <Link to="/home" className="nav-link">
              Home
            </Link>
          </nav>
        </div>
      );
    }
    
    export default Nav;