import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './landing.css';

const LandingPage = () => {
  const [revealAbout, setRevealAbout] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const revealPosition = window.innerHeight * 0.05;

      setRevealAbout(scrollPosition >= revealPosition);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <main className="landing-page">
      <div className="outer-box">
    <div className="inner-box">
      <h1>Calendar To Do List</h1>
    </div>
    <div className="inner-box">
      <p>Welcome to <b>Calendar To Do List</b>, the world's most famous scheduling site!</p>
      <p>Be able to add/remove tasks and get rewarded with points from a to-do list connected to a calendar</p>
    </div>
    <button className="start-now-button">
        <Link to="/login" >Start Now</Link>
      </button>
    </div>
    <div className="section-box">
      <section className={`inner-box ${revealAbout ? 'reveal' : ''}`}>
        <h2>About Us</h2>
        <p>We wanted to create a place where students can revise and prepare by planning their tasks out.</p>
        <p>We did this by creating a calendar app with a to-do list that gives points for each completed task.</p>
      </section>
  </div>
    </main>
  );
};

export default LandingPage;
