import React, { useState } from 'react';
import Header from './components/header.jsx';
import NavBar from './components/navbar.jsx';
import SideBar from './components/sidebar.jsx';
import PopupContainer from './components/popup.jsx';

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
          <NavBar />
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
