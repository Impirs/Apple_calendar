import React, { useState } from 'react';
import { createUser, loginUser, logoutUser } from '../api'; 

const UserForm = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLogin, setIsLogin] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const response = await loginUser(name, password);
        setMessage(response.message); // Display server response message
      } else {
        const response = await createUser(name, password); 
        setMessage(response.message); // Display server response message
      }
      setName('');
      setPassword('');
    } catch (error) {
      setMessage(error.response ? error.response.data : 'Error processing request!');
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setMessage('');
    setName('');
    setPassword('');
  };

  return (
    <div>
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
      <p>{message}</p>
      <button onClick={toggleForm}>
        {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
      </button>
    </div>
  );
};

export default UserForm;
