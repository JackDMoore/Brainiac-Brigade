import React from 'react';
import { Router, Link, Route } from 'react-router-dom';
// import UrgentPage from './UrgentPage';
// import CalendarPage from './CalendarPage';
// import AchievementsPage from './AchievementsPage';

// const HomePage = () => {
//   return (
//     // <Router>
//       <div>
//         {/* <nav>
//           <ul>
//             <li>
//               <Link to="/">Home</Link>
//             </li>
//             <li>
//               <Link to="/urgent-tasks">Urgent Tasks</Link>
//             </li>
//             <li>
//               <Link to="/calendar">Calendar</Link>
//             </li>
//             <li>
//               <Link to="/achievements">Achievements</Link>
//             </li>
//           </ul>
//         </nav> */}

//         {/* <Route path="/" exact component={Home} /> */}
//         {/* <Route path="/urgent-tasks" component={UrgentTasks} />
//         <Route path="/calendar" component={CalendarPage} />
//         <Route path="/achievements" component={AchievementsPage} /> */}
//       {/* </div> */}
//     // </Router>
//   );
// };

const HomePage = () => {
  return (
    <div className='home'>
    <div>
      <h2>Welcome to the Homepage!</h2>
      <Link to="calendar">
  <div className="box1">
    <h3>Calendar</h3>
  </div>
</Link>


        <Link to="urgent">
        <div className="box2">
          <h3>Urgent Tasks</h3>
          <img src="../../../output-onlinegiftools.gif" alt="" width={100} height={100} />
          </div>
        </Link>


        <Link to="achievements">
      <div className="box3">
        <h3>Achievements</h3>
        <img src="../../../trophy-achiev.png" alt="" width={100} height={100} />
        </div>
        </Link>


    </div>
    </div>

  );
};

export default HomePage;
