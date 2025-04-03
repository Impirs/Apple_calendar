import React, { useState, useEffect } from 'react';
import { createUser, loginUser, logoutUser } from '../js/api'; 
import '../css/userform.css';

const UserForm = ({ onClose }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [id, setId] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPasswordField, setShowPasswordField] = useState(false); // Управление видимостью поля пароля

  useEffect(() => {
    const storedId = localStorage.getItem('userId');
    const storedName = localStorage.getItem('userName');
    if (storedId && storedName) {
      setId(storedId);
      setName(storedName);
      setIsLoggedIn(true);
    }
  }, []);

  const handleNextStep = (e) => {
    e.preventDefault();
    if (name.trim()) {
      setShowPasswordField(true); // Показываем поле для пароля
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (isLogin) {
        response = await loginUser(name, password);
      } else {
        response = await createUser(name, password);
      }
      setId(response?.unique_id || '');
      setIsLoggedIn(true);

      // Сохраняем данные пользователя в localStorage
      localStorage.setItem('userId', response?.unique_id || '');
      localStorage.setItem('userName', name);

      if (onClose) onClose(); // Закрываем окно после успешного входа
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      setIsLoggedIn(false);

      // Удаляем данные пользователя из localStorage
      localStorage.removeItem('userId');
      localStorage.removeItem('userName');

      if (onClose) onClose();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="userform-content">
      {isLoggedIn ? (
        <div className="account_info_container">
          <div className="userform_header"
                onMouseDown={(e) => e.preventDefault()}>
            <h3>{name}</h3>
            <p>{id}</p>
          </div>
          <div className='account_info_buttons'>
            <button className="settings_button"
                    onMouseDown={(e) => e.preventDefault()}>
              <div className="settings_info_icon" id="settings"/>
              Cloud Settings
            </button>
            <button className="account_button"
                    onMouseDown={(e) => e.preventDefault()}>
              <div className="account_info_icon" id="account"/>
              Manage Project Account
            </button>
            <hr />
            <button className="logout_button" 
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={handleLogout}>
              <div className="logout_info_icon" id="cancel"/>
              Sing out
            </button>
          </div>
        </div>
      ) : (
        <div className="login_form_container">
          <div className="userform_header">
            {isLogin  ? 'Please log in to your account' 
                      : 'Please create an account'}
          </div>
          <form onSubmit={showPasswordField ? handleSubmit : handleNextStep}>
            <div className="input_row">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter username"
                autoFocus
              />
              <button type="submit">
                <div className="submit_icon" id="login" />
              </button>
            </div>
            {showPasswordField && (
              <div className="input_row">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  autoFocus
                />
                <button type="submit">
                  <div className="submit_icon" id="login" />
                </button>
              </div>
            )}
          </form>
          <button className="footer_button" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Need an account?' : 'Already have an account?'}
          </button>
        </div>
      )}
    </div>
  );
};

export default UserForm;
