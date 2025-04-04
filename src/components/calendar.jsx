import React, { useEffect } from 'react';
import '../css/month_calendar.css';
import '../css/week_calendar.css';
import '../css/day_calendar.css';
import { draw } from "../js/calendar";

const CalendarGrid = ({ view = 'month', selectedDate }) => {
  useEffect(() => {
    if (!selectedDate || !selectedDate.date || !selectedDate.month || !selectedDate.year) {
      console.error("Invalid selectedDate:", selectedDate);
      return;
    }

    draw({
      target: "#calendar",
      type: view,
      date: selectedDate.date,
      month: selectedDate.month,
      year: selectedDate.year,
      startWeekOnSunday: false,
    });
  }, [view, selectedDate]);

  return (
    <div className="c-screen" id="calendar">
    </div>
  );
};

export default CalendarGrid;
