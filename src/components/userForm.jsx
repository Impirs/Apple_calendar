import React, { useState, useEffect } from 'react';
import { createUser, loginUser, logoutUser } from '../js/api'; 
import '../css/userform.css';

const UserForm = ({ onClose }) => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  // const [message, setMessage] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedId = localStorage.getItem('userId');
    const storedName = localStorage.getItem('userName');
    if (storedId && storedName) {
      setId(storedId);
      setName(storedName);
      setIsLoggedIn(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (isLogin) {
        response = await loginUser(name, password);
      } else {
        response = await createUser(name, password);
      }
      // setMessage(response.message);
      setName(response?.name || '');
      setId(response?.unique_id || '');
      setPassword('');
      setIsLoggedIn(true);

      localStorage.setItem('userId', response?.unique_id || '');
      localStorage.setItem('userName', response?.name || '');
    } catch (error) {
      // setMessage(error.response?.data || 'Error processing request!');
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      // setMessage('Successfully logged out!');
      setIsLoggedIn(false);

      localStorage.removeItem('userId');
      localStorage.removeItem('userName');

      if (onClose) onClose(); 
    } catch (error) {
      // setMessage('Error logging out!');
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    // setMessage('');
    setName('');
    setPassword('');
  };

  return (
    <div className='userform-content'>
      {isLoggedIn ? (
        <div className='account_info_container'>
          <div className='account_info_header'> 
            <div className='account_icon' id="account" tabIndex="-1"/>
            <div className='account_info'>
              <h3>{name}</h3>
              <p>{id}</p>
            </div>
          </div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div className='Login_form_container'>
          <h2>{isLogin ? 'Login' : 'Register'}</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
            <button type="submit">{isLogin ? 'Login' : 'Create User'}</button>
          </form>

          <button className='footer_button' onClick={toggleForm}>
            {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
          </button>
        </div>
      )}
    </div>
  );
};

export default UserForm;
