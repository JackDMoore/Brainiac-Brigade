import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const linkStyle = {
  color: '#875053'
};

const LandingPage = () => {
  const [revealAbout, setRevealAbout] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const revealPosition = window.innerHeight * 0.1;

      setRevealAbout(scrollPosition >= revealPosition);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <main>
      <h1>Calendar To Do List</h1>
      <p>Welcome to <b>Calendar To Do List</b>, the world's most famous scheduling site!</p>
      <p>Be able to add/remove tasks and get rewarded with points from a to-do list connected to a calendar</p>
      <Link to="/login" style={linkStyle}>Start Now</Link>

      <section
        style={{
          opacity: revealAbout ? 1 : 0,
          transform: `translateY(${revealAbout ? '0' : '20px'})`,
          transition: 'opacity 0.5s ease, transform 0.5s ease'
        }}
      >
        <h2>About Us</h2>
        <p>We wanted to create a place where students can revise and prepare by planning their tasks out.</p>
        <p>We did this by creating a calendar app with a to-do list that gives points for each completed task.</p>
      </section>
    </main>
  );
};

export default LandingPage;
