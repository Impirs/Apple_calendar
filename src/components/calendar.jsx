import React from 'react';
// import './CalendarGrid.css';

const hours = Array.from({ length: 17 }, (_, i) => `${i + 7}:00`);

const CalendarGrid = () => (
  <div className="calendar-grid">
    <div className="header-row">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
        <div key={day} className="header-cell">{day}</div>
      ))}
    </div>
    <div className="grid-body">
      {hours.map((hour, index) => (
        <div key={index} className="hour-row">
          <div className="hour-cell">{hour}</div>
          {Array.from({ length: 7 }).map((_, dayIndex) => (
            <div key={dayIndex} className="day-cell"></div>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export default CalendarGrid;
