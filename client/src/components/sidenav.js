import React from 'react';
import { Link } from 'react-router-dom';

function SideNav({ userId }) {
    console.log(`SideNav${userId}`)
    return (
      <div className="sidebar">
        <Link to={{ pathname: '/form', state: { userId } }}>Hub</Link><br />
        <Link to="#">Aggregation</Link><br />
        <Link to="#">Users</Link><br />
        <Link to="#">Farmer</Link><br />
        <Link tto="#">Seasons</Link><br />
        <Link to="#">Extension Services</Link><br />
        <Link to="#">Training</Link><br />
        <Link to="#">Price Distribution</Link><br />
        <Link to="#">Buying</Link><br />
        <Link to="#">Payments</Link><br />
        <Link to="#">Loading</Link><br />
        <Link to="#">Offloading</Link><br />
        <Link to="#">Rural Workers</Link><br />
        <Link to="#">Inputs Finance</Link><br />
      </div>
    );
  }
  
  export default SideNav;