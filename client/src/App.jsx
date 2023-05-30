import "./App.css";
import { Routes, Route } from "react-router-dom";

import * as Pages from "./pages";
import { PageWrapper } from "./components";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Pages.PageWrapper />}>
          <Route index element={<Pages.LandingPage />} />
          <Route path="landing" element={<Pages.HomePage />} />
          <Route path="calendar" element={<Pages.CalendarPage />} />
          <Route path="todo/:id" element={<Pages.TodoPage />} />
          <Route path="login" element={<Pages.LoginPage />} />
          <Route path="*" element={<Pages.NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
