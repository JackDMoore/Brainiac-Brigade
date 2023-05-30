import React from 'react';
import { Link } from 'react-router-dom';

const linkStyle = {
    color: '#875053'
  };

const LandingPage = () => {
    return <main>
        <h1>Calendar To Do List</h1>
        <p>Welcome to <b>SCalendar To Do List</b>, the world's most famous scheduling site!</p>
        <p>Be able to add/remove tasks and get rewarded with points from a to do list connected to a calendar</p>
        <ul>
            <li><Link to="/LogIn" style={linkStyle}>Start Now</Link></li>
        </ul>
    </main>
};

export default LandingPage;
