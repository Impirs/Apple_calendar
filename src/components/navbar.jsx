import React from 'react';
import { useCalendar } from '../context/CalendarContext';
import '../css/navbar.css';
import CalendarGrid from './calendar';

const NavBar = () => {
  const { selectedDate, setSelectedDate, view, setView } = useCalendar();

  const handleViewChange = (newView) => setView(newView);

  const handleNavigation = (direction) => {
    const { date, month, year } = selectedDate;
    const newDate = new Date(year, month, date);

    if (direction === 'today') {
      const today = new Date();
      setSelectedDate({
        date: today.getDate(),
        month: today.getMonth(),
        year: today.getFullYear(),
      });
      return;
    }

    if (view === 'day') {
      newDate.setDate(newDate.getDate() + (direction === 'forward' ? 1 : -1));
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() + (direction === 'forward' ? 7 : -7));
    } else if (view === 'month') {
      newDate.setMonth(newDate.getMonth() + (direction === 'forward' ? 1 : -1));
    }

    setSelectedDate({
      date: newDate.getDate(),
      month: newDate.getMonth(),
      year: newDate.getFullYear(),
    });
  };

  return (
    <div className="main-content">
      <div className="navbar">
        <div className="calendar_view">
          <span className="calendar_month">
            {new Date(selectedDate.year, selectedDate.month).toLocaleString('default', { month: 'long' })}
          </span>
          <span className="calendar_year">{selectedDate.year}</span>
        </div>

        <div className="view_buttons">
          {['day', 'week', 'month'].map((v) => (
            <button
              key={v}
              className={`${v}_view ${view === v ? 'active' : ''}`}
              onClick={() => handleViewChange(v)}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>

        <div className="ctlr_buttons">
          <div className="ctrl_btn_move" 
              onClick={() => handleNavigation('back')}
              onMouseDown={(e) => e.preventDefault()}>
            <div className="move_icon" id="back" />
          </div>
          <div className="ctrl_btn_today" 
              onClick={() => handleNavigation('today')}
              onMouseDown={(e) => e.preventDefault()}>
                Today
          </div>
          <div className="ctrl_btn_move" 
              onClick={() => handleNavigation('forward')}
              onMouseDown={(e) => e.preventDefault()}>
            <div className="move_icon" id="forward" />
          </div>

          <div className="ctrl_btn_add">
            <div className="plus_icon" id="simpleplus" />
          </div>
        </div>
      </div>
      <CalendarGrid view={view} selectedDate={selectedDate} 
                                setSelectedDate={setSelectedDate} 
      />
    </div>
  );
};

export default NavBar;
