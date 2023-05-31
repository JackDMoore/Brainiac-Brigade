import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import * as Pages from "./pages";
import { PageWrapper } from "./components";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<PageWrapper />}>
          <Route index element={<Pages.LandingPage />} />
          <Route path="home" element={<Pages.HomePage />} />
          <Route path="calendar" element={<Pages.CalendarPage />} />
          <Route path="todo/:date" element={<Pages.TodoPage />} />
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
