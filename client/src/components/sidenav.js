import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/SideNav.css'

function SideNav({ userId }) {
    console.log(`SideNav${userId}`)
    return (
        <div className="sidebar">
          <Link to={{ pathname: '/form', state: { userId: userId } }}>Hub</Link>
          <Link to="#">Aggregation</Link>
          <Link to="#">Users</Link>
          <Link to="#">Farmer</Link>
          <Link to="#">Seasons</Link>
          <Link to="#">Extension Services</Link>
          <Link to="#">Training</Link>
          <Link to="#">Price Distribution</Link>
          <Link to="#">Buying</Link>
          <Link to="#">Payments</Link>
          <Link to="#">Loading</Link>
          <Link to="#">Offloading</Link>
          <Link to="#">Rural Workers</Link>
          <Link to="#">Inputs Finance</Link>
        </div>
      );
    }
    
    export default SideNav;