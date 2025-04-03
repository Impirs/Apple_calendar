import React, { useEffect } from 'react';
import '../css/calendar.css';
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
      highlighttoday: true,
      prevnextbutton: "show",
    });
  }, [view, selectedDate]);

  return (
    <div className="c-screen" id="calendar">
    </div>
  );
};

export default CalendarGrid;
