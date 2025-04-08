import React, { useState, useEffect } from 'react';
import { createEvent } from '../../js/api'; 
import '../../css/userform.css';

const UserForm = ({ onClose }) => {

  const handleSubmit = async (e) => {
    
  };

  return (
    <div className="event-from-container">
        <div className="event-form-header">
            <h3>
                Add Event
            </h3>
        </div>
        <div className="event-form-content">
            <div className="events-form-grid">
                <div className='event-form-input-grid'>
                    <div className='form-input-container'>
                        <input placeholder='Title' type="text" value="New Event"/>
                    </div>
                    <div className='form-input-container'>
                        <input placeholder='Location of Video Call' type="text"/>
                    </div>
                </div>
                <div className='form-line'> // Calendar
                    <div className='form-line-grid'>
                        <h2>Calendar</h2>
                        //ui-select-button  
                    </div>
                </div>
                <div className='form-line'> // All Day
                    <div className='form-line-grid'>
                        <h2>All Day</h2>
                        //ui-switch
                    </div>
                </div>
                <div className='form-line'> // Starts
                    <div className='form-line-grid'>
                        <h2>Starts</h2>
                        //ui-switch
                    </div>
                </div>
                <div className='form-line'> // Ends
                    <div className='form-line-grid'>
                        <h2>Ends</h2>
                        //ui-switch
                    </div>
                </div>
                <div className='form-line'> // Repeat
                    <div className='form-line-grid'>
                        <h2>Repeat</h2>
                        //ui-select-button
                    </div>
                </div>
                <div className='form-line'> // Alert
                    <div className='form-line-grid'>
                        <h2>Alert</h2>
                        //ui-select-button
                    </div>
                </div>
                <div className='form-line'> // Invitees
                    <div className='form-line-grid'>
                        <h2>Invitees</h2>
                        //ui-button
                    </div>
                </div>
                <div className='form-line'> // Attachments
                    <div className='form-line-grid'>
                        <h2>Attachments</h2>
                        //ui-button
                    </div>
                </div>
                <div className='event-form-input-grid'>
                    <div className='form-input-container'>
                        <input placeholder='URL' type="text"  />
                    </div>
                    <div className='form-input-container'>
                        <input placeholder='Notes' type="text"/>
                    </div>
                </div>
            </div>
        </div>
        <div className='event-form-actions'>
            // two buttons cancel and add
        </div>
    </div>
  );
};

export default UserForm;
