import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import React from "react";
// import "./App.css";

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const [navigateDate, setNavigateDate] = useState(undefined)
  let navigate = useNavigate();

  useEffect(() => {
    if (navigateDate != undefined) {
      navigate(`/todo/${navigateDate}`)
    }
  }, [navigateDate])

  return (
    <div className="app">
      <h1 className="header">Calendar</h1>
      <div className="calendar-container">
        <Calendar onChange={setDate} value={date} onClickDay={ setNavigateDate }/>
      </div>
    </div>
  );
};

export default CalendarPage;
