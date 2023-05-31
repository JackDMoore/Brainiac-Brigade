import React, { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import * as Pages from "./pages";
import { PageWrapper } from "./components";

const App = () => {
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (task, date) => {
    const newTask = { task, date };
    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = (updatedTasks) => {
    setTasks(updatedTasks);
  };

  const handleUpdateTask = (updatedTasks) => {
    setTasks(updatedTasks);
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<PageWrapper />}>
          <Route index element={<Pages.LandingPage />} />
          <Route path="home" element={<Pages.HomePage />} />
          <Route path="calendar" element={<Pages.CalendarPage />} />
          <Route
            path="todo"
            element={<Pages.TodoPage tasks={tasks} onAddTask={handleAddTask}  />}
          />
          <Route
            path="urgent"
            element={
              <Pages.UrgentPage
                tasks={tasks}
                onAddTask={handleAddTask}
                onDeleteTask={handleDeleteTask}
                onUpdateTask={handleUpdateTask}
              />
            }
          />
          <Route path="login" element={<Pages.LoginPage />} />
          <Route path="register" element={<Pages.RegisterPage />} />
          <Route path="*" element={<Pages.NotFoundPage />} />
          <Route path="Achievements" element={<Pages.AchievementsPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
