import React from 'react';
import '../css/header.css';
import UserForm from './userForm';

const Header = ({ showPopup }) => {
    const handleAccountClick = () => {
        showPopup(UserForm, { title: 'User Form' });
    };

    return (
        <div className="header">
            <div className="logo">
                <div className="logo_icon" id="avocado" />
                <h2 style={{ color: "var(--text-color-main)" }}>Cloud</h2>
                <h2 style={{ color: "var(--neutral-color-accent)" }}>Calendar</h2>
            </div>
            <div className="account_btn" tabIndex="-1" onClick={handleAccountClick}>
                <div className="account_icon" id="account" tabIndex="-1"></div>
            </div>
        </div>
    );
};

export default Header;