import React, { createContext, useState, useContext, useEffect } from 'react';

const CalendarContext = createContext();

export const CalendarProvider = ({ children }) => {
  const today = new Date();
  const storedDate = JSON.parse(localStorage.getItem('selectedDate'));
  const storedView = localStorage.getItem('view') || 'day';

  const [selectedDate, setSelectedDate] = useState(
    storedDate || {
      date: today.getDate(),
      month: today.getMonth(),
      year: today.getFullYear(),
    }
  );
  const [view, setView] = useState(storedView);

  useEffect(() => {
    localStorage.setItem('selectedDate', JSON.stringify(selectedDate));
  }, [selectedDate]);

  useEffect(() => {
    localStorage.setItem('view', view);
  }, [view]);

  return (
    <CalendarContext.Provider value={{ selectedDate, setSelectedDate, view, setView }}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => useContext(CalendarContext);