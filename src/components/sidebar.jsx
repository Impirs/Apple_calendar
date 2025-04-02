import React from 'react';
import '../css/sidebar.css';

const SideBar = () => (
  <div className="sidebar">
    <div className="group_section">
      <h3>Calendars</h3>
      <label><input type="checkbox" defaultChecked /> Personal</label>
      <label><input type="checkbox" defaultChecked /> Work</label>
      <label><input type="checkbox" defaultChecked /> Holidays</label>
    </div>
    <div className='calendar_mini'>

    </div>
  </div>
);

export default SideBar;
