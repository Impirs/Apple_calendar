import React, { useState } from 'react';
import Header from './components/header.jsx';
import NavBar from './components/navbar.jsx';
import SideBar from './components/sidebar.jsx';
import CalendarGrid from './components/calendar.jsx';
import PopupContainer from './components/popup.jsx';
// popup components
import UserForm from './components/userForm';
// import Settings from './components/settings';
// import EventForm from './components/eventForm';

function App() {
  const [popupContent, setPopupContent] = useState(null);
  const [popupProps, setPopupProps] = useState({});

  const showPopup = (content, props = {}) => {
    setPopupContent(() => content);
    setPopupProps(() => props);
  };

  const closePopup = () => {
    setPopupContent(null);
    setPopupProps({});
  };
  
  return (
    <div className="app-container">
      <div className="app-content">
        <Header showPopup={showPopup} />
        <div className="content">
          <SideBar />
          <div className="main-content">
            <NavBar />
            <div className="calendar-container">
              <CalendarGrid />
            </div>
          </div>
        </div>
      </div>
      {popupContent && (
        <PopupContainer
            content={popupContent}
            props={popupProps}
          onClose={closePopup}
        />
      )}
    </div>
  );
}

export default App;
