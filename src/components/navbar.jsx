import React from 'react';
import '../css/navbar.css';

const NavBar = () => (
  <div className="navbar">
        <div className='calendar_view'>
          <span className='calendar_month'>April</span>
          <span className='calendar_year'>2025</span>
        </div>

        <div className='view_buttons'>
          <button className='day_view'>Day</button>
          <button className='week_view'>Week</button>
          <button className='month_view'>Month</button>
        </div>
        
        <div className="ctlr_buttons">
          <div className='ctrl_btn_move'>
            <div className='move_icon' id="back" />
          </div>
          <div className='ctrl_btn_today'>Today</div> 
          <div className='ctrl_btn_move'>
            <div className='move_icon' id="forward" />
          </div>

          <div className='ctrl_btn_add'>
            <div className='plus_icon' id="simpleplus" />
          </div>
        </div>
  </div>
);

export default NavBar;
