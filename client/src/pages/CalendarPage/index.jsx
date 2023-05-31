import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import React from "react";
// import "./App.css";

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());
  let navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/todo");
  };

  return (
    <div className="app">
      <h1 className="header">Calendar</h1>
      <div className="calendar-container">
        <Calendar onChange={handleNavigation} />
      </div>
    </div>
  );
};

export default CalendarPage;
