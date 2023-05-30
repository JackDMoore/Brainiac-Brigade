import React from 'react';
import { Router, Link, Route } from 'react-router-dom';
// import UrgentTasks from './UrgentTasks';
// import CalendarPage from './CalendarPage';
// import AchievementsPage from './AchievementsPage';

const HomePage = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/urgent-tasks">Urgent Tasks</Link>
            </li>
            <li>
              <Link to="/calendar">Calendar</Link>
            </li>
            <li>
              <Link to="/achievements">Achievements</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={Home} />
        <Route path="/urgent-tasks" component={UrgentTasks} />
        <Route path="/calendar" component={CalendarPage} />
        <Route path="/achievements" component={AchievementsPage} />
      </div>
    </Router>
  );
};

const Home = () => {
  return (
    <div>
      <h2>Welcome to the Homepage!</h2>
      <div className="box">
        <Link to="/urgent-tasks">
          <h3>Urgent Tasks</h3>
        </Link>
        <p>Click here to view urgent tasks.</p>
      </div>
      <div className="box">
        <Link to="/calendar">
          <h3>Calendar</h3>
        </Link>
        <p>Click here to view the calendar.</p>
      </div>
      <div className="box">
        <Link to="/achievements">
          <h3>Achievements</h3>
        </Link>
        <p>Click here to view your achievements.</p>
      </div>
    </div>
  );
};

export default HomePage;
