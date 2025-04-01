import React from 'react';
// import 'Header.css';

const Header = () => (
    <div className="header">
        <div className="logo">
            <h2 style={{ color: 'red' }}>My</h2> 
            <h2 style={{ color: 'gray' }}>calendar</h2>
        </div>
        <div className="account_btn">
            <img src="../../assets/image/icon.png" alt="account_icon" />
        </div>
    </div>
);

export default Header;