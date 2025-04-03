import React, { createContext, useState, useContext } from 'react';

const CalendarContext = createContext();

export const CalendarProvider = ({ children }) => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState({
    date: today.getDate(),
    month: today.getMonth(),
    year: today.getFullYear(),
  });

  return (
    <CalendarContext.Provider value={{ selectedDate, setSelectedDate }}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => useContext(CalendarContext);